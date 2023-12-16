import { FC, Suspense, lazy, useRef, useState } from 'react';
import Avatar from 'react-avatar';
import { useTranslation } from 'react-i18next';

import ButtonArrow from '@components/Buttons/ButtonArrow/ButtonArrow';
const ProfileSettingsModal = lazy(
  () => import('@components/Modals/ProfileSettingsModal/ProfileSettingsModal')
);
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import handleClickChangeDisplayName from '@utils/handleClickChangeDisplayName';
import sprite from '@assets/sprite.svg';
import '@i18n';

const ProfileSettings: FC = () => {
  const [newDisplayName, setNewDisplayName] = useState(
    () => auth.currentUser?.displayName
  );
  const [isModalPhotoProfileOpen, setIsModalPhotoProfileOpen] = useState(false);

  const photoProfileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('translation', { keyPrefix: 'ProfileSettings' });

  const { uid, displayName } = useChatStore(state => state.currentUser);
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

  const handleImageClick = () => {
    if (photoProfileInputRef.current) {
      photoProfileInputRef.current.click();
    }
  };

  return (
    <>
      <ButtonArrow
        handleClickButtonArrow={handleClickTurnBackToDefaultScreen}
      />
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
          <p className="text-black dark:text-white">{t('Phone')}</p>
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
                &#x2BB4; {t('ChangeNameNotify')}
                &#x2BB5;
              </p>
            </div>
            <button
              className={`w-48 border-2 rounded-3xl ${
                displayName === newDisplayName
                  ? 'bg-transparent border-zinc-400 text-zinc-400'
                  : 'text-black bg-transparent border-black'
              } hover:shadow-mainShadow hover:bg-zinc-400 hover:dark:bg-gray-800 cursor-pointer`}
              onClick={() =>
                uid !== null &&
                handleClickChangeDisplayName(
                  newDisplayName,
                  uid,
                  updateCurrentUser
                )
              }
              disabled={displayName === newDisplayName}
            >
              {t('ChangeName')}
            </button>
          </div>
        )}
      </div>
      {isModalPhotoProfileOpen && (
        <Suspense>
          <ProfileSettingsModal
            photoProfileInputRef={photoProfileInputRef}
            handleToggleProfilePhotoModal={handleToggleProfilePhotoModal}
          />
        </Suspense>
      )}
    </>
  );
};

export default ProfileSettings;
