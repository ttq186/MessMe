import { useQuery } from '@apollo/client';

import { GET_CONTACT_REQUESTS } from 'graphql/contacts';
import { NotificationItem } from './Item/NotificationItem';

export const DashboardNotification = () => {
  const { data: contactRequestsObj } = useQuery(GET_CONTACT_REQUESTS);
  if (contactRequestsObj) console.log(contactRequestsObj.contactRequests);

  return (
    <>
      <div className='p-6 pb-2 mb-10'>
        <p className='text-2xl font-bold'>Notifications</p>
      </div>

      <p className='font-bold text ml-6 mt-5 mb-3'>Friend Requests</p>
      <div className='ml-3 mr-1 mb-3 overflow-y-scroll scrollbar-transparent hover:scrollbar'>
        {contactRequestsObj?.contactRequests.map((item) => (
          <NotificationItem
            key={item.friend.id}
            partner={item.friend}
            {...item}
          />
        ))}
      </div>
    </>
  );
};
