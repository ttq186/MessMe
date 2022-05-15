import { Menu } from '@headlessui/react';

import { OtherIcon, EditIcon } from 'assets/icons';
import { Dropdown } from 'components/Dropdown';

export const ProfileDropdown = ({ triggerButton, setEditableIntro }) => {
  return (
    <Dropdown triggerButton={triggerButton}>
      <Menu.Item>
        <button
          className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'
          onClick={() => setEditableIntro(true)}
        >
          <img src={EditIcon} alt='Edit' className='w-4 h-4 mr-3' />
          Edit Intro
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className='font-semibold group flex w-full items-center rounded px-3 py-2 text-sm hover:bg-slate-500'>
          <img src={OtherIcon} alt='Action' className='w-4 h-4 mr-3' />
          Action
        </button>
      </Menu.Item>
    </Dropdown>
  );
};
