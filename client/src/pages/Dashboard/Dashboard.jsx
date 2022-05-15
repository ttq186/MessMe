import { useState } from 'react';

import {
  DashboardGroup,
  DashboardSideBar,
  DashboardContact,
  DashboardSetting,
  DashboardProfile,
  DashboardMainChat,
  DashboardUsersChat,
} from 'pages/Dashboard';
import {
  CHAT_MODE,
  CONTACT_MODE,
  GROUP_MODE,
  PROFILE_MODE,
  SETTING_MODE,
} from 'utils/contants/TabModeContants';

const getComponentByTabMode = (tabMode) => {
  switch (tabMode) {
    case PROFILE_MODE:
      return <DashboardProfile />;
    case GROUP_MODE:
      return <DashboardGroup />;
    case CONTACT_MODE:
      return <DashboardContact />;
    case SETTING_MODE:
      return <DashboardSetting />;
    default:
      return <DashboardUsersChat />;
  }
};

export const Dashboard = () => {
  const [isOpenFriendProfile, setOpenFriendProfile] = useState(false);
  const [tabMode, setTabMode] = useState(CHAT_MODE);

  return (
    <div className='flex'>
      <DashboardSideBar tabMode={tabMode} setTabMode={setTabMode} />

      <div className='flex flex-col w-[390px] h-screen bg-gray-700 text-slate-200'>
        {getComponentByTabMode(tabMode)}
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
