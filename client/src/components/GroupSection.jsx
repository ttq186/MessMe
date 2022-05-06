import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { AddIcon, SearchIcon } from '../assets/icons';
import GroupItem from './GroupItem';
import GroupModal from './GroupModal';

const GroupSection = () => {
  return (
    <>
      <div className='p-6 pb-2 mb-10'>
        <div className='flex justify-between'>
          <p className='text-2xl font-bold'>Groups</p>
          <GroupModal>
            <Tippy content='Create Group'>
              <img src={AddIcon} alt='Create Group' className='w-7' />
            </Tippy>
          </GroupModal>
        </div>
        <div className='flex my-3'>
          <span className='bg-slate-600 rounded-l'>
            <img src={SearchIcon} alt='Search' className='w-12 p-1' />
          </span>
          <input
            placeholder='Search Groups'
            className='text-slate-300 pr-4 py-3 text-sm font-medium bg-slate-600 rounded-r w-full outline-none'
          />
        </div>
      </div>


      <div className='h-[76.5vh] overflow-y-scroll scrollbar-transparent hover:scrollbar mr-1 pl-6 pr-3.5'>
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
        <GroupItem />
      </div>
    </>
  );
};

export default GroupSection;
