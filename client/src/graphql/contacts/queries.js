import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      friend {
        id
        email
        username
        avatarUrl
      }
      lastMessage {
        content
        createdAt
      }
    }
  }
`;
