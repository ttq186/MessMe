export const InputField = ({
  icon,
  label,
  placeholder,
  validationRules,
  register,
  error,
  type = 'text',
}) => {
  const labelSplit = label.split(' ');
  const inputRegisterName =
    labelSplit[0].toLowerCase() + labelSplit.slice(1).join('');

  return (
    <div className='mb-4'>
      <label
        className='block mb-1 text-[15px] md:text-lg text-gray-300 font-semibold'
        htmlFor={label}
      >
        {label} <span className='text-red-700'>*</span>
      </label>
      <div className='flex'>
        <span className='bg-gray-700 rounded-l p-[0.54rem] px-[0.8rem]'>
          <img src={icon} alt={label} className='w-6 md:w-7' />
        </span>
        <input
          type={type}
          id={label}
          placeholder={placeholder}
          className='w-full p-2 md:p-2.5 px-2 md:px-4 bg-gray-600 rounded-r font-medium text-sm
          md:text-[15px] focus:outline-none'
          {...register(inputRegisterName, validationRules)}
        />
      </div>
      {error && (
        <span className='text-red-500 text-sm font-semibold opacity-90'>
          {error.message}
        </span>
      )}
    </div>
  );
};
