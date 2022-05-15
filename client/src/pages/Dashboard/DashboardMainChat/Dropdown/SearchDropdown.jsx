import { Menu } from '@headlessui/react';

import { Dropdown } from 'components/Dropdown';

export const SearchDropdown = ({ triggerButton }) => {
  return (
    <Dropdown triggerButton={triggerButton}>
      <Menu.Item disabled={true}>
        <input
          className='w-full bg-slate-600 rounded-[3px] text-[13px] py-2 px-3 outline-none'
          placeholder='Search...'
        />
      </Menu.Item>
    </Dropdown>
  );
};
