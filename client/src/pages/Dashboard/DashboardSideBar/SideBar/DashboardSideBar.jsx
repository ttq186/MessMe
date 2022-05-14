import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import {
  MessMeIcon,
  ChatIcon,
  AvatarIcon,
  ContactIcon,
  ProfileIcon,
  GroupIcon,
  SettingIcon,
} from 'assets/icons';
import {
  CHAT_MODE,
  CONTACT_MODE,
  GROUP_MODE,
  PROFILE_MODE,
  SETTING_MODE,
} from 'utils/contants/TabModeContants';
import { SideBarAccountDropdown } from '../SideBarAccountDropdown/SideBarAccountDropdown';

export const DashboardSideBar = ({ tabMode, setTabMode }) => {
  return (
    <div className='flex flex-col h-screen justify-between items-center w-[70px] pt-5 pb-2 bg-slate-600'>
      <Link to='/'>
        <MessMeIcon />
      </Link>
      <div className='mb-20'>
        <Tippy content='Profile'>
          <div
            className={`${
              tabMode === PROFILE_MODE ? 'bg-slate-500' : ''
            } p-2 my-5 rounded cursor-pointer`}
            onClick={() => setTabMode(PROFILE_MODE)}
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
            onClick={() => setTabMode(CHAT_MODE)}
          >
            <ChatIcon fill={tabMode === CHAT_MODE ? '#93c5fd' : '#a6b0cf'} />
          </div>
        </Tippy>
        <Tippy content='Group'>
          <div
            className={`${
              tabMode === GROUP_MODE ? 'bg-slate-500' : ''
            } p-2 my-5 rounded cursor-pointer`}
            onClick={() => setTabMode(GROUP_MODE)}
          >
            <GroupIcon fill={tabMode === GROUP_MODE ? '#93c5fd' : '#a6b0cf'} />
          </div>
        </Tippy>
        <Tippy content='Contact'>
          <div
            className={`${
              tabMode === CONTACT_MODE ? 'bg-slate-500' : ''
            } p-2 my-5 rounded cursor-pointer`}
            onClick={() => setTabMode(CONTACT_MODE)}
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
            onClick={() => setTabMode(SETTING_MODE)}
          >
            <SettingIcon
              fill={tabMode === SETTING_MODE ? '#93c5fd' : '#a6b0cf'}
            />
          </div>
        </Tippy>
      </div>
      <SideBarAccountDropdown
        setTabMode={setTabMode}
        triggerButton={
          <div className='cursor-pointer p-2 rounded hover:bg-slate-500'>
            <AvatarIcon />
          </div>
        }
      />
    </div>
  );
};
