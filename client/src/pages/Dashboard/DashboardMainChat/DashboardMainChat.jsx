import { useState, useRef, useEffect } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';
import 'emoji-mart/css/emoji-mart.css';
import { default as EmojiData } from 'emoji-mart/data/facebook.json';
import { NimblePicker } from 'emoji-mart';
import {
  useLazyQuery,
  useMutation,
  useQuery,
  useReactiveVar,
} from '@apollo/client';

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
} from 'assets/icons';
import {
  MainChatMessage,
  MainChatAudioCallModal,
  MainChatVideoCallModal,
  OthersDropdown,
  SearchDropdown,
} from 'pages/Dashboard/DashboardMainChat';
import {
  CREATE_MESSAGE,
  GET_MESSAGES_BY_SENDER_AND_RECEIVER,
  SUBSCRIBE_MESSAGE,
} from 'graphql/messages';
import { GET_CURRENT_USER } from 'graphql/users';
import { activeUserChatVar } from 'cache';
import { CurrentUserSkeleton } from './Skeleton/CurrentUserSkeleton';
import { MessageSkeleton } from './Skeleton/MessageSkeleton';

export const DashboardMainChat = ({ setOpenFriendProfile }) => {
  const [isOpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const inputRef = useRef();
  const activeUserChat = useReactiveVar(activeUserChatVar);

  const [getMessages, { subscribeToMore, data: messagesData }] = useLazyQuery(
    GET_MESSAGES_BY_SENDER_AND_RECEIVER
  );
  const [createMessage] = useMutation(CREATE_MESSAGE);
  const { data: currentUserObj } = useQuery(GET_CURRENT_USER);

  useEffect(() => {
    if (activeUserChat) {
      getMessages({
        variables: {
          receiverId: activeUserChat.id,
          senderId: currentUserObj.currentUser.id,
        },
      });

      subscribeToMore({
        document: SUBSCRIBE_MESSAGE,
        variables: {
          senderId: currentUserObj.currentUser.id,
          receiverId: activeUserChat.id,
        },
        updateQuery: (prev, { subscriptionData }) => {
          if (!subscriptionData) return prev;
          return {
            messagesBySenderAndReceiver: [
              ...prev.messagesBySenderAndReceiver,
              subscriptionData.data.message,
            ],
          };
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUserChat]);

  const toggleEmojiPicker = () => {
    setOpenEmojiPicker(!isOpenEmojiPicker);
  };

  const handleChooseIcon = (e) => {
    inputRef.current.innerText += e.native;
  };

  const handleSendMessage = () => {
    if (!inputRef.current.innerText.trim() || !activeUserChat) {
      inputRef.current.innerHTML = '';
      return;
    }
    createMessage({
      variables: {
        input: {
          content: inputRef.current.innerText,
        },
        receiverId: activeUserChat.id,
      },
    });
    inputRef.current.innerHTML = '';
  };

  return (
    <div className='flex flex-col w-[40%] h-screen justify-between py-1 grow bg-slate-600'>
      <div className='flex justify-between border-b-2 border-slate-500'>
        {!currentUserObj ? (
          <CurrentUserSkeleton />
        ) : (
          <div className='flex items-center p-4'>
            {!activeUserChat?.avatarUrl ? (
              <AvatarIcon width='40px' height='40px' />
            ) : (
              <img
                src={activeUserChat.avatarUrl}
                alt='Profile'
                className='w-10 h-10 rounded-full border-2 border-slate-500'
              />
            )}
            <div className='font-bold'>
              <p className='ml-2 text-slate-100 cursor-pointer'>
                {activeUserChat?.username
                  ? activeUserChat.username
                  : activeUserChat?.email.split('@')[0]}
              </p>
              <p className='ml-2 text-xs text-green-300'>Online</p>
            </div>
          </div>
        )}
        <div className='flex justify-evenly w-80 items-center'>
          <SearchDropdown
            triggerButton={
              <Tippy
                content={<b style={{ color: '#cbd5e1' }}>Search Message</b>}
                allowHTML={true}
              >
                <div className='cursor-pointer'>
                  <img src={SearchIcon} alt='Search' className='w-9 h-9' />
                </div>
              </Tippy>
            }
          ></SearchDropdown>
          <MainChatAudioCallModal
            triggerButton={
              <Tippy
                content={<b style={{ color: '#cbd5e1' }}>Call</b>}
                allowHTML={true}
              >
                <div className='cursor-pointer'>
                  <PhoneIcon />
                </div>
              </Tippy>
            }
          />
          <MainChatVideoCallModal
            triggerButton={
              <Tippy
                content={<b style={{ color: '#cbd5e1' }}>Video Call</b>}
                allowHTML={true}
              >
                <div className='cursor-pointer'>
                  <VideoCallIcon />
                </div>
              </Tippy>
            }
          />
          <Tippy
            content={<b style={{ color: '#cbd5e1' }}>Friend's Profile</b>}
            allowHTML={true}
          >
            <div
              className='cursor-pointer'
              onClick={() => setOpenFriendProfile(true)}
            >
              <img src={FriendProfileIcon} alt='Profile' className='w-6 h-6' />
            </div>
          </Tippy>
          <OthersDropdown
            triggerButton={
              <Tippy
                content={<b style={{ color: '#cbd5e1' }}>Others</b>}
                allowHTML={true}
              >
                <div className='cursor-pointer -ml-1'>
                  <img src={OtherIcon} alt='Other' className='w-6 h-6' />
                </div>
              </Tippy>
            }
          />
        </div>
      </div>

      {!currentUserObj ? (
        <div>
          <MessageSkeleton />
          <MessageSkeleton isReverse={true} />
          <MessageSkeleton />
          <MessageSkeleton isReverse={true} />
          <MessageSkeleton />
          <MessageSkeleton isReverse={true} />
        </div>
      ) : (
        <div className='p-2 overflow-y-scroll scrollbar-transparent hover:scrollbar mr-[2px]'>
          <div className='flex items-center p-4 px-8'>
            <div className='grow border-t-[1px] border-slate-500'></div>
            <div className='mx-3 bg-slate-500 text-slate-300 font-medium text-sm px-2.5 py-0.5 rounded'>
              Today
            </div>
            <div className='grow border-t-[1px] border-slate-500'></div>
          </div>
          <div className=''>
            {messagesData?.messagesBySenderAndReceiver.map((item) => (
              <MainChatMessage
                key={item._id}
                isSender={activeUserChat.id !== item.senderId}
                author={
                  currentUserObj?.currentUser.id === item.senderId
                    ? currentUserObj.currentUser
                    : activeUserChat
                }
                {...item}
              />
            ))}
          </div>
        </div>
      )}

      <div className='relative bottom-0 w-full flex justify-between items-center px-5 py-3.5 border-t-2 border-slate-500'>
        <div className='flex items-center'>
          <Tippy
            content={<b style={{ color: '#cbd5e1' }}>Attach File</b>}
            allowHTML={true}
          >
            <div className='mx-4 cursor-pointer'>
              <label htmlFor='file-input' className='cursor-pointer'>
                <AttachIcon width='28px' height='28px' fill='#cbd5e1' />
              </label>
              <input id='file-input' type='file' className='hidden' />
            </div>
          </Tippy>
          <Tippy
            content={<b style={{ color: '#cbd5e1' }}>Images</b>}
            allowHTML={true}
          >
            <div className='mr-4 cursor-pointer'>
              <label htmlFor='image-input' className='cursor-pointer'>
                <GalleryIcon fill='#cbd5e1' />
              </label>
              <input id='image-input' type='file' className='hidden' />
            </div>
          </Tippy>
          <Tippy
            content={<b style={{ color: '#cbd5e1' }}>Emoji</b>}
            allowHTML={true}
          >
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
              <div className='absolute -left-2 bottom-6 p-1 bg-slate-800 z-10 border border-slate-700 rounded'>
                <NimblePicker
                  set='facebook'
                  data={EmojiData}
                  title='MessMe Emoji'
                  showPreview={false}
                  showSkinTones={false}
                  color='#64748b'
                  theme='dark'
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
            contentEditable='true'
            ref={inputRef}
          /> */}
          <div
            contentEditable='true'
            placeholder='Aa'
            className='outline-none pr-3 mr-2 max-h-[90px] overflow-y-scroll scrollbar-transparent hover:scrollbar'
            ref={inputRef}
          />
        </div>
        <Tippy
          content={<b style={{ color: '#cbd5e1' }}>Send Message</b>}
          allowHTML={true}
        >
          <div
            className={`bg-blue-300 mx-5 px-3.5 py-2 rounded ${
              activeUserChat ? 'cursor-pointer' : 'cursor-not-allowed'
            }`}
            tabIndex={0}
            onClick={handleSendMessage}
          >
            <img src={SendIcon} alt='Send' className='w-5 h-5' />
          </div>
        </Tippy>
      </div>
    </div>
  );
};
