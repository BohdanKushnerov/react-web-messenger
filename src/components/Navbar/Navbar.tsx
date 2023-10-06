import { useState } from 'react';
import { signOut } from 'firebase/auth';

import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';
import ModalWindow from '@components/ModalWindow/ModalWindow';

function Navbar() {
  const [isModalOpen, setIsModelOpen] = useState(false);

  const { currentUser } = useChatStore(state => state);
  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  const handleSignOut = async () => {
    resetCurrentChatInfo();

    const exit = await signOut(auth);
    console.log('exit', exit);
  };

  const handleToggleModal = () => {
    setIsModelOpen(prev => !prev);
  };

  return (
    <>
      <div
        className="w-12 h-10 flex justify-center items-center bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={handleToggleModal}
      >
        <svg
          width="25"
          height="25"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 18L20 18"
            stroke="rgb(170,170,170)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 12L20 12"
            stroke="rgb(170,170,170)"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <path
            d="M4 6L20 6"
            stroke="rgb(170,170,170)"
            strokeWidth="2"
            strokeLinecap="round"
          />
        </svg>
      </div>
      {isModalOpen && (
        <ModalWindow handleToggleModal={handleToggleModal}>
          <div className="absolute top-14 left-5 z-20 w-56 h-96 p-2 bg-myBlackBcg rounded-md shadow-mainShadow">
            <div className="flex justify-between items-center text-white">
              <p>{currentUser?.displayName}</p>
              <button
                className="p-1 border border-gray-600 rounded-full hover:shadow-mainShadow hover:bg-gray-800"
                onClick={handleSignOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </ModalWindow>
      )}
    </>
  );
}

export default Navbar;
