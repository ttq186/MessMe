import { useState } from 'react';
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from '@apollo/client';

import { Modal } from 'components/Modal';
import { CREATE_CONTACT } from 'graphql/contacts';
import { GET_CURRENT_USER, GET_USERS } from 'graphql/users';
import { AvatarIcon } from 'assets/icons';
import {
  contactRequestsIdVar,
  contactsIdVar,
  currentChoseUserIdVar,
} from 'cache';

const partnerStatus = {
  FRIEND: 'Friend',
  REQUESTED: 'Requested',
  STRANGER: 'Stranger',
};

const UserItem = ({ id, avatarUrl, username, email, status }) => {
  const handleChooseUser = (e) => {
    if (!e.target.checked) {
      currentChoseUserIdVar(null);
    } else {
      currentChoseUserIdVar(id);
    }
  };

  return (
    <label
      className='flex items-center p-2 mx-3 my-3 opacity-80 bg-slate-500 rounded cursor-pointer transition duration-300 ease-out hover:ease-in hover:opacity-100'
      id='checkbox'
    >
      <div className='flex items-end p-1'>
        {!avatarUrl ? (
          <AvatarIcon width='40px' height='40px' />
        ) : (
          <img
            src={avatarUrl}
            alt='Friend'
            className='w-10 h-10 rounded-full'
          />
        )}
      </div>
      <div className='grow ml-2'>
        <p className='font-bold -mt-0.5'>
          {username ? username : email.split('@')[0]}
        </p>
        <p className='text-sm text-slate-300 font-medium'>{status}</p>
      </div>
      {status === partnerStatus.STRANGER && (
        <div className='mr-4'>
          <input
            type='checkbox'
            id='checkbox'
            className='scale-125'
            onChange={(e) => handleChooseUser(e)}
          />
        </div>
      )}
    </label>
  );
};

export const ContactModal = ({ triggerButton }) => {
  const [invitationMessage, setInvitationMessage] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [timeOutObj, setTimeOutObj] = useState(null);

  const contactsId = useReactiveVar(contactsIdVar);
  const currentChoseUserId = useReactiveVar(currentChoseUserIdVar);
  const contactRequestsId = useReactiveVar(contactRequestsIdVar);

  const { data: currentUserObj } = useQuery(GET_CURRENT_USER);
  const [createContact] = useMutation(CREATE_CONTACT);
  const [getUsers, { data }] = useLazyQuery(GET_USERS);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
    getUsers({
      variables: {
        search: '1862002',
      },
    });
  };

  const handleAddContact = () => {
    if (!currentChoseUserId) return;

    createContact({
      variables: {
        partnerId: currentChoseUserId,
        input: { invitationMessage },
      },
    });
    closeModal();
    currentChoseUserIdVar(null);
    contactRequestsIdVar([...contactRequestsId, currentChoseUserId]);
    setInvitationMessage('');
  };

  const handleContactInputChange = (currentContactInfo) => {
    clearTimeout(timeOutObj);
    const newTimeout = setTimeout(() => {
      if (currentContactInfo.trim() !== '') {
        getUsers({
          variables: {
            search: currentContactInfo,
          },
        });
      }
    }, 500);
    setTimeOutObj(newTimeout);
  };

  const getPartnerStatus = (partner) => {
    const partnerId = partner.id;
    if (contactsId.includes(partnerId)) return partnerStatus.FRIEND;
    if (contactRequestsId.includes(partnerId)) return partnerStatus.REQUESTED;
    return partnerStatus.STRANGER;
  };

  return (
    <Modal
      triggerButton={triggerButton}
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <div
        className='text-xl font-bold text-gray-200 pb-2 border-b-[0.5px]
        border-gray-300'
      >
        Add Contact
      </div>

      <div className='mt-5'>
        <div className='mb-4 text-slate-300'>
          <label className='text-[15px] font-bold' htmlFor='email'>
            Name or Email
          </label>
          <div className='my-1'>
            <input
              type='text'
              id='email'
              placeholder='Enter name or email'
              className='w-full p-2.5 md:px-4 bg-gray-600 rounded font-medium text-sm md:text-[15px] focus:outline-none'
              onChange={(e) => handleContactInputChange(e.target.value)}
            />
          </div>

          {data && (
            <div className='bg-slate-600 py-1 rounded mt-2'>
              <div className='max-h-[300px] pl-1 bg-slate-600 overflow-y-scroll scrollbar-transparent hover:scrollbar'>
                {data.users.map((user) => {
                  if (user.id === currentUserObj?.currentUser.id) return;
                  return (
                    <UserItem
                      key={user.id}
                      {...user}
                      status={getPartnerStatus(user)}
                    />
                  );
                })}
              </div>
            </div>
          )}
        </div>

        <div className='mb-4 text-slate-300'>
          <label className='text-[15px] font-bold' htmlFor='invitation-message'>
            Invitation Message
          </label>
          <div className='my-1'>
            <textarea
              id='invitation-message'
              className='w-full bg-gray-600 text-sm p-2 px-4 font-medium focus:outline-none rounded'
              placeholder='Enter message'
              rows={4}
              onChange={(e) => setInvitationMessage(e.target.value)}
            />
          </div>
        </div>
        <div className='my-5'>
          <button
            className='float-right bg-blue-300 font-semibold text-gray-700 rounded-[3px] py-1.5 px-3 text-[15px] hover:opacity-90'
            onClick={handleAddContact}
          >
            Send Request
          </button>
          <button
            className='float-right text-blue-300 font-semibold rounded py-1.5 px-3 mr-3 text-[15px] hover:opacity-90'
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
