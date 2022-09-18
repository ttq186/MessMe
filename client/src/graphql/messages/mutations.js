import { gql } from "@apollo/client";

export const CREATE_MESSAGE = gql`
  mutation CreateMessage($input: MessageCreate!, $receiverId: String) {
    createMessage(messageIn: $input, receiverId: $receiverId) {
      _id
      senderId
      content
      createdAt
      isHidden
    }
  }
`;

export const UPDATE_MESSAGE = gql`
  mutation UpdateMessage($input: MessageUpdate!) {
    updateMessage(messageIn: $input) {
      _id
      senderId
      content
      createdAt
      isHidden
    }
  }
`;
