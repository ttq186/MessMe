import { CoffeeCupIcon } from 'assets/icons';
import { PasswordInput, ConfirmPasswordInput } from 'components/Form';
import { MainLayout } from 'components/Layout';

export const ResetPassword = () => {
  return (
    <MainLayout>
      <h4 className='text-2xl mb-2'>Reset Password</h4>
      <p className='font-normal text-gray-400 text-sm md:text-base'>
        Reset your MessMe password
      </p>

      <form className='bg-gray-800 font-bold w-[88%] p-6 md:p-8 pb-4 md:pb-7 rounded-md mt-5 text-gray-400'>
        <PasswordInput
          label='New Password'
          placeholder='Enter your new password'
        />
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
    </MainLayout>
  );
};
