import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation CreateContact($id: String!, $input: ContactCreate!) {
    createContact(id: $id, contactIn: $input) {
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
