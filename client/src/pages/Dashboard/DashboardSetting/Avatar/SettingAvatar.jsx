import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { PencilIcon } from 'assets/icons';

export const SettingAvatar = ({ username }) => {
  const [avatarUrl, setAvatarUrl] = useState('');

  return (
    <div className='p-6 pb-2 border-b-[1px] border-slate-600'>
      <p className='text-2xl font-bold'>Settings</p>
      <div className='flex flex-col items-center mb-3'>
        <div className='flex flex-row-reverse items-end mt-[27.7px]'>
          <img
            src={
              !avatarUrl
                ? 'https://avatars.githubusercontent.com/u/73225256'
                : avatarUrl
            }
            alt='Avatar'
            className='w-28 h-28 rounded-full border-4 border-slate-600'
          />
          <input
            type='file'
            accept='.gif .jpg .jpeg .png'
            id='update-avatar'
            className='hidden'
            // onChange={(e) => handleUploadFile(e.target.files[0])}
          />
          <Tippy content='Update Avatar'>
            <label
              htmlFor='update-avatar'
              className='absolute bg-slate-600 p-1.5 cursor-pointer rounded-full hover:bg-gray-600'
            >
              <img src={PencilIcon} alt='Pencil' className='w-5 h-5' />
            </label>
          </Tippy>
        </div>
        <p className='font-semibold mt-4'>{username}</p>
      </div>
    </div>
  );
};
