import { gql } from '@apollo/client';

export const SUBSCRIBE_MESSAGE = gql`
  subscription ($channelId: String!) {
    message(channelId: $channelId) {
      _id
      senderId
      channelId
      content
      createdAt
      isHidden
    }
  }
`;
