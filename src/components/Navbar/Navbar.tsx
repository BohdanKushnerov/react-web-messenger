import { useState, useEffect } from 'react';
import { signOut } from 'firebase/auth';

import { auth } from '@myfirebase/config';
import useChatStore from '@zustand/store';

function Navbar() {
  const [isModalOpen, setIsModelOpen] = useState(false);

  const { currentUser } = useChatStore(state => state);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        toggleModal();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleSignOut = async () => {
    const exit = await signOut(auth);
    console.log('exit', exit);
  };

  const toggleModal = () => {
    setIsModelOpen(prev => !prev);
  };

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    console.log(e);
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return (
    <>
      <div
        className="w-12 h-10 flex justify-center items-center bg-transparent hover:bg-hoverGray rounded-full cursor-pointer"
        onClick={toggleModal}
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
        <div
          onClick={handleBackdropClick}
          className="absolute top-0 left-0 z-10 w-screen h-screen bg-transparent"
        >
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
        </div>
      )}
    </>
  );
}

export default Navbar;
