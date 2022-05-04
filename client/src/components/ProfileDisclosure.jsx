import { Disclosure } from '@headlessui/react';

import {
  ArrowDownIcon,
  ArrowForwardIcon,
  AttachIcon,
  ProfileIcon,
} from '../assets/icons';
import AttachFile from './AttachFile';

const ProfileDisclosure = () => {
  return (
    <div className='h-[65vh] overflow-y-scroll p-5 pr-2 pt-0 mt-5 mr-1.5 scrollbar-transparent hover:scrollbar'>
      <div className='rounded bg-slate-00 p-2 font-semibold'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between items-center rounded bg-slate-600 px-4 py-3 mb-2 text-left text-sm font-semibold text-slate-200'>
                <div className='flex items-center'>
                  <ProfileIcon width='23px' height='23px' />
                  <span className='mx-1'>About</span>
                </div>
                <img
                  src={open ? ArrowDownIcon : ArrowForwardIcon}
                  alt='Arrow Forward'
                  className='w-5 h-5'
                />
              </Disclosure.Button>
              <Disclosure.Panel className='bg-slate-500 rounded px-5 py-3 text-sm text-slate-200'>
                <div className='mb-3'>
                  <h2 className='text-gray-700 font-bold'>Name</h2>
                  <p>Thanh Quang</p>
                </div>
                <div className='mb-3'>
                  <h2 className='text-gray-700 font-bold'>Email</h2>
                  <p>tt.quang.186@gmail.com</p>
                </div>
                <div className='mb-3'>
                  <h2 className='text-gray-700 font-bold'>Time</h2>
                  <p>4AM</p>
                </div>
                <div>
                  <h2 className='text-gray-700 font-bold'>Location</h2>
                  <p>TP.Pleiku, VietNam</p>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between items-center rounded bg-slate-600 px-4 py-3 my-2 text-left text-sm font-semibold text-slate-200'>
                <div className='flex items-center'>
                  <AttachIcon fill='#a6b0cf' width='23px' height='23px' />
                  <span className='mx-1'>Attached Files</span>
                </div>
                <img
                  src={open ? ArrowDownIcon : ArrowForwardIcon}
                  alt='Arrow Forward'
                  className='w-5 h-5'
                />
              </Disclosure.Button>
              <Disclosure.Panel className='bg-slate-500 rounded px-3 pt-3 pb-1 text-sm text-gray-300'>
                <AttachFile />
                <AttachFile />
                <AttachFile />
                <AttachFile />
                <AttachFile />
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default ProfileDisclosure;
