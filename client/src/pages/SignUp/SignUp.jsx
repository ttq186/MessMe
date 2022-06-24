import { Link, useNavigate } from 'react-router-dom';
import { useForm, FormProvider } from 'react-hook-form';

import { CoffeeCupIcon } from 'assets/icons';
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from 'components/Form';
import { MainLayout } from 'components/Layout';
import { TransitionSlide } from 'components/Transition/TransitionSlide';

export const SignUp = () => {
  const navigate = useNavigate();
  const formMethods = useForm();
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = formMethods;

  const handleFormSubmit = () => {
    navigate('/sign-in');
    const { email, password, confirmPassword } = getValues();
    signUp(email, password);
  };

  const signUp = (email, password) => {
    console.log(email, password);
  };

  return (
    <MainLayout>
      <h4 className='text-2xl mb-2'>Sign Up</h4>
      <p className='font-normal text-gray-400 mb-5 text-sm md:text-base'>
        Create your own MessMe account now
      </p>

      <TransitionSlide>
        <FormProvider {...formMethods}>
          <form
            className='bg-gray-800 font-bold p-6 md:p-8 pb-4 md:pb-6 rounded-md text-gray-400'
            onSubmit={handleSubmit(handleFormSubmit)}
          >
            <EmailInput error={errors.email} />
            <PasswordInput error={errors.password} />
            <ConfirmPasswordInput error={errors.confirmPassword} />

            <button className='bg-blue-400 w-full p-2 rounded mt-[13px] text-sm md:text-base text-slate-50 font-bold hover:bg-blue-500 hover:text-gray-50'>
              Sign Up
            </button>
            <div className='flex justify-between mt-5 text-sm md:text-base'>
              <Link to='/forgot-password' className='cursor-pointer'>
                Forgot Password?
              </Link>
              <Link to='/sign-in' className='cursor-pointer'>
                Sign In
              </Link>
            </div>
          </form>
        </FormProvider>
      </TransitionSlide>

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
