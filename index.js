// const { ApolloServer, gql } = require('apollo-server');

// const books = [
//     {
//       title: 'The Awakening',
//       author: 'Kate Chopin',
//     },
//     {
//       title: 'City of Glass',
//       author: 'Paul Auster',
//     },
//   ];

// const typeDefs = gql`
//   type Book {
//     title: String
//     author: String
//   }

//   type Query {
//     books: [Book]
//   }
// `;

// const resolvers = {
//     Query: {
//       books: () => books,
//     },
//   };

// const server = new ApolloServer({
//     typeDefs,
//     resolvers,
//     csrfPrevention: true,
//     cache: 'bounded',
//   });

// server.listen().then(({ url }) => {
//     console.log(`🚀  Server ready at ${url}`);
//   });

const { ApolloServer } =require('apollo-server-express');
const { ApolloServerPluginDrainHttpServer } =require('apollo-server-core');
const express  =require('express');
require("./Database/Database")
const { createServer } =require('http');
const { typeDefs } = require('./Schema/TypeDefs');
const { resolvers } = require('./Schema/Resolvers');

async function startApolloServer(typeDefs, resolvers) {
  // Required logic for integrating with Express
  const app = express();
  const httpServer = createServer(app);

  // Same ApolloServer initialization as before, plus the drain plugin.
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    csrfPrevention: true,
    cache: 'bounded',
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  // More required logic for integrating with Express
  await server.start();
  server.applyMiddleware({
    app,

    // By default, apollo-server hosts its GraphQL endpoint at the
    // server root. However, *other* Apollo Server packages host it at
    // /graphql. Optionally provide this to match apollo-server.
    path: '/graphql',
  });

  // Modified server startup
  await new Promise(resolve => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`);
}

startApolloServer(typeDefs, resolvers)