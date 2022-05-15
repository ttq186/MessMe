export const GroupItem = () => {
  return (
    <div className='flex justify-between px-6 py-4 mb-2 transition duration-300 ease-out text-slate-200 font-semibold cursor-pointer items-center rounded hover:bg-slate-600 hover:ease-in'>
      <div className='flex items-center'>
        <div className='flex bg-blue-400 justify-center items-center w-8 h-8 rounded-full'>
          G
        </div>
        <p className='ml-4'>#General</p>
      </div>
      <p className='bg-orange-300 text-[13px] text-slate-600 px-2 rounded-sm'>
        23+
      </p>
    </div>
  );
};