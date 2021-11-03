import { gql } from '@apollo/client';

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_BOOKS = gql`
  query {
    allBooks {
      title
      published
    }
  }
`;

export const ADD_BOOK = gql`
  mutation AddBookMutation(
    $title: String!
    $published: String!
    $author: Author!
    $genres: [String]!
  ) {
    addBook(
      title: $title
      published: $published
      author: $author
      genres: $genres
    ) {
      title
      published
      genres
    }
  }
`;

export const EDIT_AUTHOR = gql`
  mutation EditAuthorMutation($name: String!, $setBornTo: String!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
    }
  }
`;
