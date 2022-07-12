import { useState } from 'react';
import { useLazyQuery, useMutation } from '@apollo/client';

import { Modal } from 'components/Modal';
import { CREATE_CONTACT } from 'graphql/contacts/mutations';
import { GET_CONTACTS } from 'graphql/contacts/queries';
import { useEffect } from 'react';

export const ContactModal = ({ triggerButton }) => {
  const [contactInfo, setContactInfo] = useState('');
  const [lastTyping, setlastTyping] = useState(Date.now());
  const [invitationMessage, setInvitationMessage] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [getContacts, { data }] = useLazyQuery(GET_CONTACTS);
  const [createContact] = useMutation(CREATE_CONTACT);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };

  const handleAddContact = () => {
    if (!contactInfo.trim()) return;
    createContact({
      variables: {
        email: contactInfo,
        input: {
          invitationMessage,
        },
      },
    });

    closeModal();
    setContactInfo('');
    setInvitationMessage('');
  };

  const handleContactInputChange = (currentContactInfo) => {
    setContactInfo(currentContactInfo);

    if (Date.now() - lastTyping > 500) {
      getContacts({
        variables: {
          search: currentContactInfo,
        },
      });
    }
    setlastTyping(Date.now());
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
            Add Contact
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
