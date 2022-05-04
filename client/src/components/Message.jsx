import { FriendProfileIcon } from '../assets/icons';

const Message = ({ isSender = true }) => {
  return (
    <div className={`flex items-end ${isSender ? 'flex-row-reverse' : ''}`}>
      <div className='p-2 pb-0'>
        <img src={FriendProfileIcon} alt='Profile' className='w-8 h-8' />
      </div>
      <div>
        <div className='w-[400px] text-[15px] font-medium bg-slate-500 text-slate-200 p-3 mb-4 rounded-md'>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse aliquam
          tempore similique vero totam neque ullam ducimus cumque voluptatem
          rerum!
        </div>
      </div>
    </div>
  );
};

export default Message;
