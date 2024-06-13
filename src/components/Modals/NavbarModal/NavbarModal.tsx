import { FC, useRef } from 'react';
import { signOut } from 'firebase/auth';
import { useTranslation } from 'react-i18next';
import { Transition } from 'react-transition-group';

import ModalWindow from '../ModalWindow/ModalWindow';
import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import LanguageSwitcher from '@components/Sidebar/ProfileSettings/LanguageSwitcher/LanguageSwitcher';
import Theme from '@components/Sidebar/Theme/Theme';
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import useStartTransition from '@hooks/useStartTransition';
import { INavbarModalProps } from '@interfaces/INavbarModalProps';
import '@i18n';

const NavbarModal: FC<INavbarModalProps> = ({ handleToggleModal }) => {
  const startTransition = useStartTransition();
  const nodeRefNavBar = useRef(null);
  const { t } = useTranslation('translation', {
    keyPrefix: 'NavBar',
  });

  const currentUser = useChatStore(state => state.currentUser);
  const updateSidebarScreen = useChatStore(state => state.updateSidebarScreen);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  const handleSignOut = async () => {
    resetCurrentChatInfo();

    await signOut(auth);

    localStorage.removeItem('phone');
  };

  const handleSettingsClick = () => {
    updateSidebarScreen('profileSettings');
    handleToggleModal();
  };

  return (
    <Transition
      nodeRef={nodeRefNavBar}
      in={startTransition}
      timeout={300}
      unmountOnExit
    >
      {state => {
        return (
          <div ref={nodeRefNavBar}>
            <ModalWindow
              handleToggleModal={handleToggleModal}
              contentClasses={`flex items-center justify-center transform origin-top-left transition-transform ${
                state === 'exited' ? 'hidden' : ''
              }
                ${
                  state === 'entered'
                    ? 'scale-100 opacity-100'
                    : 'translate-x-4 translate-y-10 scale-0 opacity-50'
                }
                `}
            >
              <div className="absolute top-14 left-5 z-20 flex flex-col gap-2 p-2 bg-gray-200 dark:bg-myBlackBcg rounded-md shadow-mainShadow">
                <div className="flex justify-between items-center gap-1 text-black dark:text-white">
                  <AvatarProfile
                    photoURL={currentUser.photoURL}
                    displayName={currentUser.displayName}
                    size="50"
                  />
                  <p className="flex transf">{currentUser?.displayName}</p>
                  <button
                    className="px-2 py-1 border border-zinc-600 dark:border-zinc-500 rounded-full transition-all duration-300 hover:shadow-mainShadow hover:bg-zinc-400 hover:dark:bg-gray-800"
                    onClick={handleSignOut}
                    aria-label="Sign out"
                  >
                    {t('SignOut')}
                  </button>
                </div>
                <button
                  className="px-2 py-1 border border-zinc-600 dark:border-zinc-500 rounded-full text-black dark:text-white transition-all duration-300 hover:shadow-mainShadow hover:bg-zinc-400 hover:dark:bg-gray-800"
                  onClick={handleSettingsClick}
                  aria-label="Profile settings"
                >
                  {t('ProfileSettings')}
                </button>
                <Theme />
                <LanguageSwitcher />
              </div>
            </ModalWindow>
          </div>
        );
      }}
    </Transition>
  );
};

export default NavbarModal;
