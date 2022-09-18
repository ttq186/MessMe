import { useState } from "react";
import { useQuery, useReactiveVar } from "@apollo/client";

import { SearchBar } from "components/SearchBar";
import { GET_CONTACTS } from "graphql/contacts";
import { UsersChatItem } from "./Conversation/UsersChatItem";
import {
  activeUserChatVar,
  contactsIdVar,
  contactsJustSentMessagesVar,
} from "cache";
import { UsersChatSkeleton } from "./Skeleton/UsersChatSkeleton";

export const DashboardUsersChat = () => {
  const [contactsByLastInteraction, setContactsByLastInteraction] = useState(
    []
  );
  const [contactsBySearchValue, setContactsBySearchValue] = useState(
    contactsByLastInteraction
  );
  const activeUserChat = useReactiveVar(activeUserChatVar);
  const contactsJustSentMessages = useReactiveVar(contactsJustSentMessagesVar);

  const sortContactByLastMessage = (firstContact, secondContact) => {
    if (!firstContact.lastMessage) return 1;
    if (!secondContact.lastMessage) return -1;
    return (
      new Date(secondContact.lastMessage.createdAt).getTime() -
      new Date(firstContact.lastMessage.createdAt).getTime()
    );
  };

  const handleSearchUser = (searchValue) => {
    if (!searchValue.trim()) {
      setContactsBySearchValue(contactsByLastInteraction);
      return;
    }
    const searchValueInLowerCase = searchValue.toLowerCase();
    const contactsBySearch = contactsByLastInteraction.filter((contact) => {
      const { username, email } = contact.friend;
      return (
        username?.toLowerCase().includes(searchValueInLowerCase) ||
        email.toLowerCase().includes(searchValueInLowerCase)
      );
    });
    setContactsBySearchValue(contactsBySearch);
  };

  const { data: contactsObj } = useQuery(GET_CONTACTS, {
    variables: {
      isEstablished: true,
    },
    onCompleted: (data) => {
      if (data.contacts.length === 0) return;

      const contactsId = data.contacts.map((contact) => contact.friend.id);
      contactsIdVar(contactsId);
      const sortedContactsByLastMessage = data.contacts.sort(
        (firstContact, secondContact) =>
          sortContactByLastMessage(firstContact, secondContact)
      );
      if (!activeUserChat) {
        activeUserChatVar(sortedContactsByLastMessage[0].friend);
      }
      setContactsByLastInteraction(sortedContactsByLastMessage);
      setContactsBySearchValue(sortedContactsByLastMessage);
    },
    fetchPolicy: "network-only",
  });

  return (
    <>
      <div className="p-6 pb-2">
        <p className="text-2xl font-bold">Chat</p>
        <SearchBar placeholder="Search Users" handleSearch={handleSearchUser} />
      </div>

      <p className="font-bold text ml-6 mt-5 mb-3">Recent</p>
      <div className="ml-3 mr-1.5 mb-3 overflow-y-scroll scrollbar-transparent hover:scrollbar">
        {!contactsObj ? (
          <div>
            <UsersChatSkeleton />
            <UsersChatSkeleton />
            <UsersChatSkeleton />
          </div>
        ) : (
          contactsBySearchValue.map((item) => (
            <UsersChatItem
              key={item.friend.id}
              {...item}
              isActive={true}
              isChose={activeUserChat.id === item.friend.id}
              hasJustSentMessage={contactsJustSentMessages.includes(
                item.friend.id
              )}
            />
          ))
        )}
      </div>
    </>
  );
};
