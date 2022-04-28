import { Link } from 'react-router-dom';

import MessMeIcon from '../assets/icons/mess-me.png';
import CoffeeCupIcon from '../assets/icons/coffee-cup.png';
import PasswordInput from '../components/PasswordInput';
import ConfirmPasswordInput from '../components/ConfirmPasswordInput';

const ResetPassword = () => {
  return (
    <div className='bg-gray-700'>
      <div className='container flex flex-col pt-[4.25rem] md:pt-[5rem] items-center min-h-screen max-w-md mx-auto text-slate-200'>
        <div className='text-center'>
          <Link to='/' className='mb-10 pt-3.5 flex justify-center'>
            <img src={MessMeIcon} alt='MessMe' className='w-7 h-7' />
            <span className='text-2xl ml-1 font-bold'>MessMe</span>
          </Link>
          <h4 className='text-2xl mb-2'>Reset Password</h4>
          <p className='font-normal text-gray-400 text-sm md:text-base'>
            Reset your MessMe password
          </p>
        </div>

        <form className='bg-gray-800 font-bold w-[88%] p-6 md:p-8 pb-4 md:pb-7 rounded-md mt-5 text-gray-400'>
          <PasswordInput label='New Password' placeholder='Enter your new password' />
          <ConfirmPasswordInput />

          <button className='bg-blue-400 w-full p-2 rounded mt-7 text-sm md:text-base text-slate-50 font-bold hover:bg-blue-500 hover:text-gray-50'>
            Confirm
          </button>
        </form>
        <div className='flex items-center text-sm md:text-base text-slate-400 pt-10 pb-2'>
          <p>
            &copy; 2022 <b>MessMe</b>. Made with
          </p>
          <img
            src={CoffeeCupIcon}
            alt='coffee'
            className='w-[1.4rem] h-5 md:w-7 mx-1'
          />
          <p>
            by <b>TTQ186</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
