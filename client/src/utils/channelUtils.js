export const generateMessageChannelByUsersId = (firstId, secondId) => {
  if (firstId <= secondId) {
    return `messages-${firstId}-${secondId}`;
  }
  return `messages-${secondId}-${firstId}`;
};
