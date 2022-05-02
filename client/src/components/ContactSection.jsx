import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { AddContactIcon, SearchIcon } from '../assets/icons';
import ContactsByFirstLetter from './ContactsByFirstLetter';
import Modal from './Modal';

const ContactSection = () => {
  return (
    <>
      <div className='p-6 pb-2 mb-10'>
        <div className='flex justify-between'>
          <p className='text-2xl font-bold'>Contact</p>
          <Modal>
            <Tippy content='Add Contact'>
              <img src={AddContactIcon} alt='Add Contact' className='w-7' />
            </Tippy>
          </Modal>
        </div>
        <div className='flex my-3'>
          <span className='bg-slate-600 rounded-l'>
            <img src={SearchIcon} alt='Search' className='w-12 p-1' />
          </span>
          <input
            placeholder='Search users'
            className='text-slate-300 pr-4 py-3 text-sm bg-slate-600 rounded-r w-full outline-none border-none'
          />
        </div>
      </div>

      <div className='h-[76.5vh] overflow-y-scroll scrollbar-transparent hover:scrollbar mr-1'>
        <ContactsByFirstLetter />
        <ContactsByFirstLetter />
        <ContactsByFirstLetter />
        <ContactsByFirstLetter />
        <ContactsByFirstLetter />
        <ContactsByFirstLetter />
      </div>
    </>
  );
};

export default ContactSection;
