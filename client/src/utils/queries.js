import { gql } from "@apollo/client";

export const GET_ME = gql`
  query me {
    me {
      _id
      username
      savedBooks
    }
  }
`;

export const GET_ALL_BOOKS = gql`
  query allBooks {
    books {
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;

export const GET_SINGLE_BOOK = gql`
  query singleBook($bookId: ID!) {
    book(bookId: $bookId) {
      authors
      description
      bookId
      image
      link
      title
    }
  }
`;
