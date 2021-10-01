import { gql } from "@apollo/client";

export const ADD_USER = gql`
  mutation createUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;
export const LOGIN = gql`
  mutation loginUser($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      profile {
        _id
        name
      }
    }
  }
`;

export const SAVE_BOOK = gql`
  mutation saveBook($bookId: ID!, $title: String!) {
    saveBook(bookId: $bookId, title: $title) {
      authors
      description
      bookId
      image
      link
      title
      bookId
    }
  }
`;

export const REMOVE_BOOK = gql`
  mutation deleteBook($bookId: String!) {
    deleteBook(bookId: $bookId) {
      _id
      username
      savedBooks
    }
  }
`;
