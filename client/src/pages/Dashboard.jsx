import { useState } from 'react';
import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import ChatSection from '../components/ChatSection';
import {
  MessMeIcon,
  ChatIcon,
  AvatarIcon,
  ContactIcon,
  ProfileIcon,
  GroupIcon,
  SettingIcon,
} from '../assets/icons';
import UsersChatSection from '../components/UsersChatSection';
import ContactSection from '../components/ContactSection';
import GroupSection from '../components/GroupSection';
import ProfileSection from '../components/ProfileSection';
import SettingSection from '../components/SettingSection';
import AccountDropdown from '../components/AccountDropdown';

const PROFILE_MODE = 'PROFILE_MODE';
const CHAT_MODE = 'CHAT_MODE';
const GROUP_MODE = 'GROUP_MODE';
const CONTACT_MODE = 'CONTACT_MODE';
const SETTING_MODE = 'SETTING_MODE';

const getComponentByTabMode = (tabMode) => {
  switch (tabMode) {
    case PROFILE_MODE:
      return <ProfileSection />;
    case GROUP_MODE:
      return <GroupSection />;
    case CONTACT_MODE:
      return <ContactSection />;
    case SETTING_MODE:
      return <SettingSection />;
    default:
      return <UsersChatSection />;
  }
};

const Dashboard = () => {
  const [isOpenFriendProfile, setOpenFriendProfile] = useState(false);
  const [tabMode, setTabMode] = useState(CHAT_MODE);
  const changeTabMode = (tabMode) => {
    setTabMode(tabMode);
  };

  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col justify-between items-center w-[70px] pt-5 pb-2 bg-slate-600'>
        <Link to='/'>
          <MessMeIcon />
        </Link>
        <div className='mb-20'>
          <Tippy content='Profile'>
            <div
              className={`${
                tabMode === PROFILE_MODE ? 'bg-slate-500' : ''
              } p-2 my-5 rounded cursor-pointer`}
              onClick={() => changeTabMode(PROFILE_MODE)}
            >
              <ProfileIcon
                fill={tabMode === PROFILE_MODE ? '#93c5fd' : '#a6b0cf'}
              />
            </div>
          </Tippy>
          <Tippy content='Chat'>
            <div
              className={`${
                tabMode === CHAT_MODE ? 'bg-slate-500' : ''
              } p-2 my-5 rounded cursor-pointer`}
              onClick={() => changeTabMode(CHAT_MODE)}
            >
              <ChatIcon fill={tabMode === CHAT_MODE ? '#93c5fd' : '#a6b0cf'} />
            </div>
          </Tippy>
          <Tippy content='Group'>
            <div
              className={`${
                tabMode === GROUP_MODE ? 'bg-slate-500' : ''
              } p-2 my-5 rounded cursor-pointer`}
              onClick={() => changeTabMode(GROUP_MODE)}
            >
              <GroupIcon
                fill={tabMode === GROUP_MODE ? '#93c5fd' : '#a6b0cf'}
              />
            </div>
          </Tippy>
          <Tippy content='Contact'>
            <div
              className={`${
                tabMode === CONTACT_MODE ? 'bg-slate-500' : ''
              } p-2 my-5 rounded cursor-pointer`}
              onClick={() => changeTabMode(CONTACT_MODE)}
            >
              <ContactIcon
                fill={tabMode === CONTACT_MODE ? '#93c5fd' : '#a6b0cf'}
              />
            </div>
          </Tippy>
          <Tippy content='Setting'>
            <div
              className={`${
                tabMode === SETTING_MODE ? 'bg-slate-500' : ''
              } p-2 my-5 rounded cursor-pointer`}
              onClick={() => changeTabMode(SETTING_MODE)}
            >
              <SettingIcon
                fill={tabMode === SETTING_MODE ? '#93c5fd' : '#a6b0cf'}
              />
            </div>
          </Tippy>
        </div>
        <AccountDropdown>
          <div className='cursor-pointer p-2 rounded hover:bg-slate-500'>
            <AvatarIcon />
          </div>
        </AccountDropdown>
      </div>

      <div className='w-[390px] bg-gray-700 text-slate-200 border-l-2 border-slate-500'>
        {getComponentByTabMode(tabMode)}
      </div>

      <div className='flex flex-col justify-between grow bg-slate-600'>
        <ChatSection setOpenFriendProfile={setOpenFriendProfile} />
      </div>

      {isOpenFriendProfile && (
        <div className='w-[380px] bg-gray-700 text-slate-200 border-l-2 border-slate-500'>
          <ProfileSection
            isOpenFriendProfile={isOpenFriendProfile}
            setOpenFriendProfile={setOpenFriendProfile}
          />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
