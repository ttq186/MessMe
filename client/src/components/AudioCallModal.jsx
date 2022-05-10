import { Fragment, useState, useRef } from 'react';
import { Dialog, Transition } from '@headlessui/react';

import { CancelIcon, PhoneIcon } from 'assets/icons';

const AudioCallModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelButtonRef = useRef(null);
  const closeModal = () => {
    setIsOpen(false);
  };

  const openModal = () => {
    setIsOpen(true);
  };

  return (
    <>
      <button type='button' onClick={openModal}>
        {props.children}
      </button>

      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as='div'
          className='relative z-10'
          onClose={closeModal}
          initialFocus={cancelButtonRef}
        >
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-600 bg-opacity-80' />
          </Transition.Child>

          <div className='fixed inset-0 overflow-y-auto'>
            <div className='flex min-h-full items-center justify-center p-4 text-center'>
              <Transition.Child
                as={Fragment}
                enter='ease-out duration-300'
                enterFrom='opacity-0 scale-95'
                enterTo='opacity-100 scale-100'
                leave='ease-in duration-200'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-95'
              >
                <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-md bg-slate-700 border-2 border-slate-600 p-6 text-left shadow-xl transition-all'>
                  <div className='flex flex-col items-center mt-9 mb-3 font-semibold'>
                    <div className='flex flex-row-reverse items-end'>
                      <img
                        src='https://avatars.githubusercontent.com/u/73225256'
                        alt='Avatar'
                        className='w-28 h-28 rounded-full border-4 border-slate-600'
                      />
                    </div>
                    <p className='mt-4 text-slate-200 text-xl'>Thanh Quang</p>
                    <p className='text-slate-400 text-sm'>Start Audio Call</p>
                    <div className='flex mt-12 mb-3'>
                      <div
                        className='bg-rose-500 p-3 mr-3 rounded-full cursor-pointer hover:opacity-90'
                        ref={cancelButtonRef}
                        onClick={closeModal}
                      >
                        <CancelIcon fill='#e2e8f0' />
                      </div>
                      <div className='bg-emerald-500 p-3 ml-3 rounded-full cursor-pointer hover:opacity-90'>
                        <PhoneIcon fill='#e2e8f0' />
                      </div>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default AudioCallModal;
