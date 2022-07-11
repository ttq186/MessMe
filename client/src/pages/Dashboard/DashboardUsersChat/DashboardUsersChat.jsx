import { useRef, useState } from 'react';
import { useQuery, useReactiveVar } from '@apollo/client';

import { SearchBar } from 'components/SearchBar';
import { GET_CONTACTS } from 'graphql/contacts/queries';
import { UsersChatItem } from './Conversation/UsersChatItem';
import { activeUserChatVar } from 'cache';
import { UsersChatSkeleton } from './Skeleton/UsersChatSkeleton';
import { useEffect } from 'react';

export const DashboardUsersChat = () => {
  const userChatRefs = useRef([]);
  const [contactsByLastInteraction, setContactsByLastInteraction] = useState(
    []
  );
  const activeUserChat = useReactiveVar(activeUserChatVar);

  const { data } = useQuery(GET_CONTACTS, {
    onCompleted: (data) => {
      if (data.contacts.length === 0) return;

      const temp = [...data.contacts].sort(
        (firstContact, secondContact) =>
          new Date(secondContact.lastMessage.createdAt).getTime() -
          new Date(firstContact.lastMessage.createdAt).getTime()
      );
      activeUserChatVar(temp[0].friend);
      setContactsByLastInteraction(temp);
    },
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
          contactsByLastInteraction.map((item, index) => (
            <UsersChatItem
              key={item.friend.id}
              {...item}
              isActive={true}
              isChose={activeUserChat.id === item.friend.id}
              ref={userChatRefs.current[index]}
            />
          ))
        )}
      </div>
    </>
  );
};
