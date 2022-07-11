import { AvatarIcon } from 'assets/icons';
import { activeUserChatVar } from 'cache';

export const UsersChatItem = ({
  isActive = false,
  isChose = false,
  friend,
  lastMessage,
}) => {
  return (
    <div
      className={`flex p-3 mx-3 mb-2.5 ${
        isChose ? 'bg-slate-500' : 'opacity-60 bg-slate-600 hover:bg-slate-500'
      } rounded cursor-pointer transition duration-300 ease-out hover:ease-in`}
      onClick={() => activeUserChatVar(friend)}
    >
      <div className={`flex items-end p-1 ${isActive ? 'mr-1' : 'mr-2'} `}>
        {!friend.avatarUrl ? (
          <AvatarIcon width='40px' height='40px' />
        ) : (
          <img
            src={friend.avatarUrl}
            alt='Friend'
            className='w-10 h-10 rounded-full'
          />
        )}
        {isActive && (
          <span className='w-3 h-3 rounded-full  bg-green-500 -ml-2 border-slate-200 border-2'></span>
        )}
      </div>
      <div className='grow'>
        <div className='flex justify-between'>
          <p className='font-bold'>
            {friend.username ? friend.username : friend.email.split('@')[0]}
          </p>
          <p className='w-[85px] text-[13px] font-bold text-gray-400'>
            {lastMessage?.createdAt
              ? new Date(lastMessage.createdAt).toLocaleTimeString()
              : ''}
          </p>
        </div>
        <p className='text-sm text-slate-300 font-medium w-[250px] truncate overflow-hidden'>
          {lastMessage?.content}
        </p>
      </div>
    </div>
  );
};
