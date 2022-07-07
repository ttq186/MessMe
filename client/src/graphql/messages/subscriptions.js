import { gql } from '@apollo/client';

export const SUBSCRIBE_MESSAGE = gql`
  subscription ($receiverId: String!, $senderId: String) {
    message(receiverId: $receiverId, senderId: $senderId) {
      _id
      senderId
      content
      createdAt
    }
  }
`;
