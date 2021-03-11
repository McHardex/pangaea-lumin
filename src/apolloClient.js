import { ApolloClient, InMemoryCache } from "@apollo/client";

const apolloClient = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_CLIENT_URL,
  cache: new InMemoryCache(),
});

export default apolloClient;
