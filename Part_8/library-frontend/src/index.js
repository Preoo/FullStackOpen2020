import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { 
    ApolloProvider, ApolloClient, InMemoryCache, HttpLink, split 
} from '@apollo/client'
import { setContext } from 'apollo-link-context'
import { WebSocketLink } from '@apollo/link-ws'
import { getMainDefinition } from '@apollo/client/utilities'


const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('library-user-token')
    return {
        headers: {
            ...headers,
            authorization: token ? `bearer ${token}` : null
        }
    }
})

const httpLink = new HttpLink({
    uri: 'http://localhost:4000',
})

const wsLink = new WebSocketLink({
    uri: 'ws://localhost:4000/graphql',
    options: { reconnect: true }
})

const splitLink = split(({ query }) => {
    const useWSHandler = def => (
        def.kind === 'OperationDefinition' &&
        def.operation === 'subscription'
    )
    return useWSHandler(getMainDefinition(query))}, // pred func
    wsLink,                                         // if pred
    authLink.concat(httpLink)                       // else
)

const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: splitLink
})

ReactDOM.render(
    <ApolloProvider client={client}>
        <App />
    </ApolloProvider>,
    document.getElementById('root')
)