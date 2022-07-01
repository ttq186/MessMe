import { useState } from 'react';
import { useQuery } from '@apollo/client';

import {
  DashboardGroup,
  DashboardSideBar,
  DashboardContact,
  DashboardSetting,
  DashboardProfile,
  DashboardMainChat,
  DashboardUsersChat,
  DashboardNotification,
} from 'pages/Dashboard';
import { CHAT_MODE } from 'utils/contants/TabModeContants';
import { GET_CURRENT_USER } from 'queries/userQueries';

export const Dashboard = () => {
  const [isOpenFriendProfile, setOpenFriendProfile] = useState(false);
  const [tabMode, setTabMode] = useState(CHAT_MODE);
  useQuery(GET_CURRENT_USER);

  const componentByTabMode = {
    CHAT_MODE: <DashboardUsersChat />,
    GROUP_MODE: <DashboardGroup />,
    PROFILE_MODE: <DashboardProfile />,
    CONTACT_MODE: <DashboardContact />,
    SETTING_MODE: <DashboardSetting />,
    NOTIFICATION_MODE: <DashboardNotification />,
  };

  return (
    <div className='flex'>
      <DashboardSideBar tabMode={tabMode} setTabMode={setTabMode} />

      <div className='flex flex-col w-[390px] h-screen bg-gray-700 text-slate-200'>
        {componentByTabMode[tabMode]}
      </div>

      <DashboardMainChat setOpenFriendProfile={setOpenFriendProfile} />

      {isOpenFriendProfile && (
        <div className='flex flex-col w-[380px] h-screen bg-gray-700 text-slate-200 border-l-2 border-slate-500'>
          <DashboardProfile
            isOpenFriendProfile={isOpenFriendProfile}
            setOpenFriendProfile={setOpenFriendProfile}
          />
        </div>
      )}
    </div>
  );
};
