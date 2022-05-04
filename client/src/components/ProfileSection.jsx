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
        <div className='flex flex-col items-center mt-10 mb-4'>
          <img
            src='https://avatars.githubusercontent.com/u/73225256'
            alt='Avatar'
            className='w-24 h-24 rounded-full'
          />
          <p className='font-semibold mt-4'>Thanh Quang</p>
        </div>
      </div>

      {/* <div className='px-7 py-4 pb-2 text-[15px] text-slate-300 font-semibold'>
        <p>
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Obcaecati
          sapiente repellendus necessitatibus quia eos quidem ea soluta
          perspiciatis voluptate dicta?
        </p>
      </div> */}
      <ProfileDisclosure />
    </>
  );
};

export default ProfileSection;
