export const CurrentUserSkeleton = () => {
  return (
    <div className='rounded-md p-4 w-1/3'>
      <div className='animate-pulse flex space-x-4'>
        <div className='rounded-full bg-slate-400 h-8 w-8 opacity-75'></div>
        <div className='flex-1 space-y-6 py-1'>
          <div className='space-y-3'>
            <div className='h-2 bg-slate-400 rounded w-1/2 opacity-75'></div>
            <div className='h-2 bg-slate-400 rounded w-1/4 opacity-75'></div>
          </div>
        </div>
      </div>
    </div>
  );
};
