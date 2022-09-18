import { useFormContext } from "react-hook-form";

import { EmailIcon } from "assets/icons";
import { InputField } from "components/Form";

export const EmailInput = ({ error }) => {
  const { register } = useFormContext();
  const emailValidationRules = {
    required: {
      value: true,
      message: "Please fill in this field!",
    },
    pattern: {
      value: /\S+@\S+\.\S+/,
      message: "Invalid email format!",
    },
  };

  return (
    <InputField
      label="Email"
      icon={EmailIcon}
      placeholder="Enter your email"
      validationRules={emailValidationRules}
      register={register}
      error={error}
    />
  );
};
