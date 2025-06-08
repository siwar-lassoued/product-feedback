const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const { verifyToken } = require('./utils/auth');
require('dotenv').config();

// Import des types GraphQL et resolvers
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

const startServer = async () => {
  const app = express();
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
    const token = req.headers.authorization || '';
    const decoded = verifyToken(token.replace('Bearer ', ''));
    return { user: decoded };
  }
  });

  await server.start();
  server.applyMiddleware({ app });

  mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
      console.log('✅ Connecté à MongoDB');
      app.listen(4000, () => {
        console.log(`🚀 Serveur GraphQL prêt sur http://localhost:4000${server.graphqlPath}`);
      });
    })
    .catch(err => console.error('❌ Erreur de connexion MongoDB:', err));
};

startServer();
