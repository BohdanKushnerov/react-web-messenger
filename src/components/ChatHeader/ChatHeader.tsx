import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import useChatStore from '@zustand/store';
import useIsOnlineStatus from '@hooks/useIsOnlineStatus';
import useChatInfo from '@hooks/useChatInfo';
import useShowTyping from '@hooks/useShowTyping';
import { IChatHeaderProps } from '@interfaces/IChatHeaderProps';
import sprite from '@assets/sprite.svg';

const ChatHeader = ({
  setScreen,
  handleClickBackToSidebarScreen,
  setIsShowSearchMessages,
}: IChatHeaderProps) => {
  const userUID = useChatStore(state => state.currentChatInfo.userUID);

  const isOpponentTyping = useShowTyping(); // тут слушатель на изменения печатает/не печатает
  const currentChatInfo = useChatInfo(userUID); // обновляет инфо о текущем юзере при монтировании нового чата
  const isOnline = useIsOnlineStatus(userUID); // следим за состоянием онлайн/офлайн

  // console.log('screen --> ChatHeader');

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
      <AvatarProfile
        photoURL={currentChatInfo?.photoURL}
        displayName={currentChatInfo?.displayName}
        size="40"
      />
      <p className="font-bold text-zinc-800 dark:text-textSecondary">
        {currentChatInfo?.displayName}
      </p>

      {isOpponentTyping ? (
        <h2 className="text-black dark:text-white">typing...</h2>
      ) : (
        <div className={`${isOnline ? 'text-green-600' : 'text-red-700'}`}>
          {isOnline ? 'Online' : 'Offline'}
        </div>
      )}

      <button className="ml-auto" onClick={handleClickShowSearchMessages}>
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
