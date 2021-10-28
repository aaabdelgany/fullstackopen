import { gql } from '@apollo/client';

export const ALL_Authors = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`;

export const ALL_Books = gql`
  query {
    allBooks {
      title
      published
      author
    }
  }
`;
