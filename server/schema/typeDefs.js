const { gql } = require("apollo-server-express");

const typeDefs = gql`
type Book{
authors: [String]
description: String!
bookId: ID!
image: String
link: String
title: String!
}

type User{
_id:ID
username:String!
email:String!
password:String!
savedBooks:[Book]
}

type Auth{

token:ID!
user:User!

}

type Query{
books: Book
book(bookId:ID!)
me: User
}

type Mutation{
   createUser(username: String!, email: String!, password: String!): Auth
    loginUser(email: String!, password: String!): Auth
    saveBook(Book!):User
    deleteBook(bookId:ID!):User
}
`;
module.exports = typeDefs;
