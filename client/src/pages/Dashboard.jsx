import { Link } from 'react-router-dom';

import SidebarItem from '../components/SidebarItem';
import ChatSection from '../components/ChatSection';
import {
  MessMeIcon,
  ChatIcon,
  AvatarIcon,
  ContactIcon,
  ProfileIcon,
  GroupIcon,
  SettingIcon,
} from '../assets/icons';

const Dashboard = () => {
  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col justify-between items-center w-[75px] py-5 bg-slate-600'>
        <Link to='/'>
          <MessMeIcon />
        </Link>
        <div className='mb-20'>
          <SidebarItem icon={<ProfileIcon />} isActive={false} />
          <SidebarItem icon={<ChatIcon fill='#93c5fd' />} isActive={true} />
          <SidebarItem icon={<GroupIcon />} isActive={false} />
          <SidebarItem icon={<ContactIcon />} isActive={false} />
          <SidebarItem icon={<SettingIcon />} isActive={false} />
        </div>
        <div className='cursor-pointer'>
          <AvatarIcon />
        </div>
      </div>

      <div className='w-[385px] bg-slate-700'></div>

      <div className='bg-slate-600 grow'>
        <ChatSection />
      </div>
    </div>
  );
};

export default Dashboard;
