import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import { useQuery, useReactiveVar } from '@apollo/client';

import {
  MessMeIcon,
  ChatIcon,
  AvatarIcon,
  ContactIcon,
  ProfileIcon,
  GroupIcon,
  SettingIcon,
  NotificationIcon,
} from 'assets/icons';
import {
  CHAT_MODE,
  GROUP_MODE,
  CONTACT_MODE,
  PROFILE_MODE,
  SETTING_MODE,
  NOTIFICATION_MODE,
} from 'utils/contants/TabModeContants';
import { SideBarAccountDropdown } from './Dropdown/SideBarAccountDropdown';
import { GET_CURRENT_USER } from 'graphql/users';
import { hasNewNotificationVar } from 'cache';

export const DashboardSideBar = ({ tabMode, setTabMode }) => {
  const { data: currentUserObj } = useQuery(GET_CURRENT_USER);
  const hasNewNotification = useReactiveVar(hasNewNotificationVar);

  return (
    <div className='flex flex-col h-screen justify-between items-center w-[70px] pt-5 pb-3 bg-slate-600'>
      <Link to='/dashboard'>
        <MessMeIcon />
      </Link>
      <div className='mb-20'>
        <Tippy
          content={<b style={{ color: '#e2e8f0' }}>Notification</b>}
          allowHTML={true}
          placement='left-start'
        >
          <div
            className={`${
              tabMode === NOTIFICATION_MODE ? 'bg-slate-500' : ''
            } p-2 my-5 rounded cursor-pointer flex items-center`}
            onClick={() => {
              setTabMode(NOTIFICATION_MODE);
            }}
          >
            <NotificationIcon
              fill={tabMode === NOTIFICATION_MODE ? '#93c5fd' : '#a6b0cf'}
            />
            {hasNewNotification && (
              <span className='w-3 h-3 rounded-full bg-red-500 -ml-3'></span>
            )}
          </div>
        </Tippy>
        <Tippy
          content={<b style={{ color: '#e2e8f0' }}>Profile</b>}
          allowHTML={true}
          placement='left-start'
        >
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
        <Tippy
          content={<b style={{ color: '#e2e8f0' }}>Chat</b>}
          allowHTML={true}
          placement='left-start'
        >
          <div
            className={`${
              tabMode === CHAT_MODE ? 'bg-slate-500' : ''
            } p-2 my-5 rounded cursor-pointer`}
            onClick={() => setTabMode(CHAT_MODE)}
          >
            <ChatIcon fill={tabMode === CHAT_MODE ? '#93c5fd' : '#a6b0cf'} />
          </div>
        </Tippy>
        <Tippy
          content={<b style={{ color: '#e2e8f0' }}>Contact</b>}
          allowHTML={true}
          placement='left-start'
        >
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
        <Tippy
          content={<b style={{ color: '#e2e8f0' }}>Group</b>}
          allowHTML={true}
          placement='left-start'
        >
          <div
            className={`${
              tabMode === GROUP_MODE ? 'bg-slate-500' : ''
            } p-2 my-5 rounded cursor-pointer`}
            onClick={() => setTabMode(GROUP_MODE)}
          >
            <GroupIcon fill={tabMode === GROUP_MODE ? '#93c5fd' : '#a6b0cf'} />
          </div>
        </Tippy>
        <Tippy
          content={<b style={{ color: '#e2e8f0' }}>Setting</b>}
          allowHTML={true}
          placement='left-start'
        >
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
          !currentUserObj ? (
            <div className='animate-pulse flex justify-center items-center w-[63px] h-[63px]'>
              <div className='rounded-full bg-slate-400 h-8 w-8 opacity-75'></div>
            </div>
          ) : (
            <div className='cursor-pointer p-2 rounded hover:bg-slate-500'>
              {!currentUserObj.currentUser?.avatarUrl ? (
                <AvatarIcon width='40px' height='40px' />
              ) : (
                <img
                  src={currentUserObj.currentUser.avatarUrl}
                  alt='Avatar'
                  className='w-10 h-10 rounded-full border-2 border-gray-600'
                />
              )}
            </div>
          )
        }
      />
    </div>
  );
};
