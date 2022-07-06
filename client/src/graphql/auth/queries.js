import { gql } from '@apollo/client';

export const LOGIN = gql`
  query Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      isAdmin
    }
  }
`;

export const LOGIN_VIA_GOOGLE = gql`
  query LoginViaGoogle($tokenId: String!) {
    loginViaGoogle(tokenId: $tokenId) {
      id
      email
      isAdmin
    }
  }
`;
