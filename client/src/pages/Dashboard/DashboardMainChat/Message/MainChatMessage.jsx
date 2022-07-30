import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import Linkify from 'linkify-react';

import { AvatarIcon, OptionIcon } from 'assets/icons';
import { MessageDropdown } from 'pages/Dashboard/DashboardMainChat';

export const MainChatMessage = ({
  id,
  isSender = true,
  author,
  content,
  createdAt,
}) => {
  const isHidden = content === 'This message has been revoked!';
  return (
    <div className={`flex items-end ${isSender && 'flex-row-reverse'}`}>
      <div className='py-2 px-1 pb-0'>
        {!author.avatarUrl ? (
          <AvatarIcon width='40px' height='40px' />
        ) : (
          <img
            src={author.avatarUrl}
            alt='Profile'
            className='w-10 h-10 rounded-full border-2 border-slate-500'
          />
        )}
      </div>
      <div className={`flex ${isSender && 'flex-row-reverse'}`}>
        <Tippy
          content={
            <b style={{ color: '#cbd5e1', fontSize: '13px' }}>
              {createdAt
                ? new Date(
                    createdAt.includes('+') ? createdAt : createdAt + '+00:00'
                  ).toLocaleString()
                : ''}
            </b>
          }
          placement='right-start'
          allowHTML={true}
        >
          <div
            className={`${
              isSender
                ? 'bg-slate-500 text-slate-200'
                : 'bg-slate-700 text-slate-400'
            } w-[400px] text-[15px] font-medium p-3 mb-4 rounded-md`}
          >
            {isHidden ? (
              <p className='italic opacity-60'>{content}</p>
            ) : (
              <Linkify>{content}</Linkify>
            )}
          </div>
        </Tippy>

        {!isHidden && (
          <MessageDropdown
            id={id}
            isSender={isSender}
            triggerButton={
              <OptionIcon fill={`${isSender ? '#94a3b8' : '#1f2937'}`} />
            }
          />
        )}
      </div>
    </div>
  );
};
