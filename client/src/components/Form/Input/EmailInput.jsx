import { EmailIcon } from 'assets/icons';
import { InputField } from 'components/Form';

export const EmailInput = () => {
  return (
    <InputField label='Email' icon={EmailIcon} placeholder='Enter your email' />
  );
};
