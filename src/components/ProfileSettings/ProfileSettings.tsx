import { useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';
import { deleteObject, ref } from 'firebase/storage';

import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import ButtonCloseModal from '@components/Buttons/ButtonCloseModal/ButtonCloseModal';
import useChatStore from '@zustand/store';
import { auth, db, storage } from '@myfirebase/config';
import uploadFileToStorage from '@utils/uploadFileToStorage';
import sprite from '@assets/sprite.svg';

function ProfileSettings() {
  const [newDisplayName, setNewDisplayName] = useState(
    () => auth.currentUser?.displayName
  );
  const [isModalPhotoProfileOpen, setIsModalPhotoProfileOpen] = useState(false);

  const photoProfileInput = useRef<HTMLInputElement>(null);

  const { uid, displayName, photoURL } = useChatStore(
    state => state.currentUser
  );
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);
  const updateSidebarScreen = useChatStore(state => state.updateSidebarScreen);

  const handleClickTurnBackToDefaultScreen = () => {
    updateSidebarScreen('default');
  };

  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };

  const handleClickChangeDisplayName = async (name: string) => {
    if (auth.currentUser && uid) {
      await updateProfile(auth.currentUser, {
        displayName: name,
      })
        .then(() => {
          console.log('Profile updated!');
          updateCurrentUser(auth.currentUser);
        })
        .catch(error => {
          // An error occurred
          console.log('handleClickChangeDisplayName error', error);
        });

      // обновить имя в клауде
      await updateDoc(doc(db, 'users', uid), {
        displayName: name,
      });
    }
  };

  const handleToggleProfilePhotoModal = () => {
    setIsModalPhotoProfileOpen(prev => !prev);
  };

  const handleChooseProfilePhoto = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length !== 0) {
      handleToggleProfilePhotoModal();
    }
  };

  const handleUpdateProfilePhoto = async () => {
    if (photoProfileInput.current?.files && auth.currentUser && uid) {
      const file = photoProfileInput.current.files[0];

      if (file && photoURL) {
        try {
          const fileBlob = new Blob([file]);
          const { name, type } = file;

          const fileUrlFromStorage = await uploadFileToStorage(
            fileBlob,
            type,
            name,
            uid
          );

          const desertRef = ref(storage, photoURL);

          await deleteObject(desertRef).then(() =>
            console.log('delete old photoURL success')
          );

          await updateProfile(auth.currentUser, {
            photoURL: fileUrlFromStorage,
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
            photoURL: fileUrlFromStorage,
          });

          handleToggleProfilePhotoModal();
        } catch (error) {
          console.log('handleUpdateProfilePhoto error', error);
        }
      }
    }
  };

  const handleImageClick = () => {
    if (photoProfileInput.current) {
      photoProfileInput.current.click();
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center w-12 h-12 text-white hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleClickTurnBackToDefaultScreen}
      >
        <svg className="rotate-180" width={24} height={24}>
          <use href={sprite + '#icon-right-arrow'} fill="rgb(170,170,170)" />
        </svg>
      </button>
      <div className="flex flex-col justify-center items-center gap-4">
        <input
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/jpeg"
          ref={photoProfileInput}
          onChange={handleChooseProfilePhoto}
        />
        {auth.currentUser?.photoURL && auth.currentUser.displayName ? (
          <div className="relative cursor-pointer" onClick={handleImageClick}>
            <img
              className="rounded-full hover:shadow-mainShadow"
              width={200}
              height={200}
              src={auth.currentUser?.photoURL}
              alt={auth.currentUser?.displayName}
            />
            <svg
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 hover:scale-105"
              width={48}
              height={48}
            >
              <use href={sprite + '#icon-photo-focus'} fill="#FFFFFF" />
            </svg>
          </div>
        ) : (
          <Avatar
            className="rounded-full"
            name={`${auth.currentUser?.displayName}`}
            size="200"
          />
        )}
        <div className="flex gap-2 justify-center items-center text-white">
          <p className="">Phone:</p>
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
              <p className="text-center text-xs">
                &#x2BB4; start change username and button will be enable
                &#x2BB5;
              </p>
            </div>
            <button
              className={`w-48 border-2 rounded-3xl ${
                displayName === newDisplayName
                  ? 'text-black border-black'
                  : 'text-white'
              } hover:shadow-mainShadow hover:bg-gray-800 cursor-pointer`}
              onClick={() => handleClickChangeDisplayName(newDisplayName)}
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
            <div className="relative w-1/3 h-1/2 flex flex-col gap-8 justify-center items-center bg-myBlackBcg rounded-3xl">
              <ButtonCloseModal
                handleCloseModal={handleToggleProfilePhotoModal}
              />
              {photoProfileInput.current?.files && (
                <img
                  className="rounded-full"
                  src={URL.createObjectURL(photoProfileInput.current?.files[0])}
                  alt={photoProfileInput.current?.files[0].name}
                  width={200}
                  height={200}
                />
              )}
              <button
                className="w-48 border-2 rounded-3xl text-white hover:shadow-mainShadow hover:bg-gray-800 cursor-pointer"
                onClick={handleUpdateProfilePhoto}
              >
                Change profile photo
              </button>
            </div>
          </div>
        </ModalWindow>
      )}
    </>
  );
}

export default ProfileSettings;
