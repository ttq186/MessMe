import { Disclosure } from '@headlessui/react';

import {
  ArrowDownIcon,
  ArrowForwardIcon,
  AttachIcon,
  HelpIcon,
  PrivacyIcon,
  ProfileIcon,
  EditIcon,
} from '../assets/icons';
import SettingDropdown from './SettingDropdown';

const SettingDisclosure = () => {
  return (
    <div className='h-[65vh] overflow-y-scroll p-5 pr-2 pt-0 mt-5 mr-1.5 scrollbar-transparent hover:scrollbar'>
      <div className='rounded bg-slate-00 p-2 font-semibold'>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between items-center rounded bg-slate-600 px-4 py-3 mb-2 text-left text-sm font-semibold text-slate-200'>
                <div className='flex items-center'>
                  <ProfileIcon fill='#a6b0cf' width='23px' height='23px' />
                  <span className='mx-1'>Personal Info</span>
                </div>
                <img
                  src={open ? ArrowDownIcon : ArrowForwardIcon}
                  alt='Arrow Forward'
                  className='w-5 h-5'
                />
              </Disclosure.Button>
              <Disclosure.Panel className='bg-slate-500 rounded px-5 py-4 mb-2 text-sm text-slate-200'>
                <div className='inline-flex bg-slate-600 py-1.5 px-3 rounded float-right cursor-pointer hover:bg-slate-700'>
                  <img src={EditIcon} alt='Edit' className='w-5 h-5 mr-1' />
                  Edit
                </div>
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
              <Disclosure.Button className='flex w-full justify-between items-center rounded bg-slate-600 px-4 py-3 mb-2 text-left text-sm font-semibold text-slate-200'>
                <div className='flex items-center'>
                  <PrivacyIcon fill='#a6b0cf' width='23px' height='23px' />
                  <span className='mx-1'>Privacy & Scope</span>
                </div>
                <img
                  src={open ? ArrowDownIcon : ArrowForwardIcon}
                  alt='Arrow Forward'
                  className='w-5 h-5'
                />
              </Disclosure.Button>
              <Disclosure.Panel className='bg-slate-500 rounded px-5 py-3 mb-2 text-sm text-slate-200'>
                <div className='flex justify-between items-center py-3 border-b border-slate-400'>
                  <h2 className='font-bold'>Profile Photo</h2>
                  <SettingDropdown>
                    <div className='flex items-center bg-slate-600 px-3 py-[5px] text-[13px] rounded-[3px] font-semibold hover:bg-slate-700'>
                      Everyone
                      <img src={ArrowDownIcon} className='w-3.5 h-3.5 ml-1' />
                    </div>
                  </SettingDropdown>
                </div>
                <div className='flex justify-between items-center py-3 border-b border-slate-400'>
                  <h2 className='font-bold'>Status</h2>
                  <SettingDropdown>
                    <div className='flex items-center bg-slate-600 px-3 py-[5px] text-[13px] rounded-[3px] font-semibold hover:bg-slate-700'>
                      Everyone
                      <img src={ArrowDownIcon} className='w-3.5 h-3.5 ml-1' />
                    </div>
                  </SettingDropdown>
                </div>
                <div className='flex justify-between items-center py-3'>
                  <h2 className='font-bold'>Group</h2>
                  <SettingDropdown>
                    <div className='flex items-center bg-slate-600 px-3 py-[5px] text-[13px] rounded-[3px] font-semibold hover:bg-slate-700'>
                      Everyone
                      <img src={ArrowDownIcon} className='w-3.5 h-3.5 ml-1' />
                    </div>
                  </SettingDropdown>
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className='flex w-full justify-between items-center rounded bg-slate-600 px-4 py-3 mb-2 text-left text-sm font-semibold text-slate-200'>
                <div className='flex items-center'>
                  <HelpIcon fill='#a6b0cf' width='23px' height='23px' />
                  <span className='mx-1'>Help</span>
                </div>
                <img
                  src={open ? ArrowDownIcon : ArrowForwardIcon}
                  alt='Arrow Forward'
                  className='w-5 h-5'
                />
              </Disclosure.Button>
              <Disclosure.Panel className='bg-slate-500 rounded px-5 py-3 text-[13px] text-slate-300'>
                <div className='mb-3 py-2 border-b border-slate-400 cursor-pointer'>
                  FAQs
                </div>
                <div className='mb-3 py-2 border-b border-slate-400 cursor-pointer'>
                  Contact
                </div>
                <div className='mb-3 pt-2 cursor-pointer'>
                  Terms & Privacy policy
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
      </div>
    </div>
  );
};

export default SettingDisclosure;
