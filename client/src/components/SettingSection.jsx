import 'tippy.js/dist/tippy.css';

import { PencilIcon } from 'assets/icons';
import SettingDisclosure from 'components/SettingDisclosure';

const SettingSection = () => {
  return (
    <>
      <div className='p-6 pb-2 border-b-[1px] border-slate-600'>
        <p className='text-2xl font-bold'>Settings</p>
        <div className='flex flex-col items-center mb-3'>
          <div className='flex flex-row-reverse items-end mt-[27.7px]'>
            <img
              src='https://avatars.githubusercontent.com/u/73225256'
              alt='Avatar'
              className='w-28 h-28 rounded-full border-4 border-slate-600'
            />
            <input type='file' id='update-avatar' className='hidden' />
            <label
              htmlFor='update-avatar'
              className='absolute bg-slate-600 p-1.5 cursor-pointer rounded-full hover:bg-gray-600'
            >
              <img src={PencilIcon} alt='Pencil' className='w-5 h-5' />
            </label>
          </div>
          <p className='font-semibold mt-4'>Thanh Quang</p>
        </div>
      </div>

      <SettingDisclosure />
    </>
  );
};

export default SettingSection;
