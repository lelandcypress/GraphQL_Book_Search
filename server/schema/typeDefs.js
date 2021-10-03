const { gql } = require("apollo-server-express");

const typeDefs = gql`
  input SavedBooks {
    authors: [String]
    description: String
    bookId: String
    image: String
    link: String
    title: String
  }
  type Books {
    authors: [String]
    description: String
    bookId: ID
    image: String
    link: String
    title: String
  }
  type User {
    _id: ID
    username: String
    email: String
    password: String
    savedBooks: [Books]
  }
  type Auth {
    token: ID!
    user: User
  }
  type Query {
    me: User
  }
  type Mutation {
    ##creates a user profile through the Auth type, that way we can pass a token upon creation
    createUser(username: String!, email: String!, password: String!): Auth
    
    login(email: String!, password: String!): Auth
    
    saveBook(bookData: SavedBooks): User
    
    deleteBook(bookId: ID!): User
  }
`;
module.exports = typeDefs;
