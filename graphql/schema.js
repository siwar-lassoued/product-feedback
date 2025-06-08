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
    type AuthPayload {
  token: String!
  user: User!
  }

  type Query {
    feedbacks(productId: ID!): [Feedback]
    products: [Product]
    product(id: ID!): Product
    users: [User]
    user(id: ID!): User
    feedbackByUser: [Feedback]
    allFeedbacks: [Feedback]
    averageRating(productId: ID!): Float
    me: User
  }

 type Mutation {
  createUser(name: String!, email: String!): User  
  updateUser(id: ID!, name: String, email: String): User
  deleteUser(id: ID!): User
  
  createProduct(name: String!, description: String): Product
  updateProduct(id: ID!, name: String, description: String): Product
  deleteProduct(id: ID!): Product
  
  createFeedback(productId: ID!, rating: Int!, comment: String): Feedback
  deleteFeedback(id: ID!): Feedback

  login(email: String!): AuthPayload


}

`;
