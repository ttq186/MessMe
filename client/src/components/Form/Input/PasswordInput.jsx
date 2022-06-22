import { useFormContext } from 'react-hook-form';

import { PasswordIcon } from 'assets/icons';
import { InputField } from 'components/Form/';

export const PasswordInput = ({ error }) => {
  const { register } = useFormContext();
  const passwordValidationRules = {
    required: {
      value: true,
      message: 'Please fill in this field!',
    },
    minLength: {
      value: 8,
      message: 'Minimum length should be 8',
    },
  };

  return (
    <InputField
      type='password'
      label='Password'
      icon={PasswordIcon}
      placeholder='Enter your password'
      validationRules={passwordValidationRules}
      register={register}
      error={error}
    />
  );
};
