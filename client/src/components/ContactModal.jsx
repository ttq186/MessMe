import { Dialog, Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';

const ContactModal = (props) => {
  const [isOpen, setIsOpen] = useState(false);

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
        <Dialog as='div' className='relative z-10' onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-gray-600 bg-opacity-60' />
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
                <Dialog.Panel className='w-full max-w-lg transform overflow-hidden rounded-md bg-slate-800 p-6 text-left shadow-xl transition-all'>
                  <div>
                    <Dialog.Title
                      as='h3'
                      className='text-xl font-bold text-gray-300 pb-2 border-b-[0.5px] border-gray-400'
                    >
                      Add Contact
                    </Dialog.Title>
                  </div>

                  <div className='mt-5'>
                    <div className='mb-4 text-slate-400'>
                      <label className='text-[15px] font-bold' htmlFor='email'>
                        Email
                      </label>
                      <div className='my-1'>
                        <input
                          type='text'
                          id='email'
                          placeholder='Enter Email'
                          className='w-full p-2.5 md:px-4 bg-gray-600 rounded text-sm md:text-[15px] focus:outline-none'
                        />
                      </div>
                    </div>
                    <div className='mb-4 text-slate-400'>
                      <label
                        className='text-[15px] font-bold'
                        htmlFor='invitation-message'
                      >
                        Invitation Message
                      </label>
                      <div className='my-1'>
                        <textarea
                          id='invitation-message'
                          className='w-full bg-gray-600 text-sm p-2 px-4 focus:outline-none rounded'
                          placeholder='Enter Message'
                          rows={4}
                        />
                      </div>
                    </div>
                    <div className='my-5'>
                      <button
                        className='float-right bg-blue-300 font-semibold text-gray-800 rounded-[3px] py-1.5 px-3 text-[15px] hover:bg-blue-400'
                        onClick={closeModal}
                      >
                        Add Contact
                      </button>
                      <button
                        className='float-right text-blue-300 font-semibold rounded py-1.5 px-3 mr-3 text-[15px] hover:text-blue-400'
                        onClick={closeModal}
                      >
                        Cancel
                      </button>
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

export default ContactModal;
