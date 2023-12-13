import { FC, useEffect, useState } from 'react';

import ChatHeaderOponentInfo from '@components/ChatHeaderOponentInfo/ChatHeaderOponentInfo';
import ButtonArrow from '@components/Buttons/ButtonArrow/ButtonArrow';
import { IChatHeaderProps } from '@interfaces/IChatHeaderProps';
import sprite from '@assets/sprite.svg';
import { useNavigate } from 'react-router-dom';
import useChatStore from '@zustand/store';

const ChatHeader: FC<IChatHeaderProps> = ({ setIsShowSearchMessages }) => {
  const [isMobileScreen, setIsMobileScreen] = useState(false);
  const navigate = useNavigate();

  const resetCurrentChatInfo = useChatStore(
    state => state.resetCurrentChatInfo
  );

  console.log('screen --> ChatHeader');

  // resize window
  useEffect(() => {
    const handleResize = () => {
      setIsMobileScreen(window.innerWidth <= 640);
    };

    window.addEventListener('resize', handleResize);

    setIsMobileScreen(window.innerWidth <= 640);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleClickShowSearchMessages = () => {
    setIsShowSearchMessages(true);
  };

  const handleClickNavigateToSidebarScreen = () => {
    resetCurrentChatInfo();
    navigate('/');
  };

  return (
    <div className="absolute top-0 left-0 z-10 flex gap-4 items-center w-full h-14 px-6 bg-gray-200 dark:bg-myBlackBcg shadow-bottomShadow">
      {isMobileScreen && (
        <ButtonArrow
          handleClickButtonArrow={handleClickNavigateToSidebarScreen}
        />
      )}

      <ChatHeaderOponentInfo />

      <button
        className="ml-auto flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 rounded-full"
        onClick={handleClickShowSearchMessages}
        aria-label="Search messages"
      >
        <svg
          className="fill-zinc-600 dark:fill-zinc-400"
          width={24}
          height={24}
        >
          <use href={sprite + '#icon-search'} />
        </svg>
      </button>
    </div>
  );
};

export default ChatHeader;
