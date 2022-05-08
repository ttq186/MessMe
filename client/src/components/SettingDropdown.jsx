import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

import { ActionIcon, EditIcon } from '../assets/icons';

const SettingDropdown = (props) => {
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
          <Menu.Items className='absolute right-0 top-8 p-3 w-36 z-10 rounded bg-slate-600 shadow-lg border-2 border-slate-500'>
            <div className='text-gray-200 text-[13px]'>
              <Menu.Item>
                <button className='font-semibold flex w-full items-center rounded-[3px] px-4 py-2 hover:bg-slate-500'>
                  Everyone
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className='font-semibold flex w-full items-center rounded-[3px] px-4 py-2 hover:bg-slate-500'>
                  Selected
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className='font-semibold flex w-full items-center rounded-[3px] px-4 py-2 hover:bg-slate-500'>
                  No One
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default SettingDropdown;
