import { useState } from 'react';
import { signOut } from 'firebase/auth';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';


function Navbar() {
  const [isModalOpen, setIsModelOpen] = useState(false);

  const { currentUser } = useChatStore(state => state);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  const setSidebarScreen = useChatStore(state => state.setSidebarScreen);

  const handleSignOut = async () => {
    resetCurrentChatInfo();

    const exit = await signOut(auth);
    console.log('exit', exit);
  };

  const handleToggleModal = () => {
    setIsModelOpen(prev => !prev);
  };

  const handleSettingsClick = () => {
    setSidebarScreen('profileSettings');
  };

  return (
    <>
      <div
        className="w-12 h-10 flex justify-center items-center bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleToggleModal}
      >
        <svg width={32} height={32}>
          <use href={sprite + '#icon-menu'} fill="rgb(170,170,170)" />
        </svg>
      </div>
      {isModalOpen && (
        <ModalWindow handleToggleModal={handleToggleModal}>
          <div className="absolute top-14 left-5 z-20 flex flex-col gap-2 w-56 h-96 p-2 bg-myBlackBcg rounded-md shadow-mainShadow">
            <div className="flex justify-between items-center text-white">
              {currentUser?.photoURL && currentUser?.displayName && (
                <AvatarProfile
                  photoURL={currentUser.photoURL}
                  displayName={currentUser.displayName}
                  size="50"
                />
              )}
              <p>{currentUser?.displayName}</p>
              <button
                className="p-1 border border-gray-600 rounded-full hover:shadow-mainShadow hover:bg-gray-800"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
            <button
              className="p-1 border border-gray-600 rounded-full text-white hover:shadow-mainShadow hover:bg-gray-800"
              onClick={handleSettingsClick}
            >
              Profile Settings
            </button>
          </div>
        </ModalWindow>
      )}
    </>
  );
}

export default Navbar;
