import { AttachIcon, ProfileIcon } from 'assets/icons';
import { Disclosure } from 'components/Disclosure';
import { ProfileAttachFile } from 'pages/Dashboard/DashboardProfile';

export const ProfileDisclosure = () => {
  return (
    <>
      <Disclosure
        icon={<ProfileIcon width='23px' height='23px' />}
        title='About'
      >
        <div className='px-1'>
          <div className='mb-3'>
            <h2 className='text-gray-700 font-bold text-[15px]'>Name</h2>
            <p className='ml-2'>Thanh Quang</p>
          </div>
          <div className='mb-3'>
            <h2 className='text-gray-700 font-bold text-[15px]'>Email</h2>
            <p className='ml-2'>tt.quang.186@gmail.com</p>
          </div>
          <div className='mb-3'>
            <h2 className='text-gray-700 font-bold text-[15px]'>
              Phone Number
            </h2>
            <p className='ml-2'>082-186-2002</p>
          </div>
          <div className='mb-1'>
            <h2 className='text-gray-700 font-bold text-[15px]'>Location</h2>
            <p className='ml-2'>TP.Pleiku, VietNam</p>
          </div>
        </div>
      </Disclosure>

      <Disclosure
        icon={<AttachIcon width='23px' height='23px' />}
        title='Attached Files'
      >
        <ProfileAttachFile />
        <ProfileAttachFile />
        <ProfileAttachFile />
        <ProfileAttachFile />
        <ProfileAttachFile />
      </Disclosure>
    </>
  );
};
