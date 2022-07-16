import { useState, useEffect } from 'react';
import {
  useQuery,
  useSubscription,
  useLazyQuery,
  useReactiveVar,
} from '@apollo/client';
import useSound from 'use-sound';

import {
  DashboardGroup,
  DashboardSideBar,
  DashboardContact,
  DashboardSetting,
  DashboardProfile,
  DashboardMainChat,
  DashboardUsersChat,
  DashboardNotification,
} from 'pages/Dashboard';
import { CHAT_MODE } from 'utils/contants/TabModeContants';
import { GET_CURRENT_USER } from 'graphql/users';
import { NotificationSound } from 'assets/sounds';
import {
  GET_CONTACT,
  GET_CONTACTS,
  GET_CONTACT_REQUESTS,
  SUBCRIBE_CONTACT_REQUESTS,
} from 'graphql/contacts';
import { hasNewNotificationVar, contactsIdVar, activeUserChatVar } from 'cache';
import {
  GET_MESSAGES_BY_SENDER_AND_RECEIVER,
  SUBSCRIBE_MESSAGE,
} from 'graphql/messages';
import { client } from 'apolloConfig';

const componentByTabMode = {
  CHAT_MODE: <DashboardUsersChat />,
  GROUP_MODE: <DashboardGroup />,
  PROFILE_MODE: <DashboardProfile />,
  CONTACT_MODE: <DashboardContact />,
  SETTING_MODE: <DashboardSetting />,
  NOTIFICATION_MODE: <DashboardNotification />,
};

export const Dashboard = () => {
  const [isOpenFriendProfile, setOpenFriendProfile] = useState(false);
  const [tabMode, setTabMode] = useState(CHAT_MODE);
  const [playNotificationSound] = useSound(NotificationSound);
  const contactsId = useReactiveVar(contactsIdVar);
  const activeUserChat = useReactiveVar(activeUserChatVar);

  const { data: currentUserObj } = useQuery(GET_CURRENT_USER);
  const [getMessages, { subscribeToMore }] = useLazyQuery(
    GET_MESSAGES_BY_SENDER_AND_RECEIVER
  );
  const [getContact] = useLazyQuery(GET_CONTACT, { fetchPolicy: 'cache-and-network' });

  const notifyNewMessage = () => {
    playNotificationSound();
    document.title = 'New Message!';
    setTimeout(() => {
      document.title = 'MessMe';
    }, 5000);
  };

  const notifyNewContactRequest = () => {
    playNotificationSound();
    document.title = 'New Friend Request!';
    hasNewNotificationVar(true);
  };

  const subcribeMessageToAllContacts = () => {
    for (let contactId of contactsId) {
      subscribeToMore({
        document: SUBSCRIBE_MESSAGE,
        variables: {
          senderId: currentUserObj.currentUser.id,
          receiverId: contactId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;

          console.log(client);

          const messageSenderId = subscriptionData.data.message.senderId;
          if (messageSenderId !== currentUserObj.currentUser.id) {
            notifyNewMessage();
            if (messageSenderId !== activeUserChat.id) {
              return prev;
            }
          }

          getContact({
            variables: {
              partnerId: messageSenderId,
            },
          });
          return {
            messagesBySenderAndReceiver: [
              ...prev.messagesBySenderAndReceiver,
              subscriptionData.data.message,
            ],
          };
        },
      });
    }
  };

  useSubscription(SUBCRIBE_CONTACT_REQUESTS, {
    onSubscriptionData: () => {
      notifyNewContactRequest();
    },
  });

  useQuery(GET_CONTACT_REQUESTS, {
    onCompleted: (data) => {
      if (data.contactRequests.length !== 0) {
        hasNewNotificationVar(true);
      } else {
        hasNewNotificationVar(false);
      }
    },
  });

  useEffect(() => {
    if (activeUserChat && currentUserObj) {
      getMessages({
        variables: {
          receiverId: activeUserChat.id,
          senderId: currentUserObj.currentUser.id,
        },
      });
    }
  }, [activeUserChat, currentUserObj]);

  useEffect(() => {
    if (contactsId.length !== 0 && currentUserObj) {
      subcribeMessageToAllContacts();
    }
  }, [contactsId, currentUserObj]);

  return (
    <div className='flex'>
      <DashboardSideBar tabMode={tabMode} setTabMode={setTabMode} />

      <div className='flex flex-col w-[400px] h-screen bg-gray-700 text-slate-200'>
        {componentByTabMode[tabMode]}
      </div>

      <DashboardMainChat setOpenFriendProfile={setOpenFriendProfile} />

      {isOpenFriendProfile && (
        <div className='flex flex-col w-[380px] h-screen bg-gray-700 text-slate-200 border-l-2 border-slate-500'>
          <DashboardProfile
            isOpenFriendProfile={isOpenFriendProfile}
            setOpenFriendProfile={setOpenFriendProfile}
          />
        </div>
      )}
    </div>
  );
};
