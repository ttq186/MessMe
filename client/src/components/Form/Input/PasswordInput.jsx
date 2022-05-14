import { PasswordIcon } from 'assets/icons';
import { InputField } from 'components/Form/';

export const PasswordInput = () => {
  return (
    <InputField
      label='Password'
      icon={PasswordIcon}
      placeholder='Enter your password'
    />
  );
};
