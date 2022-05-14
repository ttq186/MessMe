import { OptionIcon } from 'assets/icons';
import { ContactDropdown } from 'pages/Dashboard/DashboardContact';

export const ContactByFirstLetter = () => {
  return (
    <div className='font-bold pl-10 pr-5 mb-7'>
      <h2 className='text-blue-300'>A</h2>
      <div className='px-3 text-[14.5px] text-slate-200'>
        <div className='flex justify-between items-center'>
          <p className='my-3'>Albert Rodarte</p>
          <ContactDropdown triggerButton={<OptionIcon />} />
        </div>
        <div className='flex justify-between items-center'>
          <p className='my-3'>Albert Rodarte</p>
          <ContactDropdown triggerButton={<OptionIcon />} />
        </div>
      </div>
    </div>
  );
};
