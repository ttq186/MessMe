import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: UserCreate!) {
    createUser(userIn: $input) {
      id
      username
      email
      description
      dateOfBirth
      createdAt
      avatarUrl
      hasConfirmedEmail
      phoneNumber
      isFemale
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UserUpdate!) {
    updateUser(userIn: $input) {
      id
      email
      username
      description
      dateOfBirth
      createdAt
      avatarUrl
      hasConfirmedEmail
      phoneNumber
      isFemale
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      message
    }
  }
`;
