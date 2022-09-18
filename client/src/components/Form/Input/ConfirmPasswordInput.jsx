import { useFormContext } from "react-hook-form";

import { PasswordIcon } from "assets/icons";
import { InputField } from "components/Form/";

export const ConfirmPasswordInput = ({ error }) => {
  const { register, getValues } = useFormContext();
  const confirmPasswordValidationRules = {
    required: {
      value: true,
      message: "Please fill in this field!",
    },
    minLength: {
      value: 8,
      message: "Minimum length should be 8",
    },
    validate: {
      matchPassword: (value) =>
        value === getValues().password || "Password does not match!",
    },
  };

  return (
    <InputField
      type="password"
      label="Confirm Password"
      icon={PasswordIcon}
      placeholder="Enter your password again"
      validationRules={confirmPasswordValidationRules}
      register={register}
      error={error}
    />
  );
};
