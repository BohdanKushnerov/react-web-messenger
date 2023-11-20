import { useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { Line } from 'rc-progress';
import { v4 as uuidv4 } from 'uuid';

import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import ButtonCloseModal from '@components/Buttons/ButtonCloseModal/ButtonCloseModal';
import { auth, db, storage } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';
import handleClickChangeDisplayName from '@utils/handleClickChangeDisplayName';

const ProfileSettings = () => {
  const [newDisplayName, setNewDisplayName] = useState(
    () => auth.currentUser?.displayName
  );
  const [isModalPhotoProfileOpen, setIsModalPhotoProfileOpen] = useState(false);
  const [profilePhotoUploadStatus, setProfilePhotoUploadStatus] = useState<
    number | null
  >(null);
  const photoProfileInputRef = useRef<HTMLInputElement>(null);

  const { uid, displayName, photoURL } = useChatStore(
    state => state.currentUser
  );
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);
  const updateSidebarScreen = useChatStore(state => state.updateSidebarScreen);

  console.log('screen --> ProfileSettings');

  const handleClickTurnBackToDefaultScreen = () => {
    updateSidebarScreen('default');
  };

  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };

  const handleToggleProfilePhotoModal = () => {
    setIsModalPhotoProfileOpen(prev => !prev);

    if (isModalPhotoProfileOpen && photoProfileInputRef.current) {
      photoProfileInputRef.current.value = '';
    }
  };

  const handleChooseProfilePhoto = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length !== 0) {
      handleToggleProfilePhotoModal();
    }
  };

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
                  console.log('Upload is ' + progress + '% done');

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
                    console.log('File available at', downloadURL);

                    resolve(downloadURL);
                  } catch (error) {
                    reject(error);
                  }
                }
              );
            }
          );

          if (photoURL) {
            const desertRef = ref(storage, photoURL);

            await deleteObject(desertRef).then(() =>
              console.log('delete old photoURL success')
            );
          }

          await updateProfile(auth.currentUser, {
            photoURL: profilePhotoUrlFromStorage,
          })
            .then(() => {
              console.log('photoURL updated!');
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

  const handleImageClick = () => {
    if (photoProfileInputRef.current) {
      photoProfileInputRef.current.click();
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center w-12 h-12 text-white hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleClickTurnBackToDefaultScreen}
      >
        <svg className="rotate-180 fill-zinc-600" width={24} height={24}>
          <use href={sprite + '#icon-right-arrow'} />
        </svg>
      </button>
      <div className="flex flex-col justify-center items-center gap-4">
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/jpeg"
          ref={photoProfileInputRef}
          onChange={handleChooseProfilePhoto}
        />
        <div
          className="relative group rounded-full cursor-pointer"
          onClick={handleImageClick}
        >
          {auth.currentUser?.photoURL && auth.currentUser.displayName ? (
            <>
              <img
                className="rounded-full hover:shadow-mainShadow"
                width={200}
                height={200}
                src={auth.currentUser?.photoURL}
                alt={auth.currentUser?.displayName}
              />
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-105 fill-white"
                width={48}
                height={48}
              >
                <use href={sprite + '#icon-photo-focus'} />
              </svg>
            </>
          ) : (
            <>
              <Avatar
                className="rounded-full"
                name={`${auth.currentUser?.displayName}`}
                size="200"
              />
              <svg
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105"
                width={48}
                height={48}
              >
                <use href={sprite + '#icon-photo-focus'} fill="#000000" />
              </svg>
            </>
          )}
        </div>
        <div className="flex gap-2 justify-center items-center text-white">
          <p className="text-black dark:text-white">Phone:</p>
          <p className="py-2 px-4 h-10 rounded-3xl bg-mySeacrhBcg text-white text-center cursor-default">
            {auth?.currentUser?.phoneNumber}
          </p>
        </div>
        {typeof newDisplayName === 'string' && (
          <div className="flex flex-col gap-2 justify-center items-center text-white">
            <div>
              <input
                className="py-2 px-8 h-10 w-full rounded-3xl bg-mySeacrhBcg text-white text-center outline-none border-2 border-transparent focus:border-solid focus:border-cyan-500"
                type="text"
                value={newDisplayName}
                onChange={handleChangeDisplayName}
              />
              <p className="text-center text-xs text-black dark:text-white">
                &#x2BB4; start change username and button will be enable
                &#x2BB5;
              </p>
            </div>
            <button
              className={`w-48 border-2 rounded-3xl ${
                displayName === newDisplayName
                  ? 'bg-transparent border-zinc-400 text-zinc-400'
                  : 'text-black bg-transparent border-black'
              } hover:shadow-mainShadow hover:bg-zinc-400 hover:dark:bg-gray-800 cursor-pointer`}
              onClick={() => handleClickChangeDisplayName(newDisplayName, uid)}
              disabled={displayName === newDisplayName}
            >
              Change your name
            </button>
          </div>
        )}
      </div>
      {isModalPhotoProfileOpen && (
        <ModalWindow handleToggleModal={handleToggleProfilePhotoModal}>
          <div className="h-full flex justify-center items-center">
            <div className="relative w-full sm:w-1/2 xl:w-1/3 h-2/3 flex flex-col gap-6 justify-center items-center bg-gray-200 dark:bg-myBlackBcg rounded-3xl shadow-mainShadow">
              <ButtonCloseModal
                handleCloseModal={handleToggleProfilePhotoModal}
              />
              {photoProfileInputRef.current?.files && (
                <img
                  className="rounded-full"
                  src={URL.createObjectURL(
                    photoProfileInputRef.current?.files[0]
                  )}
                  alt={photoProfileInputRef.current?.files[0].name}
                  width={200}
                  height={200}
                />
              )}
              <p className="w-80 text-center text-black dark:text-white text-xs">
                if you're happy with it click the button "Change photo profile"
                or close the window and try new photo
              </p>
              <button
                className="w-48 border-2 rounded-3xl text-black dark:text-white border-black dark:border-white hover:shadow-mainShadow hover:bg-zinc-400 hover:dark:bg-gray-800 disabled:text-zinc-600"
                onClick={handleUpdateProfilePhoto}
                disabled={typeof profilePhotoUploadStatus === 'number'}
              >
                Change profile photo
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
      )}
    </>
  );
};

export default ProfileSettings;
