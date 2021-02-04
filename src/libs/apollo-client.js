import { InMemoryCache } from 'apollo-boost';
import { split } from 'apollo-link';
import { ApolloClient } from 'apollo-client';
import { WebSocketLink } from 'apollo-link-ws';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import localStorage from 'local-storage';
import { getMainDefinition } from 'apollo-utilities';

const httplink = new HttpLink({
    uri: process.env.REACT_APP_APOLLO_GRAPHQL_URI,
})

const cache = new InMemoryCache();

const authLink = setContext((_, { headers }) => {
    const token = localStorage.get('token');
    return {
        headers: {
            ...headers,
            authorization: token,
        },
    }
    }
    )

const wsLink = new WebSocketLink({
    uri: process.env.REACT_APP_WEB_SOCKET_URI,
    options: {
        reconnect: true,
    }
})

const link = split(
    ({ query }) => {
        const definition  = getMainDefinition(query);
        return (
            definition.kind === 'OperationDefinition' &&
            definition.operation === 'subscription'
        );
    },
  wsLink,
  httplink,
)

const client = new ApolloClient({
    link: authLink.concat(link),
    cache,
});


export default client;
