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
user:User
me: User
}

type Mutation{
   createUser(username: String!, email: String!, password: String!): Auth
    login(email: String!, password: String!): Auth
    saveBook(books:Book!):User
    deleteBook(bookId:String!):User
}
`;
module.exports = typeDefs;
