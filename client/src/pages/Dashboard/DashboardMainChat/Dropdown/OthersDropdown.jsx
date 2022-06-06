import { Menu } from '@headlessui/react';

import { ArchiveIcon, MutedIcon, UnmuteIcon, RemoveIcon } from 'assets/icons';
import { Dropdown } from 'components/Dropdown';

export const OthersDropdown = ({ triggerButton }) => {
  return (
    <Dropdown triggerButton={triggerButton}>
      <div className='text-slate-200'>
        <Menu.Item>
          <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
            <img src={ArchiveIcon} alt='Archive' className='w-4 h-4 mr-3' />
            Archive
          </button>
        </Menu.Item>
        <Menu.Item>
          <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
            <img src={MutedIcon} alt='Muted' className='w-4 h-4 mr-3' />
            Muted
          </button>
        </Menu.Item>
        <Menu.Item>
          <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
            <img src={RemoveIcon} alt='Remove' className='w-4 h-4 mr-3' />
            Remove
          </button>
        </Menu.Item>
      </div>
    </Dropdown>
  );
};
