import { useState, useRef } from 'react';

import { CancelIcon, VideoCallIcon } from 'assets/icons';
import { Modal } from 'components/Modal';

export const MainChatVideoCallModal = ({ triggerButton }) => {
  const [isOpen, setOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  const closeModal = () => {
    setOpen(false);
  };

  const openModal = () => {
    setOpen(true);
  };

  return (
    <Modal
      triggerButton={triggerButton}
      isOpen={isOpen}
      openModal={openModal}
      closeModal={closeModal}
    >
      <div className='flex flex-col items-center mt-9 mb-3 font-semibold'>
        <div className='flex flex-row-reverse items-end'>
          <img
            src='https://avatars.githubusercontent.com/u/73225256'
            alt='Avatar'
            className='w-28 h-28 rounded-full border-4 border-slate-600'
          />
        </div>
        <p className='mt-4 text-slate-200 text-xl'>Thanh Quang</p>
        <p className='text-slate-400 text-sm'>Start Video Call</p>
        <div className='flex mt-12 mb-3'>
          <div
            className='bg-rose-500 p-3 mr-3 rounded-full cursor-pointer hover:opacity-90'
            ref={cancelButtonRef}
            onClick={closeModal}
          >
            <CancelIcon fill='#e2e8f0' />
          </div>
          <div className='bg-emerald-500 p-3 ml-3 rounded-full cursor-pointer hover:opacity-90'>
            <VideoCallIcon width='25px' height='25px' fill='#e2e8f0' />
          </div>
        </div>
      </div>
    </Modal>
  );
};
