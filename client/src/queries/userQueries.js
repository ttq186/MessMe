import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      email
      createdAt
      description
      attachments {
        id
      }
      conversations {
        id
      }
      messages {
        id
      }
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    users(id: $id) {
      email
      createdAt
      description
      attachments {
        id
      }
      conversations {
        id
      }
      messages {
        id
      }
    }
  }
`;
