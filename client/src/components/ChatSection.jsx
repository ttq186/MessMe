import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import {
  AvatarIcon,
  SearchIcon,
  PhoneIcon,
  VideoCallIcon,
  FriendProfileIcon,
  OtherIcon,
  EmojiIcon,
  AttachIcon,
  GalleryIcon,
  SendIcon,
} from '../assets/icons';
import Message from './Message';
import OthersDropdown from './OthersDropdown';

const ChatSection = () => {
  return (
    <>
      <div className='flex justify-between border-b-[1.5px] border-slate-500'>
        <div className='flex items-center p-4'>
          <AvatarIcon width='45px' height='45px' />
          <div className='font-bold'>
            <p className='ml-2 text-slate-100 cursor-pointer'>Thanh Quang</p>
            <p className='ml-2 text-xs text-green-300'>Online</p>
          </div>
        </div>
        <div className='flex justify-evenly w-80 items-center'>
          <Tippy content='Search Message'>
            <div className='cursor-pointer'>
              <img src={SearchIcon} alt='Search' className='w-9 h-9' />
            </div>
          </Tippy>
          <Tippy content='Call'>
            <div className='cursor-pointer'>
              <img src={PhoneIcon} alt='Phone' className='w-6 h-6' />
            </div>
          </Tippy>
          <Tippy content='Video Call'>
            <div className='cursor-pointer'>
              <img src={VideoCallIcon} alt='Video Call' className='w-8 h-8' />
            </div>
          </Tippy>
          <Tippy content="Friend's Profile">
            <div className='cursor-pointer'>
              <img src={FriendProfileIcon} alt='Profile' className='w-6 h-6' />
            </div>
          </Tippy>
          <OthersDropdown>
            <Tippy content='Others'>
              <div className='cursor-pointer'>
                <img src={OtherIcon} alt='Other' className='w-7 h-7' />
              </div>
            </Tippy>
          </OthersDropdown>
        </div>
      </div>

      <div className='h-[81vh] p-2 overflow-y-scroll scrollbar-transparent hover:scrollbar'>
        <div className='flex items-center p-4 px-8'>
          <div className='grow border-t-[1px] border-slate-500'></div>
          <div className='mx-3 bg-slate-500 text-slate-300 text-sm px-2.5 py-0.5 rounded'>
            Today
          </div>
          <div className='grow border-t-[1px] border-slate-500'></div>
        </div>
        <div>
          <Message />
          <Message isSender={false} />
          <Message isSender={false} />
          <Message />
          <Message isSender={false} />
          <Message />
          <Message isSender={false} />
          <Message />
        </div>
      </div>

      <div className='relative bottom-0 w-full flex justify-between items-center px-5 py-3.5 pr-32 border-t-[1.5px] border-slate-500'>
        <div className='flex items-center'>
          <Tippy content='Attach File'>
            <div className='mx-4 cursor-pointer'>
              <img src={AttachIcon} alt='Attach' className='w-7 h-7' />
            </div>
          </Tippy>
          <Tippy content='Images'>
            <div className='mr-4 cursor-pointer'>
              <img src={GalleryIcon} alt='Gallery' className='w-6 h-6' />
            </div>
          </Tippy>
          <Tippy content='Emoji'>
            <div className='mr-4 cursor-pointer'>
              <img src={EmojiIcon} alt='Emoji' className='w-9 h-9' />
            </div>
          </Tippy>
        </div>
        <div className='grow ml-2'>
          <input
            className='py-2.5 px-5 w-full bg-slate-700 text-[15px] text-gray-300 rounded-md outline-none'
            placeholder='Enter Message...'
          />
        </div>
        <Tippy content='Send Message'>
          <div className='bg-blue-300 mx-4 px-3.5  py-2 rounded cursor-pointer'>
            <img src={SendIcon} alt='Send' className='w-5 h-5' />
          </div>
        </Tippy>
      </div>
    </>
  );
};

export default ChatSection;
