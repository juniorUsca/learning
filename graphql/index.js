const express = require('express')
const bodyParser = require('body-parser')
const { typeDefs, mocks } = require('./schema')
const { resolvers } = require('./resolvers')

//const { ApolloServer, gql } = require('apollo-server');
const { ApolloServer: ApolloServerExpress } = require('apollo-server-express');

require('./db/setup')

const app = express()

/*
// Work whitout express, create his own server
const server = new ApolloServer({ typeDefs, resolvers });
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
*/

const apollo = new ApolloServerExpress({
  typeDefs,
  resolvers,
  //mocks,
  //mockEntireSchema: false, // resolvers priority over mocks
  formatError: error => {
    return {
      mensaje: error.message,
    }
  }
});
apollo.applyMiddleware({ app })
//apollo.installSubscriptionHandlers(httpsServer) // to work whit ssl
const PORT = 5678
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:5678${apollo.graphqlPath}`)
})
