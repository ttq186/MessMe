import { useState, useEffect } from "react";
import { Howl } from "howler";
import {
  useQuery,
  useSubscription,
  useLazyQuery,
  useReactiveVar,
} from "@apollo/client";

import {
  DashboardGroup,
  DashboardSideBar,
  DashboardContact,
  DashboardSetting,
  DashboardProfile,
  DashboardMainChat,
  DashboardUsersChat,
  DashboardNotification,
} from "pages/Dashboard";
import { CHAT_MODE } from "utils/contants/TabModeConstants";
import { GET_CURRENT_USER } from "graphql/users";
import { GET_CONTACTS } from "graphql/contacts";
import { NotificationSound } from "assets/sounds";
import {
  GET_CONTACT_REQUESTS,
  SUBCRIBE_CONTACT_REQUESTS,
} from "graphql/contacts";
import {
  hasNewNotificationVar,
  contactsIdVar,
  activeUserChatVar,
  contactsJustSentMessagesVar,
  signInRequiredVar,
  subscribedChannelIdsVar,
} from "cache";

import { GET_MESSAGES_BY_CHANNEL, SUBSCRIBE_MESSAGE } from "graphql/messages";
import { generateMessageChannelByUsersId } from "utils";
import { client } from "apolloConfig";
import { useNavigate } from "react-router-dom";

const componentByTabMode = {
  CHAT_MODE: <DashboardUsersChat />,
  GROUP_MODE: <DashboardGroup />,
  PROFILE_MODE: <DashboardProfile />,
  CONTACT_MODE: <DashboardContact />,
  SETTING_MODE: <DashboardSetting />,
  NOTIFICATION_MODE: <DashboardNotification />,
};

export const updateLastMessageOfContacts = (userId, newMessage) => {
  const { contacts: currentContacts } = client.readQuery({
    query: GET_CONTACTS,
    variables: {
      isEstablished: true,
    },
  });

  const updatedContact = currentContacts.find(
    (contact) => contact.friend.id === userId
  );
  const contactAfterUpdated = {
    ...updatedContact,
    lastMessage: {
      ...updatedContact.lastMessage,
      createdAt: newMessage.createdAt,
      content: newMessage.content,
    },
  };
  const contactsAfterUpdated = [
    ...currentContacts.filter((contact) => contact.friend.id !== userId),
    contactAfterUpdated,
  ];
  client.writeQuery({
    query: GET_CONTACTS,
    data: {
      contacts: contactsAfterUpdated,
    },
    variables: {
      isEstablished: true,
    },
  });
};

export const Dashboard = () => {
  const [isOpenFriendProfile, setOpenFriendProfile] = useState(false);
  const [tabMode, setTabMode] = useState(CHAT_MODE);

  const contactsId = useReactiveVar(contactsIdVar);
  const activeUserChat = useReactiveVar(activeUserChatVar);

  const contactsJustSentMessages = useReactiveVar(contactsJustSentMessagesVar);
  const subscribedChannelIds = useReactiveVar(subscribedChannelIdsVar);
  const { data: currentUserObj } = useQuery(GET_CURRENT_USER);
  const [getMessages, { subscribeToMore }] = useLazyQuery(
    GET_MESSAGES_BY_CHANNEL
  );
  const navigate = useNavigate();

  const playNotificationSound = () => {
    const notificationSound = new Howl({
      src: NotificationSound,
    });
    notificationSound.play();
  };

  const notifyNewMessage = () => {
    playNotificationSound();
    document.title = "New Message!";
    setTimeout(() => {
      document.title = "MessMe";
    }, 10000);
  };

  const notifyNewContactRequest = () => {
    playNotificationSound();
    document.title = "New Friend Request!";
    hasNewNotificationVar(true);
  };

  const subcribeMessageToAllContacts = () => {
    for (let contactId of contactsId) {
      const channelId = generateMessageChannelByUsersId(
        currentUserObj.currentUser.id,
        contactId
      );

      if (subscribedChannelIds.includes(channelId)) return;
      subscribedChannelIdsVar([...subscribedChannelIds, channelId]);

      subscribeToMore({
        document: SUBSCRIBE_MESSAGE,
        variables: {
          channelId,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          const subscriptionMessage = subscriptionData.data.message;
          const messageSenderId = subscriptionMessage.senderId;

          if (messageSenderId !== currentUserObj.currentUser.id) {
            updateLastMessageOfContacts(messageSenderId, subscriptionMessage);
            notifyNewMessage();
            if (
              messageSenderId !== activeUserChat.id &&
              !contactsJustSentMessages.includes(messageSenderId)
            ) {
              contactsJustSentMessagesVar([
                ...contactsJustSentMessages,
                messageSenderId,
              ]);
            }
            //   return prev;
          }
          return {
            messagesByChannel: [...prev.messagesByChannel, subscriptionMessage],
          };
        },
      });
    }
  };

  useSubscription(SUBCRIBE_CONTACT_REQUESTS, {
    onSubscriptionData: () => {
      notifyNewContactRequest();
    },
    shouldResubscribe: false,
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
          channelId: generateMessageChannelByUsersId(
            activeUserChat.id,
            currentUserObj.currentUser.id
          ),
        },
      });
    }
  }, [activeUserChat, currentUserObj]);

  useEffect(() => {
    if (contactsId.length !== 0 && currentUserObj) {
      subcribeMessageToAllContacts();
    }
  }, [contactsId, currentUserObj]);

  useEffect(() => {
    if (!document.cookie.includes("logout=0")) {
      signInRequiredVar(true);
      navigate("/sign-in");
    } else {
      signInRequiredVar(false);
    }
  }, []);

  return (
    <div className="flex">
      <DashboardSideBar tabMode={tabMode} setTabMode={setTabMode} />

      <div className="flex flex-col w-[400px] h-screen bg-gray-700 text-slate-200">
        {componentByTabMode[tabMode]}
      </div>

      <DashboardMainChat setOpenFriendProfile={setOpenFriendProfile} />

      {isOpenFriendProfile && (
        <div className="flex flex-col w-[380px] h-screen bg-gray-700 text-slate-200 border-l-2 border-slate-500">
          <DashboardProfile
            isOpenFriendProfile={isOpenFriendProfile}
            setOpenFriendProfile={setOpenFriendProfile}
          />
        </div>
      )}
    </div>
  );
};
