export const generateMessageChannelByUsersId = (firstId, secondId) => {
  return firstId <= secondId
    ? `messages:${firstId}-${secondId}`
    : `messages:${secondId}-${firstId}`;
};
