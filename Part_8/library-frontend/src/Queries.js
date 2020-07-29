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