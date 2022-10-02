import { useState, useRef, useEffect } from "react";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import "emoji-mart/css/emoji-mart.css";
import { default as EmojiData } from "emoji-mart/data/facebook.json";
import { NimblePicker } from "emoji-mart";
import { useLazyQuery, useMutation, useQuery, useReactiveVar } from "@apollo/client";

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
} from "assets/icons";
import {
  MainChatMessage,
  MainChatAudioCallModal,
  MainChatVideoCallModal,
  OthersDropdown,
  SearchDropdown,
} from "pages/Dashboard/DashboardMainChat";
import { CREATE_MESSAGE, GET_MESSAGES_BY_CHANNEL } from "graphql/messages";
import { GET_CURRENT_USER, GET_ONLINE_USER_IDS } from "graphql/users";
import { activeUserChatVar, onlineUserIdsVar } from "cache";
import { CurrentUserSkeleton } from "./Skeleton/CurrentUserSkeleton";
import { MessageSkeleton } from "./Skeleton/MessageSkeleton";
import { generateMessageChannelByUsersId } from "utils";
import { updateLastMessageOfContacts } from "../Dashboard";

const ForceScrollToBottom = () => {
  const elementRef = useRef();
  useEffect(() => elementRef.current.scrollIntoView({ behavior: "smooth" }));
  return <div ref={elementRef} />;
};

export const DashboardMainChat = ({ setOpenFriendProfile }) => {
  const [isOpenEmojiPicker, setOpenEmojiPicker] = useState(false);
  const inputRef = useRef();

  const activeUserChat = useReactiveVar(activeUserChatVar);
  const onlineUserIds = useReactiveVar(onlineUserIdsVar);

  const { data: currentUserObj } = useQuery(GET_CURRENT_USER);
  const [getMessages, { data: messagesData, loading }] = useLazyQuery(
    GET_MESSAGES_BY_CHANNEL
  );
  const [createMessage] = useMutation(CREATE_MESSAGE);
  useQuery(GET_ONLINE_USER_IDS, {
    pollInterval: 5000,
    onCompleted: ({ onlineUserIds }) => onlineUserIdsVar(onlineUserIds),
  });

  const handleInputKeyUp = (event) => {
    if (event.key === "Enter" && event.shiftKey) {
      console.log("Shift Enter");
    } else {
      console.log("Enter");
    }
  };

  useEffect(() => {
    if (activeUserChat && currentUserObj) {
      getMessages({
        variables: {
          channelId: generateMessageChannelByUsersId(
            activeUserChat.id,
            currentUserObj.currentUser.id
          ),
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeUserChat, currentUserObj]);

  const toggleEmojiPicker = () => {
    setOpenEmojiPicker(!isOpenEmojiPicker);
  };

  const handleChooseIcon = (e) => {
    inputRef.current.innerText += e.native;
  };

  const handleSendMessage = () => {
    if (!inputRef.current.innerText.trim() || !activeUserChat) {
      inputRef.current.innerHTML = "";
      return;
    }
    createMessage({
      variables: {
        input: {
          content: inputRef.current.innerText,
        },
        receiverId: activeUserChat.id,
      },
      onCompleted: (data) => {
        updateLastMessageOfContacts(activeUserChat.id, data.createMessage);
      },
    });
    inputRef.current.innerHTML = "";
  };

  if (!activeUserChat)
    return (
      <div className="flex flex-col w-[40%] h-screen items-center justify-center grow bg-slate-600 text-slate-400 font-semibold">
        Let's add more friends to explore more!
      </div>
    );

  return (
    <div className="flex flex-col w-[40%] h-screen justify-between py-1 grow bg-slate-600">
      <div className="flex justify-between border-b-2 border-slate-500">
        {!currentUserObj ? (
          <CurrentUserSkeleton />
        ) : (
          <div className="flex items-center p-4">
            {!activeUserChat?.avatarUrl ? (
              <AvatarIcon width="40px" height="40px" />
            ) : (
              <img
                src={activeUserChat.avatarUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full border-2 border-slate-500"
              />
            )}
            <div className="font-bold">
              <p className="ml-2 text-slate-100 cursor-pointer">
                {activeUserChat?.username
                  ? activeUserChat.username
                  : activeUserChat?.email.split("@")[0]}
              </p>
              {onlineUserIds.includes(activeUserChat.id) ? (
                <p className="ml-2 text-xs text-green-300">Online</p>
              ) : (
                <p className="ml-2 text-xs text-red-400 opacity-90">Offline</p>
              )}
            </div>
          </div>
        )}
        <div className="flex justify-evenly w-80 items-center">
          <SearchDropdown
            triggerButton={
              <Tippy
                content={<b style={{ color: "#cbd5e1" }}>Search Message</b>}
                allowHTML={true}
              >
                <div className="cursor-pointer">
                  <img src={SearchIcon} alt="Search" className="w-9 h-9 -mb-1" />
                </div>
              </Tippy>
            }
          ></SearchDropdown>
          <MainChatAudioCallModal
            triggerButton={
              <Tippy
                content={<b style={{ color: "#cbd5e1" }}>Call</b>}
                allowHTML={true}
              >
                <div className="cursor-pointer">
                  <PhoneIcon />
                </div>
              </Tippy>
            }
          />
          <MainChatVideoCallModal
            triggerButton={
              <Tippy
                content={<b style={{ color: "#cbd5e1" }}>Video Call</b>}
                allowHTML={true}
              >
                <div className="cursor-pointer">
                  <VideoCallIcon />
                </div>
              </Tippy>
            }
          />
          <Tippy
            content={<b style={{ color: "#cbd5e1" }}>Friend's Profile</b>}
            allowHTML={true}
          >
            <div className="cursor-pointer" onClick={() => setOpenFriendProfile(true)}>
              <img src={FriendProfileIcon} alt="Profile" className="w-6 h-6" />
            </div>
          </Tippy>
          <OthersDropdown
            triggerButton={
              <Tippy
                content={<b style={{ color: "#cbd5e1" }}>Others</b>}
                allowHTML={true}
              >
                <div className="cursor-pointer -ml-1">
                  <img src={OtherIcon} alt="Other" className="w-6 h-6" />
                </div>
              </Tippy>
            }
          />
        </div>
      </div>

      {!currentUserObj || loading ? (
        <div>
          <MessageSkeleton />
          <MessageSkeleton isReverse={true} />
          <MessageSkeleton />
          <MessageSkeleton isReverse={true} />
          <MessageSkeleton />
          <MessageSkeleton isReverse={true} />
        </div>
      ) : (
        <div className="grow p-3 overflow-y-scroll scrollbar-transparent hover:scrollbar mr-[3px]">
          {/* <div className='flex items-center p-4 px-8'>
            <div className='grow border-t-[1px] border-slate-500'></div>
            <div className='mx-3 bg-slate-500 text-slate-300 font-medium text-sm px-2.5 py-0.5 rounded'>
              Today
            </div>
            <div className='grow border-t-[1px] border-slate-500'></div>
          </div> */}
          <div>
            {messagesData?.messagesByChannel.map((item) => {
              const isSender = currentUserObj?.currentUser.id === item.senderId;
              if (item.senderId === activeUserChat.id || isSender) {
                return (
                  <MainChatMessage
                    key={item._id}
                    id={item._id}
                    isSender={isSender}
                    author={isSender ? currentUserObj.currentUser : activeUserChat}
                    {...item}
                  />
                );
              }
              return <div key={item._id} />;
            })}
          </div>
          <ForceScrollToBottom />
        </div>
      )}

      <div className="relative bottom-0 w-full flex justify-between items-center px-5 py-3.5 border-t-2 border-slate-500">
        <div className="flex w-[150px] items-center">
          <Tippy
            content={<b style={{ color: "#cbd5e1" }}>Attach File</b>}
            allowHTML={true}
          >
            <div className="mx-4 cursor-pointer">
              <label htmlFor="file-input" className="cursor-pointer">
                <AttachIcon width="28px" height="28px" fill="#cbd5e1" />
              </label>
              <input id="file-input" type="file" className="hidden" />
            </div>
          </Tippy>
          <Tippy content={<b style={{ color: "#cbd5e1" }}>Images</b>} allowHTML={true}>
            <div className="mr-4 cursor-pointer">
              <label htmlFor="image-input" className="cursor-pointer">
                <GalleryIcon fill="#cbd5e1" />
              </label>
              <input id="image-input" type="file" className="hidden" />
            </div>
          </Tippy>
          <Tippy content={<b style={{ color: "#cbd5e1" }}>Emoji</b>} allowHTML={true}>
            <div className="mr-4 cursor-pointer">
              <img
                src={EmojiIcon}
                alt="Emoji"
                className="w-[30px] h-[30px]"
                onClick={toggleEmojiPicker}
              />
            </div>
          </Tippy>
          <div className="relative bg-slate-500">
            {isOpenEmojiPicker && (
              <div className="absolute -left-2 bottom-6 p-1 bg-slate-800 z-10 border border-slate-700 rounded">
                <NimblePicker
                  set="facebook"
                  data={EmojiData}
                  title="MessMe Emoji"
                  showPreview={false}
                  showSkinTones={false}
                  color="#64748b"
                  theme="dark"
                  onSelect={(e) => handleChooseIcon(e)}
                />
              </div>
            )}
          </div>
        </div>

        <div className="relative max-w-[78.5%] grow max-h-[110px] bg-slate-700 py-2.5 pl-5 text-[15px] text-slate-200 font-medium rounded-md">
          {/* <input
            className='py-2.5 px-5 w-full bg-slate-700 text-[15px] text-slate-300 font-medium rounded-md outline-none'
            placeholder='Enter Message...'
            ref={inputRef}
          /> */}
          <div
            contentEditable="true"
            placeholder="Aa"
            className="outline-none pr-3 max-h-[90px] overflow-y-scroll scrollbar-transparent hover:scrollbar"
            ref={inputRef}
            onKeyUp={(e) => handleInputKeyUp(e)}
          />
        </div>
        <Tippy
          content={<b style={{ color: "#cbd5e1" }}>Send Message</b>}
          allowHTML={true}
        >
          <div
            className={`bg-blue-300 mr-10 ml-2 py-2 rounded ${
              activeUserChat ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            tabIndex={0}
            onClick={handleSendMessage}
          >
            <img src={SendIcon} alt="Send" className="w-12 h-5" />
          </div>
        </Tippy>
      </div>
    </div>
  );
};
