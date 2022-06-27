import { useQuery } from '@apollo/client';
import { FriendProfileIcon, OptionIcon } from 'assets/icons';
import { MessageDropdown } from 'pages/Dashboard/DashboardMainChat';
import { GET_CURRENT_USER } from 'queries/userQueries';

export const MainChatMessage = ({ isSender = true }) => {
  const { data } = useQuery(GET_CURRENT_USER);

  return (
    <div className={`flex items-end ${isSender && 'flex-row-reverse'}`}>
      <div className='py-2 px-1 pb-0'>
        <img
          src={isSender ? data?.currentUser.avatarUrl : FriendProfileIcon}
          alt='Profile'
          className='w-10 h-10 rounded-full border-2 border-slate-500'
        />
      </div>
      <div className={`flex ${isSender && 'flex-row-reverse'}`}>
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
        <MessageDropdown
          triggerButton={
            <OptionIcon fill={`${isSender ? '#94a3b8' : '#1f2937'}`} />
          }
        />
      </div>
    </div>
  );
};
