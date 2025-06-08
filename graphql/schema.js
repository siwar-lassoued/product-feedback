const { gql } = require('apollo-server-express');

module.exports = gql`
  type User {
  id: ID!
  name: String!
  email: String!
}

  type Product {
    id: ID!
    name: String!
    description: String
  }

  type Feedback {
    id: ID!
    rating: Int!
    comment: String
    user: User!
    product: Product!
  }

  type Query {
    feedbacks(productId: ID!): [Feedback]
    products: [Product]
    users: [User]
    feedbackByUser(userId: ID!): [Feedback]
    allFeedbacks: [Feedback]
  }

 type Mutation {
  createFeedback(userId: ID!, productId: ID!, rating: Int!, comment: String): Feedback
  createUser(name: String!, email: String!): User  
  createProduct(name: String!, description: String): Product
  deleteFeedback(id: ID!): Feedback

}

`;
