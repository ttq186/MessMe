import 'tippy.js/dist/tippy.css';

import { CancelIcon, OptionIcon } from '../assets/icons';
import ProfileDropdown from './ProfileDropdown';
import ProfileDisclosure from './ProfileDisclosure';

const ProfileSection = ({ isOpenFriendProfile, setOpenFriendProfile }) => {
  return (
    <>
      <div className='p-6 pb-2 border-b-[1px] border-slate-600'>
        {!isOpenFriendProfile ? (
          <div className='flex justify-between'>
            <p className='text-2xl font-bold'>My Profile</p>
            <ProfileDropdown>
              <OptionIcon width='32px' />
            </ProfileDropdown>
          </div>
        ) : (
          <div
            className='flex justify-end cursor-pointer my-3'
            onClick={() => setOpenFriendProfile(false)}
          >
            <CancelIcon width='22px' height='22px' />
          </div>
        )}
        <div className='flex flex-col items-center mt-6 mb-3'>
          <img
            src='https://avatars.githubusercontent.com/u/73225256'
            alt='Avatar'
            className='w-28 h-28 rounded-full border-4 border-slate-600'
          />
          <p className='font-semibold mt-4'>Thanh Quang</p>
        </div>
      </div>

      <article className='pt-3 pb-0 px-7 prose'>
        <h2 className='font-bold text-xl text-slate-300 mb-3'>Intro</h2>
        <blockquote className='ml-2 pl-3'>
          <p className='text-slate-400 font-semibold text-sm my-0'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
            quaerat sed optio hic aut odio animi nesciunt?
          </p>
        </blockquote>
      </article>

      <ProfileDisclosure />
    </>
  );
};

export default ProfileSection;
