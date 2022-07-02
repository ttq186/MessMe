import { useQuery } from '@apollo/client';

import { AttachIcon, ProfileIcon } from 'assets/icons';
import { Disclosure } from 'components/Disclosure';
import { Heading } from 'components/Heading/Heading';
import { ProfileAttachFile } from 'pages/Dashboard/DashboardProfile';
import { GET_CURRENT_USER } from 'graphql/users';

export const ProfileDisclosure = () => {
  const {
    data: {
      currentUser: { username, email, phoneNumber, isFemale },
    },
  } = useQuery(GET_CURRENT_USER);

  return (
    <>
      <Disclosure
        icon={<ProfileIcon width='23px' height='23px' />}
        title='About'
      >
        <div className='px-1 py-1.5'>
          <div className='mb-3'>
            <Heading>Name</Heading>
            <p className='ml-2'>{username || 'N/A'}</p>
          </div>
          <div className='mb-3'>
            <Heading>Email</Heading>
            <p className='ml-2'>{email}</p>
          </div>
          <div className='mb-3'>
            <Heading>Phone Number</Heading>
            <p className='ml-2'>{phoneNumber || 'N/A'}</p>
          </div>
          <div className='mb-1'>
            <Heading>Gender</Heading>
            <p className='ml-2'>
              {isFemale == null ? 'N/A' : isFemale ? 'Female' : 'Male'}
            </p>
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
