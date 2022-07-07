import { useQuery } from '@apollo/client';

import { SearchBar } from 'components/SearchBar';
import { GET_CONTACTS } from 'graphql/contacts/queries';
import { UsersChatItem } from './Conversation/UsersChatItem';

export const DashboardUsersChat = () => {
  const { data } = useQuery(GET_CONTACTS);

  if (!data) return;
  console.log(data);

  return (
    <>
      <div className='p-6 pb-2'>
        <p className='text-2xl font-bold'>Chat</p>
        <SearchBar placeholder='Search Users' />
      </div>

      <p className='font-bold text ml-6 mt-5 mb-3'>Recent</p>
      <div className='ml-3 mr-1.5 mb-3 overflow-y-scroll scrollbar-transparent hover:scrollbar'>
        {data.contacts.map((item) => (
          <UsersChatItem
            key={item.id}
            {...item.friend}
            isActive={true}
            isChose={true}
          />
        ))}
      </div>
    </>
  );
};
