import { FC } from 'react';
import ChatHeaderOponentInfo from '@components/ChatHeaderOponentInfo/ChatHeaderOponentInfo';
import { IChatHeaderProps } from '@interfaces/IChatHeaderProps';
import sprite from '@assets/sprite.svg';

const ChatHeader: FC<IChatHeaderProps> = ({
  setScreen,
  handleClickBackToSidebarScreen,
  setIsShowSearchMessages,
}) => {
  console.log('screen --> ChatHeader');

  const handleClickShowSearchMessages = () => {
    setIsShowSearchMessages(true);
  };

  return (
    <div className="absolute top-0 left-0 z-10 flex gap-4 items-center w-full h-14 px-6 bg-gray-200 dark:bg-myBlackBcg shadow-bottomShadow">
      {setScreen && (
        <button
          className="flex justify-center items-center w-12 h-12 hover:bg-hoverGray rounded-full cursor-pointer"
          onClick={handleClickBackToSidebarScreen}
        >
          <svg
            className="fill-zinc-600 dark:fill-zinc-400 rotate-180"
            width={24}
            height={24}
          >
            <use href={sprite + '#icon-right-arrow'} />
          </svg>
        </button>
      )}

      <ChatHeaderOponentInfo />

      <button
        className="ml-auto flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 rounded-full"
        onClick={handleClickShowSearchMessages}
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
