import 'tippy.js/dist/tippy.css';

import { OptionIcon } from '../assets/icons';
import ProfileDropdown from './ProfileDropdown';
import ProfileDisclosure from './ProfileDisclosure';

const ProfileSection = () => {
  return (
    <>
      <div className='p-6 pb-2 border-b-[1px] border-slate-600'>
        <div className='flex justify-between'>
          <p className='text-2xl font-bold'>My Profile</p>
          <ProfileDropdown>
            <img
              src={OptionIcon}
              alt='Option'
              className='w-7 h-7 cursor-pointer'
            />
          </ProfileDropdown>
        </div>
        <div className='flex flex-col items-center mt-9 mb-3'>
          <img
            src='https://avatars.githubusercontent.com/u/73225256'
            alt='Avatar'
            className='w-28 h-28 rounded-full border-4 border-slate-600'
          />
          <p className='font-semibold mt-4'>Thanh Quang</p>
        </div>
      </div>

      <ProfileDisclosure />
    </>
  );
};

export default ProfileSection;
