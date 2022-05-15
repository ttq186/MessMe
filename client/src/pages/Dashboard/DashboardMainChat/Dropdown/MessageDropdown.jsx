import { Menu } from '@headlessui/react';

import { RemoveIcon, ForwardIcon } from 'assets/icons';
import { Dropdown } from 'components/Dropdown';

export const MessageDropdown = ({ triggerButton }) => {
  return (
    <Dropdown triggerButton={triggerButton}>
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
    </Dropdown>
  );
};
