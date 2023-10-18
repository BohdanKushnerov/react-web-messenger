import { useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { doc, updateDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import useChatStore from '@zustand/store';
import { auth, db } from '@myfirebase/config';
import uploadFileToStorage from '@utils/uploadFileToStorage';

function ProfileSettings() {
  const [newDisplayName, setNewDisplayName] = useState(
    () => auth.currentUser?.displayName
  );
  const [isModalPhotoProfileOpen, setIsModalPhotoProfileOpen] = useState(false);

  const photoProfileInput = useRef<HTMLInputElement>(null);

  const { uid, displayName } = useChatStore(state => state.currentUser);
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);
  const setSidebarScreen = useChatStore(state => state.setSidebarScreen);

  const handleClickTurnBackToDefaultScreen = () => {
    setSidebarScreen('default');
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
          style={{ display: 'none' }}
          type="file"
          accept="image/png, image/jpeg"
          ref={photoProfileInput}
          onChange={handleChangeProfilePhoto}
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
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2  hover:scale-105"
              width="50px"
              height="50px"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 4C23 2.34315 21.6569 1 20 1H16C15.4477 1 15 1.44772 15 2C15 2.55228 15.4477 3 16 3H20C20.5523 3 21 3.44772 21 4V8C21 8.55228 21.4477 9 22 9C22.5523 9 23 8.55228 23 8V4Z"
                fill="#FFFFFF"
              />
              <path
                d="M23 16C23 15.4477 22.5523 15 22 15C21.4477 15 21 15.4477 21 16V20C21 20.5523 20.5523 21 20 21H16C15.4477 21 15 21.4477 15 22C15 22.5523 15.4477 23 16 23H20C21.6569 23 23 21.6569 23 20V16Z"
                fill="#FFFFFF"
              />
              <path
                d="M8 21H4C3.44772 21 3 20.5523 3 20V16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16V20C1 21.6569 2.34315 23 4 23H8C8.55228 23 9 22.5523 9 22C9 21.4477 8.55228 21 8 21Z"
                fill="#FFFFFF"
              />
              <path
                d="M1 8C1 8.55228 1.44772 9 2 9C2.55228 9 3 8.55228 3 8V4C3 3.44772 3.44772 3 4 3H8C8.55228 3 9 2.55228 9 2C9 1.44772 8.55228 1 8 1H4C2.34315 1 1 2.34315 1 4V8Z"
                fill="#FFFFFF"
              />
              <path
                d="M11 9C11 8.44771 11.4477 8 12 8C12.5523 8 13 8.44771 13 9V11H15C15.5523 11 16 11.4477 16 12C16 12.5523 15.5523 13 15 13H13V15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V13H9C8.44771 13 8 12.5523 8 12C8 11.4477 8.44771 11 9 11H11V9Z"
                fill="#FFFFFF"
              />
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
              } hover:shadow-mainShadow cursor-pointer`}
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
              <button
                className="absolute top-2 left-2 hover:bg-hoverGray cursor-pointer"
                onClick={handleToggleProfilePhotoModal}
              >
                <svg
                  fill="#000000"
                  height="25px"
                  width="25px"
                  version="1.1"
                  id="Layer_1"
                  xmlns="http://www.w3.org/2000/svg"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  viewBox="0 0 512 512"
                  xmlSpace="preserve"
                >
                  <g>
                    <g>
                      <polygon
                        points="512,59.076 452.922,0 256,196.922 59.076,0 0,59.076 196.922,256 0,452.922 59.076,512 256,315.076 452.922,512 
			512,452.922 315.076,256 		"
                      />
                    </g>
                  </g>
                </svg>
              </button>
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
                className="w-48 border-2 rounded-3xl text-white hover:shadow-mainShadow cursor-pointer"
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
