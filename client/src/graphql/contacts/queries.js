import { gql } from '@apollo/client';

export const GET_CONTACT = gql`
  query GetContact($id: ID, $partnerId: String) {
    contact(id: $id, partnerId: $partnerId) {
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

export const GET_CONTACTS = gql`
  query GetContacts($isEstablished: Boolean) {
    contacts(isEstablished: $isEstablished) {
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

export const GET_CONTACT_REQUESTS = gql`
  query GetContactRequests {
    contactRequests {
      id
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
