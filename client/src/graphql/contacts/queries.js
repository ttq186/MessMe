import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query GetContacts {
    contacts {
      id
      lastInteractionAt
      friend {
        id
        email
        username
        avatarUrl
      }
    }
  }
`;
