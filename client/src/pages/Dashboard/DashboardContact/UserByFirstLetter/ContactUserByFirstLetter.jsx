import { OptionIcon } from 'assets/icons';
import { ContactDropdown } from 'pages/Dashboard/DashboardContact';

export const ContactByFirstLetter = ({ id, name }) => {
  return (
    <div className='pr-3 pl-5 text-[14.5px] text-slate-200'>
      <div className='flex justify-between items-center'>
        <p className='my-2'>{name}</p>
        <ContactDropdown triggerButton={<OptionIcon />} id={id} />
      </div>
    </div>
  );
};
