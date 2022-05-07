import { FriendProfileIcon, OptionIcon } from '../assets/icons';
import MessageDropdown from './MessageDropdown';

const Message = ({ isSender = true }) => {
  return (
    <div className={`flex items-end ${isSender ? 'flex-row-reverse' : ''}`}>
      <div className='p-2 pb-0'>
        <img src={FriendProfileIcon} alt='Profile' className='w-8 h-8' />
      </div>
      <div className={`flex ${isSender ? 'flex-row-reverse' : ''}`}>
        <div
          className={`${
            isSender
              ? 'bg-slate-500 text-slate-200'
              : 'bg-slate-700 text-slate-400'
          } w-[400px] text-[15px] font-medium p-3 mb-4 rounded-md`}
        >
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Esse aliquam
          tempore similique vero totam neque ullam ducimus cumque voluptatem
          rerum!
        </div>
        <MessageDropdown>
          <img src={OptionIcon} alt='Option' className='w-8 cursor-pointer' />
        </MessageDropdown>
      </div>
    </div>
  );
};

export default Message;
