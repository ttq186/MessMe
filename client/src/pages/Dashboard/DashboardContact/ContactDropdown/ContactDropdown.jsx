import { Menu } from '@headlessui/react';

import { ShareIcon, BlockIcon, RemoveIcon } from 'assets/icons';
import { Dropdown } from 'components/Dropdown';

export const ContactDropdown = ({ triggerButton }) => {
  return (
    <Dropdown triggerButton={triggerButton}>
      <Menu.Item>
        <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
          <img src={ShareIcon} alt='Share' className='w-4 h-4 mr-3' />
          Share
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
          <img src={BlockIcon} alt='Block' className='w-4 h-4 mr-3' />
          Block
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
          <img src={RemoveIcon} alt='Remove' className='w-4 h-4 mr-3' />
          Remove
        </button>
      </Menu.Item>
    </Dropdown>
  );
};
