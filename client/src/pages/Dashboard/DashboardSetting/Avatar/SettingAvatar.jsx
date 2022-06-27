import { useState } from 'react';
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css';

import { PencilIcon, AvatarIcon } from 'assets/icons';
import { useLazyQuery, useMutation, useQuery } from '@apollo/client';
import { GET_CURRENT_USER, GET_SIGNED_URL } from 'queries/userQueries';
import { UPDATE_USER } from 'mutations/userMutations';
import { uploadFileToGoogleStorage } from 'utils/fileUtils';

export const SettingAvatar = () => {
  const {
    data: { currentUser },
  } = useQuery(GET_CURRENT_USER);
  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [getSignedUrl] = useLazyQuery(GET_SIGNED_URL);
  const [updateCurrentUser] = useMutation(UPDATE_USER);

  const handleUploadFile = (file) => {
    const fileNameSplit = file.name.split('.');
    const fileName = `${fileNameSplit[0]}-${file.size}.${fileNameSplit[1]}`;
    getSignedUrl({
      variables: {
        blobName: fileName,
        blobType: file.type,
      },
      onCompleted: async (data) => {
        const res = await uploadFileToGoogleStorage(file, data.signedUrl.url);
        if (res) {
          const newAvatarUrl = `https://storage.googleapis.com/messme/${fileName}`;
          updateCurrentUser({
            variables: {
              input: {
                id: currentUser.id,
                avatarUrl: newAvatarUrl,
              },
            },
            onCompleted: () => setAvatarUrl(newAvatarUrl),
          });
        }
      },
    });
  };

  return (
    <div className='p-6 pb-2 border-b-[1px] border-slate-600'>
      <p className='text-2xl font-bold'>Settings</p>
      <div className='flex flex-col items-center mb-3'>
        <div className='flex flex-row-reverse items-end mt-[27.7px]'>
          {!avatarUrl ? (
            <AvatarIcon width='130px' height='112px' />
          ) : (
            <img
              src={avatarUrl}
              alt='Avatar'
              className='w-28 h-28 rounded-full border-4 border-slate-600'
            />
          )}
          <input
            type='file'
            accept='.gif .jpg .jpeg .png'
            id='update-avatar'
            className='hidden'
            onChange={(e) => handleUploadFile(e.target.files[0])}
          />
          <Tippy content='Update Avatar'>
            <label
              htmlFor='update-avatar'
              className='absolute bg-slate-600 p-1.5 cursor-pointer rounded-full hover:bg-gray-600'
            >
              <img src={PencilIcon} alt='Pencil' className='w-5 h-5' />
            </label>
          </Tippy>
        </div>
        <p className='font-semibold mt-4'>
          {currentUser.username || currentUser.email.split('@')[0]}
        </p>
      </div>
    </div>
  );
};
