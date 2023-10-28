import { useRef, useState } from 'react';
import { signOut } from 'firebase/auth';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import ModalWindow from '@components/Modals/ModalWindow/ModalWindow';
import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';
import { Transition } from 'react-transition-group';

function Navbar() {
  const [isModalOpen, setIsModelOpen] = useState(false);
  const nodeRefNavBar = useRef(null);

  const { currentUser } = useChatStore(state => state);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );
  const updateSidebarScreen = useChatStore(state => state.updateSidebarScreen);

  const handleSignOut = async () => {
    resetCurrentChatInfo();

    const exit = await signOut(auth);
    console.log('exit', exit);
  };

  const handleToggleModal = () => {
    setIsModelOpen(prev => !prev);
  };

  const handleSettingsClick = () => {
    updateSidebarScreen('profileSettings');
  };

  return (
    <div>
      <div
        className="w-12 h-10 flex justify-center items-center bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleToggleModal}
      >
        <svg width={32} height={32}>
          <use href={sprite + '#icon-menu'} fill="rgb(170,170,170)" />
        </svg>
      </div>
      <Transition
        nodeRef={nodeRefNavBar}
        in={isModalOpen}
        timeout={500}
        unmountOnExit
      >
        {state => {
          // console.log('state', state);
          return (
            <div ref={nodeRefNavBar}>
              <ModalWindow
                handleToggleModal={handleToggleModal}
                contentClasses={`transform origin-top-left transition-transform ${
                  state === 'exited' ? 'hidden' : ''
                } 
                ${
                  state === 'entered'
                    ? 'scale-100 opacity-100'
                    : 'translate-x-4 translate-y-10 scale-0 opacity-50'
                }
                `}
              >
                <div className="absolute top-14 left-5 z-20 flex flex-col gap-2 p-2 bg-myBlackBcg rounded-md shadow-mainShadow">
                  <div className="flex justify-between items-center gap-1 text-white">
                    {currentUser?.photoURL && currentUser?.displayName && (
                      <AvatarProfile
                        photoURL={currentUser.photoURL}
                        displayName={currentUser.displayName}
                        size="50"
                      />
                    )}
                    <p className="flex transf">{currentUser?.displayName}</p>
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
            </div>
          );
        }}
      </Transition>
    </div>
  );
}

export default Navbar;
