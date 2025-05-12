const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
require('dotenv').config();

const startServer = async () => {
  const app = express();

  // Pour le moment, on met un schéma vide temporaire
  const typeDefs = `
    type Query {
      _empty: String
    }
  `;
  const resolvers = {
    Query: {
      _empty: () => 'API prête',
    },
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
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
