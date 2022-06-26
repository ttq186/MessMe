import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      username
      email
      avatarUrl
      description
      isFemale
      dateOfBirth
      createdAt
      hasConfirmedEmail
      isAdmin
      loginType
    }
  }
`;

export const LOGIN_VIA_GOOGLE = gql`
  mutation LoginViaGoogle($tokenId: String!) {
    loginViaGoogle(tokenId: $tokenId) {
      id
      username
      email
      avatarUrl
      description
      isFemale
      dateOfBirth
      createdAt
      hasConfirmedEmail
      isAdmin
      loginType
    }
  }
`;
