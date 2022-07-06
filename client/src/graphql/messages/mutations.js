import { gql } from '@apollo/client';

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($input: MessageCreate!, $receiverId: String) {
    createMessage(messageIn: $input, receiverId: $receiverId) {
      _id
      senderId
      content
      createdAt
    }
  }
`;
