import { FC, Suspense, lazy, useRef, useState } from 'react';
import { Transition } from 'react-transition-group';
import { useTranslation } from 'react-i18next';

import ButtonArrow from '@components/Buttons/ButtonArrow/ButtonArrow';
import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
const ProfileSettingsModal = lazy(
  () => import('@components/Modals/ProfileSettingsModal/ProfileSettingsModal')
);
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import useStartTransition from '@hooks/useStartTransition';
import handleClickChangeDisplayName from '@utils/profileSettings/handleClickChangeDisplayName';
import sprite from '@assets/sprite.svg';
import '@i18n';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

const ProfileSettings: FC = () => {
  const [newDisplayName, setNewDisplayName] = useState(
    () => auth.currentUser?.displayName
  );
  const [isModalPhotoProfileOpen, setIsModalPhotoProfileOpen] = useState(false);

  const nodeRefProfileSettings = useRef(null);
  const photoProfileInputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation('translation', { keyPrefix: 'ProfileSettings' });
  const startTransition = useStartTransition();

  const { uid, displayName } = useChatStore(state => state.currentUser);
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);
  const updateSidebarScreen = useChatStore(state => state.updateSidebarScreen);

  // console.log('screen --> ProfileSettings');

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
    <Transition
      nodeRef={nodeRefProfileSettings}
      in={startTransition}
      timeout={300}
      unmountOnExit
    >
      {state => (
        <div
          ref={nodeRefProfileSettings}
          className={`absolute top-0 left-0 w-full transform origin-top-left transition-transform 
                  ${state === 'exited' ? 'hidden' : ''}
                  ${
                    state === 'entered'
                      ? 'rotate-0 translate-x-0'
                      : 'rotate-180 -translate-x-1/2 duration-300'
                  }
                  `}
        >
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
                  <AvatarProfile
                    photoURL={auth.currentUser.photoURL}
                    displayName={auth.currentUser.displayName}
                    size="200"
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
                  {auth.currentUser && (
                    <>
                      <AvatarProfile
                        photoURL={auth.currentUser.photoURL}
                        displayName={auth.currentUser.displayName}
                        size="200"
                      />
                      <svg
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:scale-105"
                        width={48}
                        height={48}
                      >
                        <use
                          href={sprite + '#icon-photo-focus'}
                          fill="#000000"
                        />
                      </svg>
                    </>
                  )}
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
                      ? 'bg-transparent border-zinc-500 text-zinc-500'
                      : 'bg-transparent text-black border-black dark:text-white dark:border-white hover:bg-zinc-400 hover:dark:bg-gray-800 cursor-pointer'
                  } transition-all duration-300 hover:shadow-mainShadow `}
                  onClick={() =>
                    uid !== null &&
                    handleClickChangeDisplayName(
                      newDisplayName,
                      uid,
                      updateCurrentUser,
                      t
                    )
                  }
                  aria-label="Change display name"
                  disabled={displayName === newDisplayName}
                >
                  {t('ChangeName')}
                </button>
              </div>
            )}
          </div>
          {isModalPhotoProfileOpen && (
            <Suspense
              fallback={
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <LoaderUIActions size={200} />
                </div>
              }
            >
              <ProfileSettingsModal
                photoProfileInputRef={photoProfileInputRef}
                handleToggleProfilePhotoModal={handleToggleProfilePhotoModal}
              />
            </Suspense>
          )}
        </div>
      )}
    </Transition>
  );
};

export default ProfileSettings;
