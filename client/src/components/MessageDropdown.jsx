import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { RemoveIcon, ForwardIcon } from '../assets/icons';

const MessageDropdown = (props) => {
  return (
    <div>
      <Menu as='div' className='relative inline-block text-left -mt-1'>
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
          <Menu.Items className='absolute -right-16 top-8 p-3 w-40 z-10 rounded bg-slate-600 shadow-lg border-2 border-slate-500'>
            <div className='text-gray-200'>
              <Menu.Item>
                <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
                  <img src={ForwardIcon} alt='Forward' className='w-4 h-4 mr-3' />
                  Forward
                </button>
              </Menu.Item>
              <Menu.Item>
                <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
                  <img src={RemoveIcon} alt='Remove' className='w-4 h-4 mr-3' />
                  Delete
                </button>
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  );
};

export default MessageDropdown;
