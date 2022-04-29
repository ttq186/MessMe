import { EmailIcon } from '../assets/icons';

const EmailInput = () => {
  return (
    <div className='mb-4'>
      <label
        className='block mb-1 text-[15px] md:text-lg text-gray-300'
        htmlFor='email'
      >
        Email <span className='text-red-700'>*</span>
      </label>
      <div className='flex'>
        <span className='bg-gray-700 rounded-l p-[0.54rem] px-[0.8rem]'>
          <img src={EmailIcon} alt='Email' className='w-6 md:w-7' />
        </span>
        <input
          type='text'
          id='email'
          placeholder='Enter your email'
          className='w-full p-2 md:p-2.5 px-2 md:px-4 bg-gray-600 rounded-r text-sm
          md:text-[15px] focus:outline-none'
        />
      </div>
    </div>
  );
};

export default EmailInput;
