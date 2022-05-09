import { useState } from 'react';
import { Disclosure } from '@headlessui/react';

import {
  ArrowDownIcon,
  ArrowForwardIcon,
  HelpIcon,
  PrivacyIcon,
  ProfileIcon,
  EditIcon,
} from '../assets/icons';
import SettingDropdown from './SettingDropdown';

const SettingDisclosure = () => {
  const [isEditableInfo, setEditableInfo] = useState(false);

  const handleEditClick = () => {
    setEditableInfo(true);
  };

  const handleCancelClick = () => {
    setEditableInfo(false);
  };

  const handleSubmitClick = () => {
    setEditableInfo(false);
  };

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
              <Disclosure.Panel
                className={`${
                  !isEditableInfo ? 'py-4' : 'pt-4'
                } bg-slate-500 rounded px-5 mb-2 text-sm text-slate-200`}
              >
                {!isEditableInfo && (
                  <div
                    className='inline-flex bg-slate-600 py-1.5 px-3 rounded float-right cursor-pointer hover:bg-slate-700'
                    onClick={handleEditClick}
                  >
                    <img src={EditIcon} alt='Edit' className='w-5 h-5 mr-1' />
                    Edit
                  </div>
                )}

                <div className='mb-3'>
                  <h2 className='text-gray-700 font-bold'>Name</h2>
                  {!isEditableInfo ? (
                    <p className='ml-2'>Thanh Quang</p>
                  ) : (
                    <input
                      className='w-full p-1 px-3 mt-1 font-semibold rounded-[3px] bg-slate-600 outline-none'
                      defaultValue='Thanh Quang'
                    />
                  )}
                </div>
                <div className='mb-3'>
                  <h2 className='text-gray-700 font-bold'>Email</h2>
                  {!isEditableInfo ? (
                    <p className='ml-2'>tt.quang.186@gmail.com</p>
                  ) : (
                    <input
                      className='w-full p-1 px-3 mt-1 font-semibold rounded-[3px] bg-slate-600 outline-none'
                      defaultValue='tt.quang.186@gmail.com'
                    />
                  )}
                </div>
                <div className='mb-3'>
                  <h2 className='text-gray-700 font-bold'>Phone Number</h2>
                  {!isEditableInfo ? (
                    <p className='ml-2'>082-253-7505</p>
                  ) : (
                    <input
                      className='w-full p-1 px-3 mt-1 font-semibold rounded-[3px] bg-slate-600 outline-none'
                      defaultValue='082-253-7505'
                    />
                  )}
                </div>
                <div>
                  <h2 className='text-gray-700 font-bold'>Location</h2>
                  {!isEditableInfo ? (
                    <p className='ml-2'>TP.Pleiku, VietNam</p>
                  ) : (
                    <input
                      className='w-full p-1 px-3 mt-1 font-semibold rounded-[3px] bg-slate-600 outline-none'
                      defaultValue='TP.Pleiku, VietNam'
                    />
                  )}
                </div>
                {isEditableInfo && (
                  <div className='flex justify-end text-[13px] my-3 pb-3'>
                    <button
                      className='bg-slate-200 text-slate-700 font-semibold py-[5px] px-2.5 rounded-[3px] hover:opacity-90'
                      onClick={handleCancelClick}
                    >
                      Cancel
                    </button>
                    <button
                      className='bg-slate-600 text-slate-200 font-semibold py-[5px] px-2.5 rounded-[3px] ml-2 hover:bg-slate-700'
                      onClick={handleSubmitClick}
                    >
                      Submit
                    </button>
                  </div>
                )}
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
                      <img
                        src={ArrowDownIcon}
                        alt='Arrow Down'
                        className='w-3.5 h-3.5 ml-1'
                      />
                    </div>
                  </SettingDropdown>
                </div>
                <div className='flex justify-between items-center py-3 border-b border-slate-400'>
                  <h2 className='font-bold'>Status</h2>
                  <SettingDropdown>
                    <div className='flex items-center bg-slate-600 px-3 py-[5px] text-[13px] rounded-[3px] font-semibold hover:bg-slate-700'>
                      Everyone
                      <img
                        src={ArrowDownIcon}
                        alt='Arrow Down'
                        className='w-3.5 h-3.5 ml-1'
                      />
                    </div>
                  </SettingDropdown>
                </div>
                <div className='flex justify-between items-center py-3'>
                  <h2 className='font-bold'>Group</h2>
                  <SettingDropdown>
                    <div className='flex items-center bg-slate-600 px-3 py-[5px] text-[13px] rounded-[3px] font-semibold hover:bg-slate-700'>
                      Everyone
                      <img
                        src={ArrowDownIcon}
                        alt='Arrow Down'
                        className='w-3.5 h-3.5 ml-1'
                      />
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
              <Disclosure.Panel className='bg-slate-500 rounded px-5 py-3 text-[13px] text-slate-200'>
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
