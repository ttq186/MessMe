import { gql } from '@apollo/client';

export const MESSAGES_SUBSCRIPTION = gql`
  subscription ($userId: String!) {
    messages(userId: $userId) {
      _id
      senderId
      receiverId
      content
      createdAt
    }
  }
`;
