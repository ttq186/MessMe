import { useNavigate } from 'react-router-dom';
import { Menu } from '@headlessui/react';

import { ProfileIcon, LogoutIcon } from 'assets/icons';
import { Dropdown } from 'components/Dropdown';
import { useApolloClient, useQuery } from '@apollo/client';

export const SideBarAccountDropdown = ({ triggerButton, setTabMode }) => {
  const navigate = useNavigate();
  const client = useApolloClient();

  const handleLogout = () => {
    navigate('/');
    client.resetStore();
    document.cookie = 'logout=1;';
  };

  return (
    <Dropdown
      triggerButton={triggerButton}
      bottom='bottom-16'
      left='left-0'
      top='0'
    >
      <Menu.Item>
        <button
          className='font-semibold group flex w-full items-center rounded px-2 py-2 text-slate-200 text-sm hover:bg-slate-500'
          onClick={() => setTabMode('PROFILE_MODE')}
        >
          <ProfileIcon width='23px' height='23px' />
          <p className='ml-1.5'>My Profile</p>
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className='font-semibold group flex w-full items-center rounded px-2 py-2 text-slate-200 text-sm hover:bg-slate-500'
          onClick={handleLogout}
        >
          <img src={LogoutIcon} alt='Logout' className='w-6 h-6 mr-1.5' />
          Logout
        </button>
      </Menu.Item>
    </Dropdown>
  );
};
