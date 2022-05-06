import { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';

const SearchDropdown = (props) => {
  return (
    <Menu as='div' className='h-9 relative inline-block text-left outline-none'>
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
        <Menu.Items className='absolute right-0 top-9 p-2.5 w-56 z-10 rounded bg-slate-700 outline-none shadow-lg'>
          <div className='text-gray-200'>
            <Menu.Item
              onKeyDown={(e) => {
                if (e.code === 'Space') {
                e.stopPropagation()
                }
              }}
              disabled={true}
            >
              <input
                className='w-full bg-slate-600 rounded-[3px] text-[13px] py-2 px-3 outline-none'
                placeholder='Search...'
              />
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default SearchDropdown;
