import { gql } from '@apollo/client'

export const AUTHOR_INFO = gql`
query {
  allAuthors {
    name
    bookCount
    born
  }
}
`
export const BOOKS_INFO = gql`
query {
  allBooks { 
    title
    published
    genres
    author {
      name
    }
  }
}
`
export const ADD_BOOK = gql`
mutation addBook($title: String, $author: String, $published: Int, $genres: [String]) {
  addBook(
    title: $title
    author: $author
    published: $published
    genres: $genres
  ) {
      title
      author {
        name
      }
      published
      genres
  }
}
`
export const EDIT_AUTHOR = gql`
mutation editAuthor($name: String!, $born: Int!) {
  editAuthor(
    name: $name
    born: $born
  ) {
      name
      bookCount
      born
  }
}
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