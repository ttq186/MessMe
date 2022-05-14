import {
  SettingAvatar,
  SettingDisclosure,
} from 'pages/Dashboard/DashboardSetting';

export const DashboardSetting = () => {
  return (
    <>
      <SettingAvatar username='Thanh Quang' />

      <div className='h-[65vh] overflow-y-scroll p-5 pr-2 pt-0 mt-5 mr-1.5 scrollbar-transparent hover:scrollbar'>
        <div className='rounded bg-slate-00 p-2 font-semibold'>
          <SettingDisclosure />
        </div>
      </div>
    </>
  );
};
