import { makeVar, InMemoryCache } from '@apollo/client';

export const hasLoadWelcomeAnimationVar = makeVar(false);
export const isSignUpSuccessVar = makeVar(false);
export const activeUserChatVar = makeVar(null);
export const contactsIdVar = makeVar([]);
export const currentChoseUserIdVar = makeVar(null);
export const contactRequestsIdVar = makeVar([]);

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
        contactRequestsId: {
          read() {
            return contactRequestsIdVar();
          },
        },
        currentChoseUserId: {
          read() {
            return currentChoseUserIdVar();
          },
        },
      },
    },
  },
});
