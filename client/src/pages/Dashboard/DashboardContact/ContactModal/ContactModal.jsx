import { useState } from 'react';

import { Modal } from 'components/Modal';

export const ContactModal = ({ triggerButton }) => {
  const [isOpen, setOpen] = useState(false);

  const openModal = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
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
            Email
          </label>
          <div className='my-1'>
            <input
              type='text'
              id='email'
              placeholder='Enter Email'
              className='w-full p-2.5 md:px-4 bg-gray-600 rounded font-medium text-sm md:text-[15px] focus:outline-none'
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
              placeholder='Enter Message'
              rows={4}
            />
          </div>
        </div>
        <div className='my-5'>
          <button
            className='float-right bg-blue-300 font-semibold text-gray-700 rounded-[3px] py-1.5 px-3 text-[15px] hover:opacity-90'
            onClick={closeModal}
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
