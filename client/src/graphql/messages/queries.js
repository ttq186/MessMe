import { gql } from '@apollo/client';

export const GET_MESSAGES = gql`
  query GetMessages {
    messages {
      _id
      senderId
      channelId
      content
      createdAt
      isHidden
    }
  }
`;

export const GET_MESSAGES_BY_CHANNEL = gql`
  query GetMessagesByChannel($channelId: String!) {
    messagesByChannel(channelId: $channelId) {
      _id
      senderId
      channelId
      content
      createdAt
      isHidden
    }
  }
`;
