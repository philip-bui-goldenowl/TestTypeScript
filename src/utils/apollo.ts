import { ApolloClient, InMemoryCache } from "@apollo/client";


const HOST = 'https://sincere-colt-99.hasura.app/v1/graphql'

export const client = new ApolloClient({
  uri: HOST,
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': 'WUOGkURmQLseIDblHIpwxomKfmkzgsSU2dJpBxaT7A5Fa52z821F7UsrqYX9pO1e'
  },
  cache: new InMemoryCache()
});
