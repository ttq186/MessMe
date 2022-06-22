import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser($input: UserCreate!) {
    createUser(userIn: $input) {
      id
      hasConfirmedEmail
      email
      description
      dateOfBirth
      createdAt
      coverImgUrl
      isAdmin
      isFemale
      username
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UserUpdate!) {
    updateUser(userIn: $input) {
      id
      hasConfirmedEmail
      email
      description
      dateOfBirth
      createdAt
      coverImgUrl
      isAdmin
      isFemale
      username
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
