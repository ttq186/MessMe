export const MessageSkeleton = ({ isReverse = false }) => {
  return (
    <div className={`rounded-md p-4 flex ${isReverse && 'flex-row-reverse'}`}>
      <div
        className={`animate-pulse flex items-end w-1/2 max-w-[400px] justify-end space-x-4 ${
          isReverse && 'flex-row-reverse'
        }`}
      >
        <div className='rounded-full bg-slate-400 h-10 w-10 opacity-75'></div>
        <div className='flex-1 space-y-3 py-1 pr-4'>
          <div className={`flex ${isReverse && 'flex-row-reverse'}`}>
            <div className='h-2 bg-slate-400 rounded w-2/3 opacity-75 '></div>
          </div>
          <div className='h-2 bg-slate-400 rounded opacity-75'></div>
          <div className='h-2 bg-slate-400 rounded opacity-75'></div>
          <div className='h-2 bg-slate-400 rounded opacity-75 '></div>
        </div>
      </div>
    </div>
  );
};
