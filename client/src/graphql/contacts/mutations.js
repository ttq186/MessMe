import { gql } from "@apollo/client";

export const CREATE_CONTACT = gql`
  mutation CreateContact($partnerId: String!, $input: ContactCreate!) {
    createContact(partnerId: $partnerId, contactIn: $input) {
      id
      friend {
        id
        email
        username
        avatarUrl
      }
    }
  }
`;

export const UPDATE_CONTACT = gql`
  mutation UpdateContact($id: ID!, $input: ContactUpdate!) {
    updateContact(id: $id, contactIn: $input) {
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

export const DELETE_CONTACT = gql`
  mutation DeleteContact($id: ID!) {
    deleteContact(id: $id) {
      message
    }
  }
`;
