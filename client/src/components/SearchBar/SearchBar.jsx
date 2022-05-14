import { SearchIcon } from 'assets/icons';

export const SearchBar = ({ placeholder }) => {
  return (
    <div className='flex my-3'>
      <span className='bg-slate-600 rounded-l'>
        <img src={SearchIcon} alt='Search' className='w-12 p-1' />
      </span>
      <input
        placeholder={placeholder}
        className='text-slate-300 pr-4 py-3 text-sm font-medium bg-slate-600 rounded-r w-full outline-none border-none'
      />
    </div>
  );
};
