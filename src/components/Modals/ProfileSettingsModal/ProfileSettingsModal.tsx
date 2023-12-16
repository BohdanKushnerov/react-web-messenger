import { FC, RefObject, useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { v4 as uuidv4 } from 'uuid';
import { Line } from 'rc-progress';

import { auth, db, storage } from '@myfirebase/config';

import ButtonClose from '@components/Buttons/ButtonClose/ButtonClose';
import ModalWindow from '../ModalWindow/ModalWindow';
import useChatStore from '@zustand/store';
import { useTranslation } from 'react-i18next';

interface IProfileSettingsModal {
  photoProfileInputRef: RefObject<HTMLInputElement>;
  handleToggleProfilePhotoModal: () => void;
}

const ProfileSettingsModal: FC<IProfileSettingsModal> = ({
  photoProfileInputRef,
  handleToggleProfilePhotoModal,
}) => {
  const [profilePhotoUploadStatus, setProfilePhotoUploadStatus] = useState<
    number | null
  >(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'ProfileSettings',
  });

  const { uid, photoURL } = useChatStore(state => state.currentUser);
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  const handleUpdateProfilePhoto = async () => {
    if (photoProfileInputRef.current?.files && auth.currentUser && uid) {
      const file = photoProfileInputRef.current.files[0];

      if (file) {
        try {
          const metadata = {
            contentType: file.type,
          };

          const storageRef = ref(
            storage,
            `${file.type}/${uid}/${uuidv4()}-${file.name}`
          );

          const fileBlob = new Blob([file]);

          const uploadTask = uploadBytesResumable(
            storageRef,
            fileBlob,
            metadata
          );

          const profilePhotoUrlFromStorage: string = await new Promise(
            (resolve, reject) => {
              uploadTask.on(
                'state_changed',
                snapshot => {
                  const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                  setProfilePhotoUploadStatus(progress);
                },
                error => {
                  console.log('error', error);
                },
                async () => {
                  try {
                    const downloadURL = await getDownloadURL(
                      uploadTask.snapshot.ref
                    );

                    resolve(downloadURL);
                  } catch (error) {
                    console.log(
                      'profilePhotoUrlFromStorage',
                      profilePhotoUrlFromStorage
                    );
                    reject(error);
                  }
                }
              );
            }
          );

          if (photoURL) {
            const desertRef = ref(storage, photoURL);

            await deleteObject(desertRef);
          }

          await updateProfile(auth.currentUser, {
            photoURL: profilePhotoUrlFromStorage,
          })
            .then(() => {
              updateCurrentUser(auth.currentUser);
            })
            .catch(error => {
              console.log('handleUpdateProfilePhoto error', error);
              // An error occurred
            });

          // update doc user чтобы появилась ссылка в photoURL
          await updateDoc(doc(db, 'users', uid), {
            photoURL: profilePhotoUrlFromStorage,
          });

          handleToggleProfilePhotoModal();
          setProfilePhotoUploadStatus(null);
        } catch (error) {
          console.log('handleUpdateProfilePhoto error', error);
        }
      }
    }
  };

  return (
    <ModalWindow handleToggleModal={handleToggleProfilePhotoModal}>
      <div className="h-full flex justify-center items-center">
        <div className="relative w-full sm:w-1/2 xl:w-1/3 h-2/3 flex flex-col gap-6 justify-center items-center bg-gray-200 dark:bg-myBlackBcg rounded-3xl shadow-mainShadow">
          <ButtonClose handleClickButtonClose={handleToggleProfilePhotoModal} />
          {photoProfileInputRef.current?.files && (
            <img
              className="rounded-full"
              src={URL.createObjectURL(photoProfileInputRef.current?.files[0])}
              alt={photoProfileInputRef.current?.files[0].name}
              width={200}
              height={200}
            />
          )}
          <p className="w-80 text-center text-black dark:text-white text-xs">
            {t('Modal.ChangeProfilePhotoPrompt')}
          </p>
          <button
            className="w-48 border-2 rounded-3xl text-black dark:text-white border-black dark:border-white transition-all duration-300 hover:shadow-mainShadow hover:bg-zinc-400 hover:dark:bg-gray-800 disabled:text-zinc-600"
            onClick={handleUpdateProfilePhoto}
            disabled={typeof profilePhotoUploadStatus === 'number'}
          >
            {t('Modal.ChangeProfilePhoto')}
          </button>

          <div className="flex gap-4 items-center h-4">
            {typeof profilePhotoUploadStatus === 'number' && (
              <>
                <p className="text-black dark:text-white">Loading:</p>
                <Line
                  style={{ width: 150 }}
                  percent={profilePhotoUploadStatus}
                  strokeWidth={6}
                  strokeColor="#5ee987"
                  trailColor="#5f5f5f"
                />
              </>
            )}
          </div>
        </div>
      </div>
    </ModalWindow>
  );
};

export default ProfileSettingsModal;
