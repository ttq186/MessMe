import AvatarIcon from '../assets/icons/AvatarIcon';
import SearchIcon from '../assets/icons/search.svg';
import PhoneIcon from '../assets/icons/phone.svg';
import VideoCallIcon from '../assets/icons/video-call.svg';
import ProfileIcon from '../assets/icons/profile.svg';
import OtherIcon from '../assets/icons/other.svg';

const ChatSection = () => {
  return (
    <>
      <div className='flex justify-between border-b-[1.5px] border-slate-500'>
        <div className='flex items-center p-3'>
          <AvatarIcon width='42px' height='42px' />
          <div className='font-bold'>
            <p className='ml-2 text-slate-100'>Thanh Quang</p>
            <p className='ml-2 text-xs text-green-300'>Online</p>
          </div>
        </div>
        <div className='flex justify-evenly w-80 items-center'>
          <div className='cursor-pointer'>
            <img src={SearchIcon} alt='Search' className='w-10 h-10' />
          </div>
          <div className='cursor-pointer'>
            <img src={PhoneIcon} alt='Phone' className='w-7 h-7' />
          </div>
          <div className='cursor-pointer'>
            <img src={VideoCallIcon} alt='Video Call' className='w-9 h-9' />
          </div>
          <div className='cursor-pointer'>
            <img src={ProfileIcon} alt='Profile' className='w-7 h-7' />
          </div>
          <div className='cursor-pointer'>
            <img src={OtherIcon} alt='Other' className='w-8 h-8' />
          </div>
        </div>
      </div>

      <div></div>
      <div></div>
    </>
  );
};

export default ChatSection;
