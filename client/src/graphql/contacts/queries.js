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
      isEstablished
    }
  }
`;

export const GET_CONTACT_REQUESTS = gql`
  query GetContactRequests {
    contactRequests {
      friend {
        id
        email
        username
        avatarUrl
      }
      createdAt
      invitationMessage
    }
  }
`;
