import MessMeIcon from '../assets/icons/mess-me.png';
import CoffeeCupIcon from '../assets/icons/coffee-cup.png';
import GoogleIcon from '../assets/icons/google.png';

const SignIn = () => {
  return (
    <div className='bg-gray-700'>
      <div className='container flex flex-col justify-center items-center min-h-screen max-w-md mx-auto text-slate-200'>
        <div className='mb-8'>
          <img
            src={MessMeIcon}
            alt='MessMe'
            className='w-7 inline mx-auto align-top'
          />
          <span className='text-2xl ml-1'>MessMe</span>
        </div>
        <h4 className='text-2xl mb-2'>Sign In</h4>
        <p className='font-normal text-gray-400'>
          Sign in to continue to MessMe
        </p>

        <form className='bg-gray-800 font-bold w-[88%] p-6 md:p-8 pb-4 md:pb-6 rounded-md mt-5 text-gray-400'>
          <div className='mb-4'>
            <label
              className='block mb-1 text-md md:text-lg text-gray-300'
              htmlFor='email'
            >
              Email <span className='text-red-700'>*</span>
            </label>
            <input
              type='text'
              id='email'
              placeholder='Enter your email'
              className='w-full p-2.5 px-4 bg-gray-600 rounded text-sm md:text-[15px] focus:outline-none'
            />
          </div>
          <div className='mb-4'>
            <label
              className='block mb-1 text-md md:text-lg text-gray-300'
              htmlFor='password'
            >
              Password <span className='text-red-700'>*</span>
            </label>
            <input
              type='password'
              id='password'
              placeholder='Enter your password'
              className='w-full p-2.5 px-4 bg-gray-600 rounded text-sm md:text-[15px] focus:outline-none'
            />
          </div>
          <button className='bg-blue-400 w-full p-2 rounded mt-3 text-sm md:text-base text-slate-50 font-bold hover:bg-blue-500 hover:text-gray-50'>
            Sign In
          </button>
          <div className='flex py-5 items-center'>
            <div className='flex-grow border-t border-gray-400'></div>
            <span className='flex-shrink mx-2 md:mx-4 text-gray-300 text-sm md:text-base'>
              OR
            </span>
            <div className='flex-grow border-t border-gray-400'></div>
          </div>

          <button className='flex justify-center bg-slate-100 w-full p-2 rounded text-sm md:text-base text-slate-800'>
            <img src={GoogleIcon} alt='Google' className='w-4 md:w-5 mr-2' />
            <p className='font-bold'>Sign In with Google</p>
          </button>

          <div className='flex justify-between mt-5 text-sm md:text-base'>
            <p className='cursor-pointer'>Forgot Password?</p>
            <p className='cursor-pointer'>Sign Up</p>
          </div>
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

export default SignIn;
