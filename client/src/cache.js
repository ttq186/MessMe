import { makeVar, InMemoryCache } from '@apollo/client';

export const hasLoadWelcomeAnimationVar = makeVar(false);
export const isSignUpSuccessVar = makeVar(false);
export const activeUserChatVar = makeVar(null);

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
      },
    },
  },
});
