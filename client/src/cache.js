import { makeVar, InMemoryCache } from "@apollo/client";

export const hasLoadWelcomeAnimationVar = makeVar(false);
export const isSignUpSuccessVar = makeVar(false);
export const activeUserChatVar = makeVar(null);
export const contactsIdVar = makeVar([]);
export const currentChoseUserIdVar = makeVar(null);
export const hasNewNotificationVar = makeVar(false);
export const hasSubcribeMessageVar = makeVar(false);
export const contactsJustSentMessagesVar = makeVar([]);
export const signInRequiredVar = makeVar(false);
export const subscribedChannelIdsVar = makeVar([]);
export const onlineUserIdsVar = makeVar([]);

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        hasLoadWelcomeAnimation: {
          read() {
            return hasLoadWelcomeAnimationVar();
          },
        },
        isSignUpSuccess: {
          read() {
            return isSignUpSuccessVar();
          },
        },
        activeUserChat: {
          read() {
            return activeUserChatVar();
          },
        },
        contactsId: {
          read() {
            return contactsIdVar();
          },
        },
        currentChoseUserId: {
          read() {
            return currentChoseUserIdVar();
          },
        },
        hasNewNotification: {
          read() {
            return hasNewNotificationVar();
          },
        },
        hasSubcribeMessage: {
          read() {
            return hasSubcribeMessageVar();
          },
        },
        contactsJustSentMessages: {
          read() {
            return contactsJustSentMessagesVar();
          },
        },
        signInRequired: {
          read() {
            return signInRequiredVar();
          },
        },
        subscribedChannelIds: {
          read() {
            return subscribedChannelIdsVar();
          },
        },
        onlineUserIds: {
          read() {
            return onlineUserIdsVar();
          },
        },
      },
    },
  },
});
