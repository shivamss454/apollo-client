import { InMemoryCache } from 'apollo-boost';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';
import localStorage from 'local-storage';

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

const client = new ApolloClient({
    link: authLink.concat(httplink),
    cache,
});


export default client;
