import { gql } from "@apollo/client";

export const GET_USERS = gql`
  query GetUsers($search: String) {
    users(search: $search) {
      id
      email
      username
      avatarUrl
      partnerStatus
    }
  }
`;

export const GET_USER = gql`
  query GetUser($id: ID!) {
    user(id: $id) {
      id
      email
      username
      isFemale
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
      isFemale
      createdAt
      description
      phoneNumber
      avatarUrl
    }
  }
`;

export const GET_ONLINE_USER_IDS = gql`
  query OnlineUserIds {
    onlineUserIds
  }
`;

export const GET_SAS_TOKEN = gql`
  query SasToken {
    sasToken {
      token
    }
  }
`;
