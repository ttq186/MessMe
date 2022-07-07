export const UsersChatItem = ({
  isActive = false,
  isChose = false,
  email,
  username,
  avatarUrl,
}) => {
  return (
    <div
      className={`flex p-3 mx-3 mb-2.5 ${
        isChose ? 'bg-slate-500' : 'opacity-60 bg-slate-600 hover:bg-slate-500'
      } rounded cursor-pointer transition duration-300 ease-out hover:ease-in`}
    >
      <div className={`flex items-end p-1 ${isActive ? 'mr-1' : 'mr-2'} `}>
        <img
          src={avatarUrl}
          alt={username ? username : email.split('@')[0]}
          className='w-10 h-10 rounded-full'
        />
        {isActive && (
          <span className='w-3 h-3 rounded-full  bg-green-500 -ml-2 border-slate-200 border-2'></span>
        )}
      </div>
      <div className='grow'>
        <p className='font-bold'>{username ? username : email.split('@')[0]}</p>
        <p className='text-sm text-slate-300 font-medium'>
          Tao lạy m, đừng học nữa :))
        </p>
      </div>
      <p className='text-sm font-bold text-gray-400'>14:2</p>
    </div>
  );
};
