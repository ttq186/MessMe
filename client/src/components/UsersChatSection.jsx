import { SearchIcon } from '../assets/icons';
import Conversation from './Conversation';

const UsersChatSection = () => {
  return (
    <>
      <div className='p-6 pb-2'>
        <p className='text-2xl font-bold'>Chat</p>
        <div className='flex my-3'>
          <span className='bg-slate-600 rounded-l'>
            <img src={SearchIcon} className='w-12 p-1' />
          </span>
          <input
            placeholder='Search users'
            className='text-slate-300 pr-4 py-3 text-sm bg-slate-600 rounded-r w-full outline-none border-none'
          />
        </div>
      </div>

      <div className='pl-3 pr-1.5 mt-3'>
        <p className='font-bold text mb-3 p-3 pb-0'>Recent</p>
        <div className='overflow-y-scroll scrollbar-transparent hover:scrollbar h-[73vh]'>
          <Conversation isActive={true} isChose={true} />
          <Conversation />
          <Conversation isActive={true} />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
          <Conversation />
        </div>
      </div>
    </>
  );
};

export default UsersChatSection;
