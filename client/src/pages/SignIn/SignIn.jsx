import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';
import { useForm, FormProvider } from 'react-hook-form';
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';

import { isSignUpSuccessVar } from 'cache';
import { AlertIcon, CoffeeCupIcon, SuccessIcon } from 'assets/icons';
import { EmailInput, PasswordInput } from 'components/Form';
import { MainLayout } from 'components/Layout';
import { LOGIN, LOGIN_VIA_GOOGLE } from 'graphql/auth';
import { TransitionSlide } from 'components/Transition/TransitionSlide';
import { Spinner } from 'components/Spinner/Spinner';

export const SignIn = () => {
  const navigate = useNavigate();
  const formMethods = useForm();
  const [errorMessage, setErrorMessage] = useState(null);

  const [login, { loading: loginLoading, data: loginData }] = useLazyQuery(
    LOGIN,
    {
      onError: (error) => setErrorMessage(error.message),
    }
  );
  const [
    loginViaGoogle,
    { loading: loginViaGoogleLoading, data: loginViaGoogleData },
  ] = useLazyQuery(LOGIN_VIA_GOOGLE, {
    onError: (error) => setErrorMessage(error.message),
  });

  const onGoogleLoginSuccess = (res) => {
    loginViaGoogle({
      variables: {
        tokenId: res.credential,
      },
    });
  };

  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = formMethods;

  const handleFormSubmit = () => {
    const { email, password } = getValues();
    login({
      variables: { email, password },
    });
  };

  useEffect(() => {
    if (isSignUpSuccessVar()) {
      isSignUpSuccessVar(false);
    }
    if (loginData || loginViaGoogleData) {
      navigate('/dashboard');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginData, loginViaGoogleData]);

  return (
    <>
      {(loginLoading || loginViaGoogleLoading) && <Spinner />}
      <MainLayout>
        <h4 className='text-2xl mb-2'>Sign In</h4>
        <p className='font-normal text-gray-400 mb-5 text-sm md:text-base'>
          Sign in to continue to MessMe
        </p>

        <TransitionSlide>
          <FormProvider {...formMethods}>
            <form
              className='bg-gray-800 font-bold p-6 md:p-8 pb-4 md:pb-6 rounded-md text-gray-400'
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              {errorMessage && (
                <div className='flex items-center bg-red-300 py-2.5 px-3 mb-3 font-semibold text-zinc-700 text-[13.8px] text-center rounded'>
                  <img src={AlertIcon} alt='Alert' className='w-7 h-7 mr-1' />
                  <div>{errorMessage}</div>
                </div>
              )}
              {isSignUpSuccessVar() && (
                <div className='flex items-center bg-green-300 py-2.5 px-3 mb-3 font-semibold text-zinc-700 text-[13.7px] text-center rounded'>
                  <img src={SuccessIcon} alt='Alert' className='w-7 h-7 mr-1' />
                  <div>Account has been created successfully!</div>
                </div>
              )}
              <EmailInput error={errors.email} />
              <PasswordInput error={errors.password} />
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

              {!loginLoading && !loginViaGoogleLoading && (
                <GoogleOAuthProvider
                  clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
                >
                  <GoogleLogin
                    onSuccess={onGoogleLoginSuccess}
                    onError={(err) => console.log(err)}
                    locale='EN'
                    cancel_on_tap_outside={false}
                    useOneTap
                  />
                </GoogleOAuthProvider>
              )}

              <div className='flex justify-between mt-5 text-sm md:text-base'>
                <Link to='/forgot-password' className='cursor-pointer'>
                  Forgot Password?
                </Link>
                <Link to='/sign-up' className='cursor-pointer'>
                  Sign Up
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
    </>
  );
};
