import { gql } from '@apollo/client';

export const GET_CONTACTS = gql`
  query GetContacts($search: String) {
    contacts(search: $search) {
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
