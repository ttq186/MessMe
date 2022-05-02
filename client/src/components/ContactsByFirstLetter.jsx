import { OptionIcon } from '../assets/icons';
import ContactDropdown from './ContactDropdown';

const ContactsByFirstLetter = () => {
  return (
    <div className='font-bold pl-10 pr-5 mb-7'>
      <h2 className='text-blue-300'>A</h2>
      <div className='px-3 text-sm text-slate-300'>
        <div className='flex justify-between items-center'>
          <p className='my-3'>Albert Rodarte</p>
          <ContactDropdown>
            <img src={OptionIcon} alt='Option' className='w-8 cursor-pointer' />
          </ContactDropdown>
        </div>
        <div className='flex justify-between items-center'>
          <p className='my-3'>Albert Rodarte</p>
          <ContactDropdown>
            <img src={OptionIcon} alt='Option' className='w-8 cursor-pointer' />
          </ContactDropdown>
        </div>
      </div>
    </div>
  );
};

export default ContactsByFirstLetter;
