import { gql } from '@apollo/client';

export const CREATE_CONTACT = gql`
  mutation CreateContact($email: String!, $input: ContactCreate!) {
    createContact(email: $email, contactIn: $input) {
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
