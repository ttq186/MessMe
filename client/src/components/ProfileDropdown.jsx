import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ActionIcon, EditIcon } from '../assets/icons';

const ProfileDropdown = (props) => {
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
          <Menu.Items className='absolute right-8 top-2 p-3 w-40 z-10 rounded bg-slate-600 shadow-lg'>
            <div className='text-gray-300'>
              <Menu.Item>
                <button className='font-semibold group flex w-full items-center rounded px-2 py-2 text-sm hover:bg-slate-500'>
                  <img
                    src={EditIcon}
                    alt='Edit'
                    className='w-4 h-4 mr-3'
                  />
                  Edit
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className='font-semibold group flex w-full items-center rounded px-2 py-2 text-sm hover:bg-slate-500'>
                  <img src={ActionIcon} alt='Action' className='w-4 h-4 mr-3' />
                  Action
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default ProfileDropdown;
