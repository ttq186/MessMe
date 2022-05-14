import { PasswordIcon } from 'assets/icons';
import { InputField } from 'components/Form/';

export const ConfirmPasswordInput = () => {
  return (
    <InputField
      label='Confirm Password'
      icon={PasswordIcon}
      placeholder='Enter your password again'
    />
  );
};
