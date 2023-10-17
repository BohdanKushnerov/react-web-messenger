import { useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

import ModalWindow from '@components/ModalWindow/ModalWindow';
import useChatStore from '@zustand/store';
import { auth, db } from '@myfirebase/config';
import uploadFileToStorage from '@utils/uploadFileToStorage';

function ProfileSettings() {
  const [newDisplayName, setNewDisplayName] = useState(
    () => auth.currentUser?.displayName
  );
  const [isModalPhotoProfileOpen, setIsModalPhotoProfileOpen] = useState(false);

  const photoProfileInput = useRef<HTMLInputElement>(null);

  const { uid } = useChatStore(state => state.currentUser);
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);
  const setSidebarScreen = useChatStore(state => state.setSidebarScreen);

  const handleClickTurnBackToDefaultScreen = () => {
    setSidebarScreen('default');
  };

  const handleChangeDisplayName = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewDisplayName(e.target.value);
  };

  const handleClickChangeDisplayName = async(name: string) => {
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

  const handleChangeProfilePhoto = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files) {
      // const fileUploaded = event.target.files[0];
      handleToggleProfilePhotoModal();
    }
  };

  const handleUpdateProfilePhoto = async () => {
    if (photoProfileInput.current?.files && auth.currentUser && uid) {
      const file = photoProfileInput.current.files[0];

      if (file) {
        const fileBlob = new Blob([file]);
        const { name, type } = file;

        const fileUrlFromStorage = await uploadFileToStorage(
          fileBlob,
          type,
          name
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
      }
    }
  };

  return (
    <>
      <button
        className="flex justify-center items-center w-12 h-12 text-white hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleClickTurnBackToDefaultScreen}
      >
        <svg
          className="rotate-180"
          fill="rgb(170,170,170)"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          width="25px"
          height="25px"
          viewBox="0 0 44.952 44.952"
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M44.952,22.108c0-1.25-0.478-2.424-1.362-3.308L30.627,5.831c-0.977-0.977-2.561-0.977-3.536,0
		c-0.978,0.977-0.976,2.568,0,3.546l10.574,10.57H2.484C1.102,19.948,0,21.081,0,22.464c0,0.003,0,0.025,0,0.028
		c0,1.382,1.102,2.523,2.484,2.523h35.182L27.094,35.579c-0.978,0.978-0.978,2.564,0,3.541c0.977,0.979,2.561,0.978,3.538-0.001
		l12.958-12.97c0.885-0.882,1.362-2.059,1.362-3.309C44.952,22.717,44.952,22.231,44.952,22.108z"
            />
          </g>
        </svg>
      </button>
      <div className="flex flex-col justify-center items-center gap-4">
        <input
          type="file"
          accept="image/png, image/jpeg"
          ref={photoProfileInput}
          onChange={handleChangeProfilePhoto}
        />
        {auth.currentUser?.photoURL && auth.currentUser.displayName ? (
          <img
            className="rounded-full"
            width={200}
            height={200}
            src={auth.currentUser?.photoURL}
            alt={auth.currentUser?.displayName}
          />
        ) : (
          <Avatar
            className="rounded-full"
            name={`${auth.currentUser?.displayName}`}
            size="200"
          />
        )}
        <div className="text-white">
          <p>{auth?.currentUser?.phoneNumber}</p>
          <p>Number</p>
        </div>
        <div className="text-white">
          {newDisplayName && (
            <>
              <input
                className="text-black"
                type="text"
                value={newDisplayName}
                onChange={handleChangeDisplayName}
              />
              <button
                onClick={() => handleClickChangeDisplayName(newDisplayName)}
              >
                Change displayName
              </button>
            </>
          )}
          {/* <p>{displayName}</p>
          <p>UserName</p> */}
        </div>
      </div>
      {isModalPhotoProfileOpen && (
        <ModalWindow handleToggleModal={handleToggleProfilePhotoModal}>
          <div className="h-full flex justify-center items-center">
            <div className="flex flex-col gap-8 bg-myBlackBcg">
              {photoProfileInput.current?.files && (
                <img
                  src={URL.createObjectURL(photoProfileInput.current?.files[0])}
                  alt={photoProfileInput.current?.files[0].name}
                  width={200}
                  height={200}
                />
              )}
              <button onClick={handleUpdateProfilePhoto}>Change photo</button>
            </div>
          </div>
        </ModalWindow>
      )}
    </>
  );
}

export default ProfileSettings;
