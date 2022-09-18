import { useMutation } from "@apollo/client";
import { Link, useNavigate } from "react-router-dom";
import { useForm, FormProvider } from "react-hook-form";

import { CoffeeCupIcon } from "assets/icons";
import {
  EmailInput,
  PasswordInput,
  ConfirmPasswordInput,
} from "components/Form";
import { AlertIcon } from "assets/icons";
import { MainLayout } from "components/Layout";
import { Spinner } from "components/Spinner/Spinner";
import { CREATE_USER } from "graphql/users";
import { TransitionSlide } from "components/Transition/TransitionSlide";
import { isSignUpSuccessVar } from "cache";

export const SignUp = () => {
  const navigate = useNavigate();
  const formMethods = useForm();
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = formMethods;

  const [register, { loading, error, data }] = useMutation(CREATE_USER);

  const handleFormSubmit = () => {
    const { email, password } = getValues();
    register({
      variables: {
        input: {
          email,
          password,
        },
      },
    });
  };

  if (data) {
    isSignUpSuccessVar(true);
    navigate("/sign-in");
  }

  if (error) {
  }

  return (
    <>
      {loading && <Spinner />}
      <MainLayout>
        <h4 className="text-2xl mb-2">Sign Up</h4>
        <p className="font-normal text-gray-400 mb-5 text-sm md:text-base">
          Create your own MessMe account now
        </p>

        <TransitionSlide>
          <FormProvider {...formMethods}>
            <form
              className="bg-gray-800 font-bold p-6 md:p-8 pb-4 md:pb-6 rounded-md text-gray-400"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              {error && (
                <div className="flex items-center bg-red-300 py-2.5 px-3 mb-3 font-semibold text-slate-700 text-[14.5px] text-center rounded">
                  <img src={AlertIcon} alt="Alert" className="w-7 h-7 mr-1" />
                  <div>{error.message}</div>
                </div>
              )}
              <EmailInput error={errors.email} />
              <PasswordInput error={errors.password} />
              <ConfirmPasswordInput error={errors.confirmPassword} />

              <button className="bg-blue-400 w-full p-2 rounded mt-[13px] text-sm md:text-base text-slate-50 font-bold hover:bg-blue-500 hover:text-gray-50">
                Sign Up
              </button>
              <div className="flex justify-between mt-5 text-sm md:text-base">
                <Link to="/forgot-password" className="cursor-pointer">
                  Forgot Password?
                </Link>
                <Link to="/sign-in" className="cursor-pointer">
                  Sign In
                </Link>
              </div>
            </form>
          </FormProvider>
        </TransitionSlide>

        <div className="flex items-center text-sm md:text-base text-slate-400 pt-10 pb-2">
          <p>
            &copy; 2022 <b>MessMe</b>. Made with
          </p>
          <img
            src={CoffeeCupIcon}
            alt="coffee"
            className="w-[1.4rem] h-5 md:w-7 mx-1"
          />
          <p>
            by <b>TTQ186</b>
          </p>
        </div>
      </MainLayout>
    </>
  );
};
