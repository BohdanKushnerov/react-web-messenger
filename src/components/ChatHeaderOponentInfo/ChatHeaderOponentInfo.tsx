import { FC } from 'react';
import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import useChatInfo from '@hooks/useChatInfo';
import useIsOnlineStatus from '@hooks/useIsOnlineStatus';
import useShowTyping from '@hooks/useShowTyping';
import useChatStore from '@zustand/store';

const ChatHeaderOponentInfo: FC = () => {
  const userUID = useChatStore(state => state.currentChatInfo.userUID);

  const isOpponentTyping = useShowTyping(); // тут слушатель на изменения печатает/не печатает
  const currentChatInfo = useChatInfo(userUID); // обновляет инфо о текущем юзере при монтировании нового чата
  const isOnline = useIsOnlineStatus(userUID); // следим за состоянием онлайн/офлайн

  // console.log('screen --> ChatHeaderOponentInfo');

  return (
    <>
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
    </>
  );
};

export default ChatHeaderOponentInfo;
