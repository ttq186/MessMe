import { Link } from 'react-router-dom';

import MessMeIcon from '../assets/icons/mess-me.png';
import CoffeeCupIcon from '../assets/icons/coffee-cup.png';
import EmailInput from '../components/EmailInput';

const ForgotPassword = () => {
  return (
    <div className='bg-gray-700'>
      <div className='container flex flex-col pt-[4.9rem] md:pt-[5.65rem] items-center min-h-screen max-w-md mx-auto text-slate-200'>
        <div className='text-center pt-0.5'>
          <Link to='/' className='mb-[2.05rem]'>
            <img
              src={MessMeIcon}
              alt='MessMe'
              className='w-7 h-7 inline mx-auto align-top'
            />
            <span className='text-2xl ml-1 font-bold'>MessMe</span>
          </Link>
          <h4 className='text-2xl mb-2 mt-10'>Reset Password</h4>
          <p className='font-normal text-gray-400 text-sm md:text-base'>
            Reset your MessMe password
          </p>
        </div>

        <form className='bg-gray-800 font-bold w-[88%] p-6 md:p-8 pb-4 md:pb-7 rounded-md mt-5 text-gray-400'>
          <div className='bg-green-200 text-center text-zinc-700 rounded px-4 py-2 mb-4 text-[15px]'>
            Enter your email to receive your password reset instructions!
          </div>
          <EmailInput />
          <button className='bg-blue-400 w-full p-2 rounded mt-3 text-sm md:text-base text-slate-50 font-bold hover:bg-blue-500 hover:text-gray-50'>
            Reset
          </button>
        </form>
        <div className='flex items-center mt-10 text-sm md:text-base text-slate-400'>
          <p>
            &copy; 2022 <b>MessMe</b>. Made with
          </p>
          <img
            src={CoffeeCupIcon}
            alt='coffee'
            className='w-4 md:w-5 mx-2 -mt-2'
          />
          <p>
            by <b>TTQ186</b>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
