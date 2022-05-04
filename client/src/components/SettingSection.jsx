import 'tippy.js/dist/tippy.css';

import SettingDisclosure from './SettingDisclosure';

const SettingSection = () => {
  return (
    <>
      <div className='p-6 pb-2 border-b-[1px] border-slate-600'>
        <div className='flex justify-between'>
          <p className='text-2xl font-bold'>Settings</p>
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

      <SettingDisclosure />
    </>
  );
};

export default SettingSection;
