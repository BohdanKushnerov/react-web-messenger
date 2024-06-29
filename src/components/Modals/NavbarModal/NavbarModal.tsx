import type { FC } from 'react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { signOut } from 'firebase/auth';

import ModalWindow from '../ModalWindow/ModalWindow';

import * as serviceWorker from '@serviceWorker/serviceWorker.js';

import LanguageSwitcher from '@components/Sidebar/LanguageSwitcher/LanguageSwitcher';
import Theme from '@components/Sidebar/Theme/Theme';
import AvatarProfile from '@components/common/AvatarProfile/AvatarProfile';
import BlurImage from '@components/common/BlurImage/BlurImage';
import TransitionComponent from '@components/common/TransitionComponent/TransitionComponent';

import { auth } from '@myfirebase/config';

import useChatStore from '@store/store';

import useBlurLoadingImage from '@hooks/useBlurLoadingImage';
import useStartTransition from '@hooks/useStartTransition';

import type { INavbarModalProps } from '@interfaces/INavbarModalProps';

import { defaultNS } from '@i18n/i18n';

const NavbarModal: FC<INavbarModalProps> = ({ handleToggleModal }) => {
  const nodeRefNavBar = useRef(null);

  const { t } = useTranslation(defaultNS, {
    keyPrefix: 'NavBar',
  });

  const currentUser = useChatStore(state => state.currentUser);
  const updateSidebarScreen = useChatStore(state => state.updateSidebarScreen);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  const startTransition = useStartTransition();
  const loadingImg = useBlurLoadingImage(currentUser.photoURL);

  const handleSignOut = async () => {
    resetCurrentChatInfo();

    await signOut(auth);

    localStorage.removeItem('phone');
    serviceWorker.unregister();
  };

  const handleSettingsClick = () => {
    updateSidebarScreen('profileSettings');
    handleToggleModal();
  };

  return (
    <ModalWindow handleToggleModal={handleToggleModal}>
      <TransitionComponent
        className="flex origin-top-left transform items-center justify-center"
        nodeRef={nodeRefNavBar}
        exitedBehavior="hidden"
        enteredBehavior="opacity"
        condition={startTransition}
        timeout={100}
      >
        <div className="absolute left-5 top-14 z-20 flex flex-col gap-2 rounded-md bg-main p-2 shadow-mainShadow dark:bg-mainBlack">
          <div className="flex items-center justify-between gap-1 text-black dark:text-white">
            <BlurImage loading={loadingImg}>
              <AvatarProfile
                photoURL={currentUser.photoURL}
                displayName={currentUser.displayName}
                size="50"
              />
            </BlurImage>

            <p className="transf flex">{currentUser?.displayName}</p>
            <button
              className="rounded-full border border-darkZinc px-2 py-1 transition-all duration-300 hover:bg-mediumZinc hover:shadow-mainShadow dark:border-darkZinc hover:dark:bg-extraDarkGray"
              type="button"
              onClick={handleSignOut}
              aria-label="Sign out"
            >
              {t('SignOut')}
            </button>
          </div>
          <button
            className="rounded-full border border-darkZinc px-2 py-1 text-black transition-all duration-300 hover:bg-mediumZinc hover:shadow-mainShadow dark:border-darkZinc dark:text-white hover:dark:border-white hover:dark:bg-extraDarkGray"
            type="button"
            onClick={handleSettingsClick}
            aria-label="Profile settings"
          >
            {t('ProfileSettings')}
          </button>
          <Theme />
          <LanguageSwitcher />
        </div>
      </TransitionComponent>
    </ModalWindow>
  );
};

export default NavbarModal;
