import { Link } from 'react-router-dom';

import { CoffeeCupIcon } from 'assets/icons';
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from 'components/Form';
import { MainLayout } from 'components/Layout';

export const SignUp = () => {
  return (
    <MainLayout>
      <h4 className='text-2xl mb-2'>Sign Up</h4>
      <p className='font-normal text-gray-400 mb-5 text-sm md:text-base'>
        Create your own MessMe account now
      </p>

      <form className='bg-gray-800 font-bold w-[88%] p-6 md:p-8 pb-4 md:pb-6 rounded-md text-gray-400'>
        <EmailInput />
        <PasswordInput />
        <ConfirmPasswordInput />

        <button className='bg-blue-400 w-full p-2 rounded mt-[28.3px] md:mt-[29.3px] text-sm md:text-base text-slate-50 font-bold hover:bg-blue-500 hover:text-gray-50'>
          Sign Up
        </button>
        <div className='flex justify-between mt-5 text-sm md:text-base'>
          <Link to='/forgot-password' className='cursor-pointer'>
            Forgot Password?
          </Link>
          <Link to='/signin' className='cursor-pointer'>
            Sign In
          </Link>
        </div>
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
    </MainLayout>
  );
};
