import { Link } from 'react-router-dom';

import { MessMeIcon } from '../assets/icons';

const NotFound = () => {
  return (
    <div className='bg-gray-700'>
      <div className='container flex flex-col items-center pt-24 min-h-screen mx-auto text-slate-200'>
        <Link to='/' className='mb-44'>
          <MessMeIcon />
          <span className='text-2xl ml-1 font-bold'>MessMe</span>
        </Link>
        <div className='flex flex-col items-center font-bold md:flex-row'>
          <h1 className='text-6xl mr-4 md:text-9xl'>404</h1>
          <p className='text-2xl md:text-4xl'>Page Not Found</p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
