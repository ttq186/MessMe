import PasswordIcon from '../assets/icons/password.svg';

const ConfirmPasswordInput = () => {
  return (
    <div className='mb-4'>
      <label
        className='block mb-1 text-[15px] md:text-lg text-gray-300'
        htmlFor='confirm-password'
      >
        Confirm Password <span className='text-red-700'>*</span>
      </label>
      <div className='flex'>
        <span className='bg-gray-700 rounded-l p-[0.54rem] px-[0.8rem]'>
          <img
            src={PasswordIcon}
            alt='Password'
            className='w-6 md:w-7'
          />
        </span>
        <input
          type='Password'
          id='confirm-password'
          placeholder='Enter your password again'
          className='w-full p-2 md:p-2.5 px-2 md:px-4 bg-gray-600 rounded-r text-sm md:text-[15px] focus:outline-none'
        />
      </div>
    </div>
  );
};

export default ConfirmPasswordInput;
