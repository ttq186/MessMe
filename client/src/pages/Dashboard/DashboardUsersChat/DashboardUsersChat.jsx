import { useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';

import { SearchBar } from 'components/SearchBar';
import { GET_CONTACTS } from 'graphql/contacts/queries';
import { UsersChatItem } from './Conversation/UsersChatItem';
import { activeUserChatVar, contactsIdVar } from 'cache';
import { UsersChatSkeleton } from './Skeleton/UsersChatSkeleton';
import { useEffect } from 'react';

export const DashboardUsersChat = () => {
  const [contactsByLastInteraction, setContactsByLastInteraction] = useState(
    []
  );
  const activeUserChat = useReactiveVar(activeUserChatVar);

  const { data } = useQuery(GET_CONTACTS, {
    onCompleted: (data) => {
      if (data.contacts.length === 0) return;

      const contactsId = data.contacts.map((contact) => contact.friend.id);
      contactsIdVar(contactsId);
      const establishedContacts = data.contacts.filter(
        (contact) => contact.isEstablished
      );
      const temp = establishedContacts.sort((firstContact, secondContact) => {
        if (!firstContact.lastMessage) return 1;
        if (!secondContact.lastMessage) return -1;
        return (
          new Date(secondContact.lastMessage.createdAt).getTime() -
          new Date(firstContact.lastMessage.createdAt).getTime()
        );
      });

      if (!activeUserChat) {
        activeUserChatVar(temp[0].friend);
      }
      setContactsByLastInteraction(temp);
    },
    fetchPolicy: 'network-only',
  });

  return (
    <>
      <div className='p-6 pb-2'>
        <p className='text-2xl font-bold'>Chat</p>
        <SearchBar placeholder='Search Users' />
      </div>

      <p className='font-bold text ml-6 mt-5 mb-3'>Recent</p>
      <div className='ml-3 mr-1.5 mb-3 overflow-y-scroll scrollbar-transparent hover:scrollbar'>
        {!data ? (
          <div>
            <UsersChatSkeleton />
            <UsersChatSkeleton />
            <UsersChatSkeleton />
            <UsersChatSkeleton />
            <UsersChatSkeleton />
            <UsersChatSkeleton />
            <UsersChatSkeleton />
          </div>
        ) : (
          contactsByLastInteraction.map((item) => (
            <UsersChatItem
              key={item.friend.id}
              {...item}
              isActive={true}
              isChose={activeUserChat.id === item.friend.id}
            />
          ))
        )}
      </div>
    </>
  );
};
