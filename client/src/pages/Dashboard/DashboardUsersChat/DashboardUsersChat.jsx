import { useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';

import { SearchBar } from 'components/SearchBar';
import { GET_CONTACTS } from 'graphql/contacts';
import { UsersChatItem } from './Conversation/UsersChatItem';
import {
  activeUserChatVar,
  contactsIdVar,
  contactsJustSentMessagesVar,
} from 'cache';
import { UsersChatSkeleton } from './Skeleton/UsersChatSkeleton';

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
    }
    const searchValueInLowerCase = searchValue.toLowerCase();
    const contactsBySearch = contactsByLastInteraction.filter((contact) => {
      if (
        contact.friend.username &&
        contact.friend.username.toLowerCase().includes(searchValueInLowerCase)
      ) {
        return contact;
      }
      if (contact.friend.email.split('@')[0].includes(searchValueInLowerCase)) {
        return contact;
      }
    });
    setContactsBySearchValue(contactsBySearch);
  };

  const { data } = useQuery(GET_CONTACTS, {
    onCompleted: (data) => {
      if (data.contacts.length === 0) return;

      const contactsId = data.contacts.map((contact) => contact.friend.id);
      contactsIdVar(contactsId);
      const establishedContacts = data.contacts.filter(
        (contact) => contact.isEstablished
      );
      const sortedContactsByLastMessage = establishedContacts.sort(
        (firstContact, secondContact) =>
          sortContactByLastMessage(firstContact, secondContact)
      );
      if (!activeUserChat) {
        activeUserChatVar(sortedContactsByLastMessage[0].friend);
      }
      setContactsByLastInteraction(sortedContactsByLastMessage);
    },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <div className='p-6 pb-2'>
        <p className='text-2xl font-bold'>Chat</p>
        <SearchBar
          placeholder='Search Users'
          handleSearchUser={handleSearchUser}
        />
      </div>

      <p className='font-bold text ml-6 mt-5 mb-3'>Recent</p>
      <div className='ml-3 mr-1.5 mb-3 overflow-y-scroll scrollbar-transparent hover:scrollbar'>
        {!data ? (
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
