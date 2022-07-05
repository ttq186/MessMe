// import { useSubscription } from '@apollo/client';
import { SearchBar } from 'components/SearchBar';
// import { MESSAGES_SUBSCRIPTION } from 'graphql/messages/subscriptions';
import { UsersChatConversation } from './Conversation/UsersChatConversation';

export const DashboardUsersChat = () => {
  // const { data } = useSubscription(MESSAGES_SUBSCRIPTION, {
  //   variables: { receiverId: '123123123' },
  //   // onSubscriptionData: (data) => console.log("newdata", data)
  //   onSubscriptionComplete: data => console.log("newData", data)
  // });
  // if (!data) return;
  // console.log(data);

  return (
    <>
      <div className='p-6 pb-2'>
        <p className='text-2xl font-bold'>Chat</p>
        <SearchBar placeholder='Search Users' />
      </div>

      <p className='font-bold text ml-6 mt-5 mb-3'>Recent</p>
      <div className='ml-3 mr-1.5 mb-3 overflow-y-scroll scrollbar-transparent hover:scrollbar'>
        <UsersChatConversation isActive={true} isChose={true} />
        <UsersChatConversation />
        <UsersChatConversation isActive={true} />
        <UsersChatConversation />
        <UsersChatConversation />
        <UsersChatConversation />
        <UsersChatConversation />
        <UsersChatConversation />
        <UsersChatConversation />
      </div>
    </>
  );
};
