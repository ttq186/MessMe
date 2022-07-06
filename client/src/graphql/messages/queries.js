import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      _id
      senderId
      content
      createdAt
    }
  }
`;

export const GET_MESSAGES_BY_SENDER_AND_RECEIVER = gql`
  query GetMessagesBySenderAndReceiver($senderId: String!, $receiverId: String!) {
    messagesBySenderAndReceiver(senderId: $senderId, receiverId: $receiverId) {
      _id
      senderId
      content
      createdAt
    }
  }
`;
