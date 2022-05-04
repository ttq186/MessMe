import { Link } from 'react-router-dom';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

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
import UsersChatSection from '../components/UsersChatSection';
import ContactSection from '../components/ContactSection';
import GroupSection from '../components/GroupSection';
import ProfileSection from '../components/ProfileSection';
import SettingSection from '../components/SettingSection';

const Dashboard = () => {
  return (
    <div className='flex min-h-screen'>
      <div className='flex flex-col justify-between items-center w-[70px] py-5 bg-slate-600'>
        <Link to='/'>
          <MessMeIcon />
        </Link>
        <div className='mb-20'>
          <Tippy content='Profile'>
            <SidebarItem icon={<ProfileIcon />} isActive={false} />
          </Tippy>
          <Tippy content='Chat'>
            <SidebarItem icon={<ChatIcon fill='#93c5fd' />} isActive={true} />
          </Tippy>
          <Tippy content='Group'>
            <SidebarItem icon={<GroupIcon />} isActive={false} />
          </Tippy>
          <Tippy content='Contact'>
            <SidebarItem icon={<ContactIcon />} isActive={false} />
          </Tippy>
          <Tippy content='Setting'>
            <SidebarItem icon={<SettingIcon />} isActive={false} />
          </Tippy>
        </div>
        <div className='cursor-pointer'>
          <AvatarIcon />
        </div>
      </div>

      <div className='w-[390px] bg-gray-700 text-slate-200'>
        {/* <UsersChatSection /> */}
        {/* <ContactSection /> */}
        {/* <GroupSection /> */}
        {/* <ProfileSection /> */}
        <SettingSection />
      </div>

      <div className='flex flex-col justify-between grow bg-slate-600'>
        <ChatSection />
      </div>
    </div>
  );
};

export default Dashboard;
