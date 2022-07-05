import { gql } from '@apollo/client';

export const SUBSCRIBE_MESSAGE = gql`
  subscription ($receiverId: String!) {
    message(receiverId: $receiverId) {
      _id
      senderId
      receiverId
      content
      createdAt
    }
  }
`;
