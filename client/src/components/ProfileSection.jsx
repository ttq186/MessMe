import { useState } from 'react';
import 'tippy.js/dist/tippy.css';

import { CancelIcon, OptionIcon } from 'assets/icons';
import ProfileDropdown from 'components/ProfileDropdown';
import ProfileDisclosure from 'components/ProfileDisclosure';

const ProfileSection = ({ isOpenFriendProfile, setOpenFriendProfile }) => {
  const [isEditableIntro, setEditableIntro] = useState(false);

  const handleCancelClick = () => {
    setEditableIntro(false);
  };

  const handleSubmitClick = () => {
    setEditableIntro(false);
  };

  return (
    <>
      <div className='p-6 pb-2 border-b-[1px] border-slate-600'>
        {!isOpenFriendProfile ? (
          <div className='flex justify-between'>
            <p className='text-2xl font-bold'>My Profile</p>
            <ProfileDropdown setEditableIntro={setEditableIntro}>
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

      <article className='pt-3 pb-0 px-7'>
        <h2 className='font-bold text-xl mb-3'>Intro</h2>
        {!isEditableIntro ? (
          <div className='ml-2 pl-3 border-l-4 border-slate-400'>
            <p className='text-slate-300 font-semibold text-sm'>
              "Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia
              quaerat sed optio hic aut odio animi nesciunt?"
            </p>
          </div>
        ) : (
          <div className='flex flex-col items-end text-slate-400 px-4'>
            <textarea
              placeholder='Describe something about you'
              className='text-sm py-3 px-5 w-full font-semibold rounded bg-gray-600 text-slate-200 outline-none h-28'
            />
            <div className='text-[13px] mt-3'>
              <button
                className='bg-slate-200 text-slate-700 font-semibold py-1 px-2 rounded-[3px] hover:opacity-90'
                onClick={handleCancelClick}
              >
                Cancel
              </button>
              <button
                className='bg-slate-500 text-slate-200 font-semibold py-1 px-2 rounded-[3px] ml-2 hover:opacity-90'
                onClick={handleSubmitClick}
              >
                Submit
              </button>
            </div>
          </div>
        )}
      </article>

      <ProfileDisclosure />
    </>
  );
};

export default ProfileSection;
