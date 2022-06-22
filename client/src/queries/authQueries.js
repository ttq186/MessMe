import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $Password) {
      id
      username
      email
      coverImgUrl
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
