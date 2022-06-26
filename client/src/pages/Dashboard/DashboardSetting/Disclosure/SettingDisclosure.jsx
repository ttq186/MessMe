import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';

import {
  ArrowDownIcon,
  HelpIcon,
  PrivacyIcon,
  ProfileIcon,
  EditIcon,
} from 'assets/icons';
import { Disclosure } from 'components/Disclosure';
import { SettingDropdown } from 'pages/Dashboard/DashboardSetting';
import { GET_CURRENT_USER } from 'queries/userQueries';
import { UPDATE_USER } from 'mutations/userMutations';

export const SettingDisclosure = () => {
  const [isEditableInfo, setEditableInfo] = useState(false);
  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);
  const [updateCurrentUser] = useMutation(UPDATE_USER);
  const [name, setName] = useState(currentUser.username);
  const [phoneNumber, setPhoneNumber] = useState(currentUser.phoneNumber);

  const handleEditClick = () => {
    setEditableInfo(true);
  };

  const handleCancelClick = () => {
    setEditableInfo(false);
  };

  const handleSubmitClick = () => {
    setEditableInfo(false);
    updateCurrentUser({
      variables: {
        input: {
          id: currentUser.id,
          username: name,
          phoneNumber,
        },
      },
    });
  };

  return (
    <>
      <Disclosure
        title='Personal Info'
        icon={<ProfileIcon width='23px' height='23px' />}
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

        <div className='mb-3 px-1'>
          <h2 className='text-gray-700 font-bold text-[15px]'>Name</h2>
          {!isEditableInfo ? (
            <p className='ml-2'>{name || 'N/A'}</p>
          ) : (
            <input
              className='w-full p-1 px-3 mt-1 font-semibold rounded-[3px] bg-slate-600 outline-none'
              defaultValue={name || ''}
              onChange={(e) => setName(e.target.value)}
            />
          )}
        </div>
        <div className='mb-3 px-1'>
          <h2 className='text-gray-700 font-bold text-[15px]'>Email</h2>
          {!isEditableInfo ? (
            <p className='ml-2'>{currentUser.email}</p>
          ) : (
            <input
              className='w-full p-1 px-3 mt-1 font-semibold rounded-[3px] bg-slate-600 outline-none opacity-60 cursor-auto'
              defaultValue='tt.quang.186@gmail.com'
              readOnly
            />
          )}
        </div>
        <div className='mb-3 px-1'>
          <h2 className='text-gray-700 font-bold text-[15px]'>Phone Number</h2>
          {!isEditableInfo ? (
            <p className='ml-2'>{phoneNumber || 'N/A'}</p>
          ) : (
            <input
              className='w-full p-1 px-3 mt-1 font-semibold rounded-[3px] bg-slate-600 outline-none'
              defaultValue={phoneNumber || ''}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
          )}
        </div>
        <div className='px-1 mb-1'>
          <h2 className='text-gray-700 font-bold text-[15px]'>Location</h2>
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
          <div className='flex justify-end text-[13px] mt-3 mb-1'>
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
      </Disclosure>

      <Disclosure
        title='Privacy & Scope'
        icon={<PrivacyIcon widht='23px' height='23px' />}
      >
        <div className='flex justify-between items-center py-3 mx-1 border-b border-slate-400'>
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
        <div className='flex justify-between items-center py-3 mx-1 border-b border-slate-400'>
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
        <div className='flex justify-between items-center py-3 mx-1'>
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
      </Disclosure>

      <Disclosure title='Help' icon={<HelpIcon width='23px' height='23px' />}>
        <div className='px-1'>
          <div className='mb-3 py-2 border-b border-slate-400 cursor-pointer'>
            FAQs
          </div>
          <div className='mb-3 py-2 border-b border-slate-400 cursor-pointer'>
            Contact
          </div>
          <div className='mb-3 pt-2 cursor-pointer'>Terms & Privacy policy</div>
        </div>
      </Disclosure>
    </>
  );
};
