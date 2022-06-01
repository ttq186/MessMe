export const UsersChatConversation = ({
  isActive = false,
  isChose = false,
}) => {
  return (
    <div
      className={`flex p-3 mx-3 mb-2.5 ${
        isChose ? 'bg-slate-500' : 'opacity-60 bg-slate-600 hover:bg-slate-500'
      } rounded cursor-pointer transition duration-300 ease-out hover:ease-in`}
    >
      <div className={`flex items-end p-1 ${isActive ? 'mr-1' : 'mr-2'} `}>
        <img
          src='https://triparis.blob.core.windows.net/triparis-container/images/template.png'
          alt='User'
          className='w-10 rounded-full'
        />
        {isActive && (
          <span className='w-3 h-3 rounded-full  bg-green-500 -ml-2 border-slate-200 border-2'></span>
        )}
      </div>
      <div className='grow'>
        <p className='font-bold'>Duy Dâm</p>
        <p className='text-sm text-slate-300 font-medium'>
          Tao lạy m, đừng học nữa :))
        </p>
      </div>
      <p className='text-sm font-bold text-gray-400'>14:2</p>
    </div>
  );
};
