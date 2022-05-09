import { useState, useRef } from 'react';
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
import AudioCallModal from './AudioCallModal';
import Message from './Message';
import OthersDropdown from './OthersDropdown';
import SearchDropdown from './SearchDropdown';
import VideoCallModal from './VideoCallModal';
import 'emoji-mart/css/emoji-mart.css';
import data from 'emoji-mart/data/facebook.json';
import { NimblePicker, Emoji } from 'emoji-mart';

const ChatSection = ({ setOpenFriendProfile }) => {
  const [isOpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const inputRef = useRef();

  const toggleEmojiPicker = () => {
    setOpenEmojiPicker(!isOpenEmojiPicker);
  };
  const handleChooseIcon = (e) => {
    // inputRef.current.innerHTML += `<span contentEditable='false' dangerouslySetInnerHTML={
    // __html: ${Emoji({
    //   html: true,
    //   set: 'facebook',
    //   emoji: e.id,
    //   size: 21,
    // })}
    // </span>`;

    // temporary solution
    inputRef.current.innerText += e.native;
  };

  return (
    <>
      <div className='flex justify-between border-b-2 border-slate-500'>
        <div className='flex items-center p-4'>
          <AvatarIcon width='45px' height='45px' />
          <div className='font-bold'>
            <p className='ml-2 text-slate-100 cursor-pointer'>Thanh Quang</p>
            <p className='ml-2 text-xs text-green-300'>Online</p>
          </div>
        </div>
        <div className='flex justify-evenly w-80 items-center'>
          <SearchDropdown>
            <Tippy content='Search Message'>
              <div className='cursor-pointer'>
                <img src={SearchIcon} alt='Search' className='w-9 h-9' />
              </div>
            </Tippy>
          </SearchDropdown>
          <AudioCallModal>
            <Tippy content='Call'>
              <div className='cursor-pointer'>
                <PhoneIcon />
              </div>
            </Tippy>
          </AudioCallModal>
          <VideoCallModal>
            <Tippy content='Video Call'>
              <div className='cursor-pointer'>
                <VideoCallIcon />
              </div>
            </Tippy>
          </VideoCallModal>
          <Tippy content="Friend's Profile">
            <div
              className='cursor-pointer'
              onClick={() => setOpenFriendProfile(true)}
            >
              <img src={FriendProfileIcon} alt='Profile' className='w-6 h-6' />
            </div>
          </Tippy>
          <OthersDropdown>
            <Tippy content='Others'>
              <div className='cursor-pointer -ml-1'>
                <img src={OtherIcon} alt='Other' className='w-6 h-6' />
              </div>
            </Tippy>
          </OthersDropdown>
        </div>
      </div>

      <div className='p-2 overflow-y-scroll scrollbar-transparent hover:scrollbar mr-[2px]'>
        <div className='flex items-center p-4 px-8'>
          <div className='grow border-t-[1px] border-slate-500'></div>
          <div className='mx-3 bg-slate-500 text-slate-300 font-medium text-sm px-2.5 py-0.5 rounded'>
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

      <div className='relative bottom-0 w-full flex justify-between items-center px-5 py-3.5 border-t-2 border-slate-500'>
        <div className='flex items-center'>
          <Tippy content='Attach File'>
            <div className='mx-4 cursor-pointer'>
              <label htmlFor='file-input' className='cursor-pointer'>
                <AttachIcon width='28px' height='28px' fill='#cbd5e1' />
              </label>
              <input id='file-input' type='file' className='hidden' />
            </div>
          </Tippy>
          <Tippy content='Images'>
            <div className='mr-4 cursor-pointer'>
              <label htmlFor='image-input' className='cursor-pointer'>
                <GalleryIcon fill='#cbd5e1' />
              </label>
              <input id='image-input' type='file' className='hidden' />
            </div>
          </Tippy>
          <Tippy content='Emoji'>
            <div className='mr-4 cursor-pointer'>
              <img
                src={EmojiIcon}
                alt='Emoji'
                className='w-[30px] h-[30px]'
                onClick={toggleEmojiPicker}
              />
            </div>
          </Tippy>
          <div className='relative bg-slate-500'>
            {isOpenEmojiPicker && (
              <div className='absolute -left-1 bottom-6 p-1 bg-slate-800 z-10 border border-slate-700 rounded'>
                <NimblePicker
                  set='facebook'
                  data={data}
                  title='MessMe Emoji'
                  showPreview={false}
                  showSkinTones={false}
                  color='#64748b'
                  theme='dark'
                  defaultSkin={5}
                  onSelect={(e) => handleChooseIcon(e)}
                />
              </div>
            )}
          </div>
        </div>

        <div className='relative max-w-[78.5%] grow max-h-[110px] ml-2 bg-slate-700 py-2.5 pl-5 text-[15px] text-slate-200 font-medium rounded-md'>
          {/* <input
            className='py-2.5 px-5 w-full bg-slate-700 text-[15px] text-slate-300 font-medium rounded-md outline-none'
            placeholder='Enter Message...'
            ref={inputRef}
          /> */}

          <div
            contentEditable='true'
            placeholder='Aa'
            className='outline-none pr-3 mr-2 max-h-[90px] overflow-y-scroll scrollbar-transparent hover:scrollbar'
            ref={inputRef}
          />
        </div>
        <Tippy content='Send Message'>
          <div className='bg-blue-300 mx-5 px-3.5 py-2 rounded cursor-pointer'>
            <img src={SendIcon} alt='Send' className='w-5 h-5' />
          </div>
        </Tippy>
      </div>
    </>
  );
};

export default ChatSection;
