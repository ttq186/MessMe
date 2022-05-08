import { Link, useNavigate } from 'react-router-dom';

import EmailInput from '../components/EmailInput';
import PasswordInput from '../components/PasswordInput';
import { MessMeIcon, CoffeeCupIcon, GoogleIcon } from '../assets/icons';

const SignIn = () => {
  const navigate = useNavigate();

  const handleFormSubmit = (e) => {
    e.preventDefault();

    navigate('/dashboard');
  };

  return (
    <div className='bg-gray-700'>
      <div className='container flex flex-col justify-center items-center min-h-screen max-w-md mx-auto text-slate-200'>
        <Link to='/' className='mb-10 flex'>
          <MessMeIcon />
          <span className='text-2xl ml-1 font-bold'>MessMe</span>
        </Link>
        <h4 className='text-2xl mb-2'>Sign In</h4>
        <p className='font-normal text-gray-400 mb-5 text-sm md:text-base'>
          Sign in to continue to MessMe
        </p>

        <form
          className='bg-gray-800 font-bold w-[88%] p-6 md:p-8 pb-4 md:pb-6 rounded-md text-gray-400'
          onSubmit={(e) => handleFormSubmit(e)}
        >
          <EmailInput />
          <PasswordInput />

          <button className='bg-blue-400 w-full p-2 rounded mt-3 text-sm md:text-base text-slate-50 font-bold hover:bg-blue-500 hover:text-gray-50'>
            Sign In
          </button>
          <div className='flex py-3 md:py-[12.9px] items-center'>
            <div className='flex-grow border-t border-gray-400'></div>
            <span className='flex-shrink mx-2 md:mx-4 text-gray-300 text-sm md:text-base'>
              OR
            </span>
            <div className='flex-grow border-t border-gray-400'></div>
          </div>

          <button className='flex justify-center items-center bg-slate-100 w-full p-2 rounded text-sm md:text-base text-slate-800'>
            <img src={GoogleIcon} alt='Google' className='w-4 md:w-5 mr-2' />
            <p className='font-bold'>Sign In with Google</p>
          </button>

          <div className='flex justify-between mt-5 text-sm md:text-base'>
            <Link to='/forgot-password' className='cursor-pointer'>
              Forgot Password?
            </Link>
            <Link to='/signup' className='cursor-pointer'>
              Sign Up
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
      </div>
    </div>
  );
};

export default SignIn;
