import { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Transition } from '@headlessui/react';
import { ProfileIcon, LogoutIcon } from '../assets/icons';

const AccountDropdown = (props) => {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    navigate('/');
  };

  return (
    <div>
      <Menu as='div' className='relative inline-block text-left'>
        <Menu.Button>{props.children}</Menu.Button>
        <Transition
          as={Fragment}
          enter='transition ease-out duration-100'
          enterFrom='transform opacity-0 scale-95'
          enterTo='transform opacity-100 scale-100'
          leave='transition ease-in duration-75'
          leaveFrom='transform opacity-100 scale-100'
          leaveTo='transform opacity-0 scale-95'
        >
          <Menu.Items className='absolute left-0 bottom-[66px] p-3 w-40 z-10 rounded border-2 border-slate-500 bg-slate-600 shadow-lg'>
            <div className='text-gray-200'>
              <Menu.Item>
                <button
                  className='font-semibold group flex w-full items-center rounded px-2 py-2 text-sm hover:bg-slate-500'
                  onClick={() => props.setTabMode('PROFILE_MODE')}
                >
                  <ProfileIcon width='23px' height='23px' />
                  <p className='ml-1.5'>My Profile</p>
                </button>
              </Menu.Item>
              <Menu.Item>
                <button
                  className='font-semibold group flex w-full items-center rounded px-2 py-2 text-sm hover:bg-slate-500'
                  onClick={handleLogoutClick}
                >
                  <img
                    src={LogoutIcon}
                    alt='Logout'
                    className='w-6 h-6 mr-1.5'
                  />
                  Logout
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default AccountDropdown;
