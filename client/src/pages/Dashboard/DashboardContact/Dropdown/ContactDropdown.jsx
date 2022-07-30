import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Menu } from '@headlessui/react';

import { ShareIcon, BlockIcon, RemoveIcon } from 'assets/icons';
import { Dropdown } from 'components/Dropdown';
import { Modal } from 'components/Modal';
import { DELETE_CONTACT, GET_CONTACTS } from 'graphql/contacts';
import { client } from 'apolloConfig';

export const ContactDropdown = ({ triggerButton, id }) => {
  const [isOpenModal, setOpenModal] = useState(false);
  const [deleteContact] = useMutation(DELETE_CONTACT);

  const openModal = () => {
    setOpenModal(true);
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleDeleteContact = () => {
    // deleteContact({
    //   variables: {
    //     id,
    //   },
    //   update(cache) {
    //     console.log('before', cache);
    //     cache.modify({
    //       fields: {
    //         contacts(existingContacts = []) {
    //           const newContacts = existingContacts.filter(
    //             (contact) => contact.id !== id
    //           );
    //           return newContacts;
    //         },
    //       },
    //     });
    //   },
    // });
    console.log('after', client);
    closeModal();
  };

  return (
    <>
      <Modal
        isOpen={isOpenModal}
        openModal={() => setOpenModal(true)}
        closeModal={() => setOpenModal(false)}
      >
        <p className='text-[17.5px] font-semibold text-slate-300'>
          Are you sure you want to delete this contact?
        </p>
        <div className='mb-5 mt-6'>
          <button
            className='float-right bg-blue-300 font-semibold text-gray-700 rounded-[3px] py-1.5 px-3 text-sm hover:opacity-90'
            onClick={handleDeleteContact}
          >
            Confirm
          </button>
          <button
            className='float-right text-blue-300 font-semibold rounded py-1.5 px-3 mr-3 text-sm hover:opacity-90'
            onClick={closeModal}
          >
            Cancel
          </button>
        </div>
      </Modal>

      <Dropdown triggerButton={triggerButton}>
        <Menu.Item>
          <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm opacity-40 cursor-not-allowed'>
            <img src={ShareIcon} alt='Share' className='w-4 h-4 mr-3' />
            Share
          </button>
        </Menu.Item>
        <Menu.Item>
          <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm opacity-40 cursor-not-allowed'>
            <img src={BlockIcon} alt='Block' className='w-4 h-4 mr-3' />
            Block
          </button>
        </Menu.Item>
        <Menu.Item>
          <button
            className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'
            onClick={openModal}
          >
            <img src={RemoveIcon} alt='Remove' className='w-4 h-4 mr-3' />
            Delete
          </button>
        </Menu.Item>
      </Dropdown>
    </>
  );
};
