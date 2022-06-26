import { gql } from '@apollo/client';

export const GET_USERS = gql`
  query GetUsers {
    users {
      id
      email
      username
      createdAt
      description
      avatarUrl
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      username
      createdAt
      description
      avatarUrl
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query CurrentUser {
    currentUser {
      id
      email
      username
      createdAt
      description
      phoneNumber
      avatarUrl
    }
  }
`;

export const GET_SIGNED_URL = gql`
  query SignedUrl($blobType: String!, $blobName: String!) {
    signedUrl(blobType: $blobType, blobName: $blobName) {
      url
    }
  }
`;
