import { useState } from 'react';

import { Modal } from 'components/Modal';
import { ContactByFirstLetter } from 'pages/Dashboard/DashboardGroup';

export const GroupModal = ({ triggerButton }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenContactList, setOpenContactList] = useState(false);

  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const toggleContactList = () => {
    setOpenContactList(!isOpenContactList);
  };

  return (
    <Modal
      triggerButton={triggerButton}
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <div
        className='text-xl font-bold text-gray-300 pb-2 border-b-[0.5px]
        border-gray-400'
      >
        Create New Group
      </div>

      <div className='mt-5'>
        <div className='mb-4 text-slate-400'>
          <label className='text-[15px] font-bold' htmlFor='group-name'>
            Group Name
          </label>
          <div className='my-1'>
            <input
              type='text'
              id='group-name'
              placeholder='Enter Group Name'
              className='w-full p-2.5 md:px-4 bg-gray-600 rounded font-medium text-sm outline-none border-none'
            />
          </div>
        </div>

        <div className='mb-4 text-slate-400'>
          <label className='text-[15px] font-bold' htmlFor='group-members'>
            Group Members
          </label>
          <div className='my-1'>
            <button
              className='bg-slate-500 text-[13px] text-slate-200 font-semibold px-2.5 py-1.5 rounded hover:bg-slate-600'
              onClick={toggleContactList}
            >
              Select Members
            </button>
            <div
              className={`${
                isOpenContactList ? 'block' : 'hidden'
              } my-3 bg-gray-600 rounded-md`}
            >
              <div className='flex justify-between items-center bg-gray-600 text-slate-200 font-semibold px-4 py-2 rounded-t border-b-2 border-slate-700'>
                <p>Contacts</p>
                <input
                  placeholder='Search Contacts'
                  className='text-slate-300 px-4 py-2.5 text-[13px] font-medium bg-slate-700 rounded outline-none'
                />
              </div>
              <div className='h-[25vh] overflow-y-scroll px-8 my-3 mr-1 font-semibold scrollbar-transparent hover:scrollbar'>
                <ContactByFirstLetter />
                <ContactByFirstLetter />
                <ContactByFirstLetter />
                <ContactByFirstLetter />
                <ContactByFirstLetter />
                <ContactByFirstLetter />
                <ContactByFirstLetter />
              </div>
            </div>
          </div>
        </div>
        <div className='mb-4 text-slate-400'>
          <label className='text-[15px] font-bold' htmlFor='description'>
            Description
          </label>
          <div className='my-1'>
            <textarea
              id='description'
              className='w-full bg-gray-600 text-sm font-medium p-2 px-4 focus:outline-none rounded'
              placeholder='Enter Description'
              rows={4}
            />
          </div>
        </div>
        <div className='my-5'>
          <button
            className='float-right bg-blue-300 font-semibold text-gray-700 rounded-[3px] py-1.5 px-3 text-[15px] hover:opacity-90'
            onClick={closeModal}
          >
            Create Group
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