import { gql } from '@apollo/client'

const AUTHOR_DETAILS = gql`
fragment AuthorDetails on Author {
  name
  bookCount
  born
}
`
const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  title
  published
  genres
  author {
    name
  }
}
`

export const AUTHOR_INFO = gql`
query {
  allAuthors {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`
export const BOOKS_INFO = gql`
query {
  allBooks { 
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
export const ADD_BOOK = gql`
mutation addBook($title: String, $author: String, $published: Int, $genres: [String]) {
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`
export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name
    born: $born
  ) {
    ...AuthorDetails
  }
}
${AUTHOR_DETAILS}
`
export const USER_LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(
    username: $username
    password: $password
  ) {
      value
  }
}
`
export const USER_INFO = gql`
query {
  me {
    username
    favourite
  }
}
`
export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}
${BOOK_DETAILS}
`