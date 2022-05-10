import {
  FileIcon,
  DownloadIcon,
  OtherIcon,
  GalleryIcon,
} from '../assets/icons';
import AttachedFileDropdown from 'components/AttachedFileDropdown';

const AttachFile = () => {
  return (
    <div className='flex justify-between items-center bg-slate-600 rounded text-[13px] py-2 px-3 mb-2'>
      <div className='flex items-center'>
        <span className='bg-slate-500 p-2.5 rounded'>
          {/* <GalleryIcon fill='#a6b0cf' /> */}
          <FileIcon />
        </span>
        <div className='ml-3.5'>
          <h2 className='text-slate-200'>Admin-A.zip</h2>
          <p className='text-gray-400'>12.5MB</p>
        </div>
      </div>
      <div className='flex items-center'>
        <img
          src={DownloadIcon}
          alt='File'
          className='cursor-pointer w-5 h-5 mr-2.5'
        />
        <AttachedFileDropdown>
          <img
            src={OtherIcon}
            alt='Download'
            className='cursor-pointer w-4 h-4'
          />
        </AttachedFileDropdown>
      </div>
    </div>
  );
};

export default AttachFile;
