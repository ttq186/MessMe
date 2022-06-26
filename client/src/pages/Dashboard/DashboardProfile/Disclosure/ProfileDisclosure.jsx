import { useQuery } from '@apollo/client';

import { AttachIcon, ProfileIcon } from 'assets/icons';
import { Disclosure } from 'components/Disclosure';
import { ProfileAttachFile } from 'pages/Dashboard/DashboardProfile';
import { GET_CURRENT_USER } from 'queries/userQueries';

export const ProfileDisclosure = () => {
  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);

  return (
    <>
      <Disclosure
        icon={<ProfileIcon width='23px' height='23px' />}
        title='About'
      >
        <div className='px-1'>
          <div className='mb-3'>
            <h2 className='text-gray-700 font-bold text-[15px]'>Name</h2>
            <p className='ml-2'>{currentUser.username || 'N/A'}</p>
          </div>
          <div className='mb-3'>
            <h2 className='text-gray-700 font-bold text-[15px]'>Email</h2>
            <p className='ml-2'>{currentUser.email}</p>
          </div>
          <div className='mb-3'>
            <h2 className='text-gray-700 font-bold text-[15px]'>
              Phone Number
            </h2>
            <p className='ml-2'>{currentUser.phoneNumber || 'N/A'}</p>
          </div>
          <div className='mb-1'>
            <h2 className='text-gray-700 font-bold text-[15px]'>Location</h2>
            <p className='ml-2'>{currentUser.location || 'N/A'}</p>
          </div>
        </div>
      </Disclosure>

      <Disclosure
        icon={<AttachIcon width='23px' height='23px' />}
        title='Attached Files'
      >
        <ProfileAttachFile />
        <ProfileAttachFile />
        <ProfileAttachFile />
        <ProfileAttachFile />
        <ProfileAttachFile />
      </Disclosure>
    </>
  );
};
