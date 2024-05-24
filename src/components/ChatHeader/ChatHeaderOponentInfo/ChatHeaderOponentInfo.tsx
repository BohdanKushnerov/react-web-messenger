import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import useChatStore from '@zustand/store';
import useChatInfo from '@hooks/useChatInfo';
import useIsOnlineStatus from '@hooks/useIsOnlineStatus';
import useShowTyping from '@hooks/useShowTyping';
import '@i18n';

const ChatHeaderOponentInfo: FC = () => {
  const { t } = useTranslation();

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
      <p className="font-bold text-zinc-800 dark:text-zinc-400">
        {currentChatInfo?.displayName}
      </p>
      {isOpponentTyping ? (
        <h2 className="text-black dark:text-white">{t('Typing')}...</h2>
      ) : (
        <div className={`${isOnline ? 'text-green-600' : 'text-red-700'}`}>
          {isOnline ? t('Online') : t('Offline')}
        </div>
      )}
    </>
  );
};

export default ChatHeaderOponentInfo;
