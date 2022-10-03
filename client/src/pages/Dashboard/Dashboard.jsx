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
import { GET_CURRENT_USER, GET_SAS_TOKEN, GET_ONLINE_USER_IDS } from "graphql/users";
import { GET_CONTACTS } from "graphql/contacts";
import { NotificationSound } from "assets/sounds";
import { GET_CONTACT_REQUESTS, SUBCRIBE_CONTACT_REQUESTS } from "graphql/contacts";
import {
  hasNewNotificationVar,
  contactsIdVar,
  activeUserChatVar,
  contactsJustSentMessagesVar,
  signInRequiredVar,
  subscribedChannelIdsVar,
  onlineUserIdsVar,
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

  const notificationSound = new Howl({ src: NotificationSound });

  const { data: currentUserObj } = useQuery(GET_CURRENT_USER);
  const [getMessages, { subscribeToMore }] = useLazyQuery(GET_MESSAGES_BY_CHANNEL);
  const navigate = useNavigate();

  useSubscription(SUBCRIBE_CONTACT_REQUESTS, {
    onSubscriptionData: () => {
      notifyNewContactRequest();
    },
    shouldResubscribe: false,
  });

  useQuery(GET_ONLINE_USER_IDS, {
    pollInterval: 5000,
    onCompleted: ({ onlineUserIds }) => onlineUserIdsVar(onlineUserIds),
  });
  useQuery(GET_SAS_TOKEN);
  useQuery(GET_CONTACT_REQUESTS, {
    onCompleted: (data) => {
      if (data.contactRequests.length !== 0) {
        hasNewNotificationVar(true);
      } else {
        hasNewNotificationVar(false);
      }
    },
  });

  const notifyNewMessage = () => {
    notificationSound.play();
    document.title = "New Message!";
    setTimeout(() => {
      document.title = "MessMe";
    }, 10000);
  };

  const notifyNewContactRequest = () => {
    notificationSound.play();
    document.title = "New Friend Request!";
    hasNewNotificationVar(true);
  };

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
  }, [activeUserChat, currentUserObj, getMessages]);

  useEffect(() => {
    if (contactsId.length !== 0 && currentUserObj) {
      const currentUserId = currentUserObj.currentUser.id;
      for (let contactId of contactsId) {
        const channelId = generateMessageChannelByUsersId(currentUserId, contactId);
        if (subscribedChannelIdsVar().includes(channelId)) continue;
        subscribedChannelIdsVar([...subscribedChannelIdsVar(), channelId]);

        subscribeToMore({
          document: SUBSCRIBE_MESSAGE,
          variables: { channelId },
          updateQuery: (prev, { subscriptionData }) => {
            if (!subscriptionData) return prev;
            const subscriptionMessage = subscriptionData.data.message;
            const indexOfDuplicatedMessage = prev.messagesByChannel.findIndex(
              (message) => message._id === subscriptionMessage._id
            );
            const currentMessages = prev.messagesByChannel;
            if (indexOfDuplicatedMessage !== -1) {
              return {
                messagesByChannel: [
                  ...currentMessages.slice(0, indexOfDuplicatedMessage),
                  subscriptionMessage,
                  ...currentMessages.slice(indexOfDuplicatedMessage + 1),
                ],
              };
            }
            const messageSenderId = subscriptionMessage.senderId;

            if (messageSenderId !== currentUserId) {
              updateLastMessageOfContacts(messageSenderId, subscriptionMessage);
              notifyNewMessage();
              if (!contactsJustSentMessagesVar().includes(messageSenderId)) {
                contactsJustSentMessagesVar([
                  ...contactsJustSentMessagesVar(),
                  messageSenderId,
                ]);
              }
            }
            return {
              messagesByChannel: [...currentMessages, subscriptionMessage],
            };
          },
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsId, currentUserObj]);

  useEffect(() => {
    if (!document.cookie.includes("logout=0")) {
      signInRequiredVar(true);
      navigate("/sign-in");
    } else {
      signInRequiredVar(false);
    }
  }, [navigate]);

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
