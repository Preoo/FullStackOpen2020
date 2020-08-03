require('dotenv').config()
const jwt = require('jsonwebtoken')
const { ApolloServer, gql, UserInputError, AuthenticationError, PubSub } = require('apollo-server')
const mongoose = require('mongoose')

const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGO_URL = process.env.MONGO_URL
const MONGO_PORT = process.env.MONGO_PORT
const MONGO_DB = process.env.MONGO_DB
const JWT_SECRET = process.env.LIBRARY_JWT_SECRET

const mongoUrl = `mongodb://${MONGO_URL}:${MONGO_PORT}/${MONGO_DB}`
const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}

mongoose.connect(mongoUrl, mongooseOptions)
    .then(() => console.log('connected to db'))
    .catch(e => {
        console.error(`failed to connect with ${e.message}`)
        process.exit(1)
    })

const typeDefs = gql`
    type Author {
        name: String
        id: ID!
        born: Int
        bookCount: Int
    }
    type Book {
        title: String
        published: Int
        author: Author
        id: ID!
        genres: [String]
    }
    type User {
        username: String!
        favourite: String!
        id: ID!
    }
    type Token {
        value: String!
    }
    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book]!
        allAuthors: [Author]!
        allUsers: [User]!
        me: User
    }
    type Mutation {
        addBook(
            title: String
            published: Int
            author: String
            genres: [String]
        ): Book
        editAuthor(
            name: String!
            born: Int!
        ): Author
        clearDB: String!
        createUser(
            username: String!
            favourite: String
        ): User
        login(
            username: String!
            password: String!
        ): Token
    }
    type Subscription {
        bookAdded: Book!
    }
`

const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: () => Book.collection.countDocuments(),
        authorCount: () => Author.collection.countDocuments(),
        allBooks: (root, args) => {
            if (args.genre) {
                // this is equivalent to using $in operator
                return Book.find({ genres: args.genre }).populate('author')
            }
            return Book.find({}).populate('author')
        },
        allAuthors: () => Author.find({}),
        allUsers: () => User.find({}),
        me: (root, args, context) => context.currentUser
    },
    Mutation: {
        addBook: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            let author = await Author.findOne({ name: args.author })
            if (!author) {
                try {
                    author = new Author({ name: args.author, bookCount: 1 })
                    await author.save()
                } catch (e) {
                    throw new UserInputError(e.message, {
                        invalidArgs: args
                    })
                }
            } else {
                author.bookCount++
                await author.save()
            }

            const book = new Book({ ...args, author: author })
            try {
                await book.save()
            } catch (e) {
                throw new UserInputError(e.message, {
                    invalidArgs: args
                })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded: book })

            return book
        },
        editAuthor: async (root, args, context) => {
            const currentUser = context.currentUser
            if (!currentUser) {
                throw new AuthenticationError('not authenticated')
            }

            if (!args.born) return null

            const author = await Author
                .findOneAndUpdate({ name: args.name }, { born: args.born }, { new: true })
            return author || null
        },
        clearDB: async () => {
            const countBooks = await Book.deleteMany({})
            const countAuthors = await Author.deleteMany({})
            const report = `Removed ${countBooks.deletedCount} books and ${countAuthors.deletedCount} authors`
            return report
        },
        createUser: (root, args) => {
            const user = new User({ ...args })
            return user.save()
                .catch(e => {
                    throw new UserInputError(e.message, {
                        invalidArgs: args
                    })
                })
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (!user) {
                // as per course material, we ignore password for simplicity
                throw new UserInputError('Invalid user or password')
            }
            const token = {
                username: user.username,
                id: user._id
            }
            return {
                value: jwt.sign(token, JWT_SECRET)
            }
        }
    },
    Subscription: {
        bookAdded: {
            subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const token = jwt.verify(auth.substring(7), JWT_SECRET)
            const currentUser = await User.findById(token.id)
            return { currentUser }
        }
    }
})

server.listen().then(({ url, subscriptionsUrl }) => {
    console.log(`Server ready at ${url}`)
    console.log(`Subscriptions read at ${subscriptionsUrl}`)
})
