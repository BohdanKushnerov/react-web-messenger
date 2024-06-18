import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import BlurImage from '@components/BlurImage/BlurImage';

import useChatStore from '@zustand/store';

import useBlurLoadingImage from '@hooks/useBlurLoadingImage';
import useChatInfo from '@hooks/useChatInfo';
import useIsOnlineStatus from '@hooks/useIsOnlineStatus';
import useShowTyping from '@hooks/useShowTyping';

import '@i18n';

const ChatHeaderOponentInfo: FC = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'General' });

  const userUID = useChatStore(state => state.currentChatInfo.userUID);

  const isOpponentTyping = useShowTyping();
  const isOponentOnline = useIsOnlineStatus(userUID);
  const currentChatInfo = useChatInfo(userUID);
  const loadingImg = useBlurLoadingImage(currentChatInfo?.photoURL);

  return (
    <>
      <BlurImage loading={loadingImg}>
        <AvatarProfile
          photoURL={currentChatInfo?.photoURL}
          displayName={currentChatInfo?.displayName}
          size="40"
        />
      </BlurImage>

      <p className="font-bold text-ultraDarkZinc dark:text-mediumZinc">
        {currentChatInfo?.displayName}
      </p>

      {isOpponentTyping ? (
        <h2 className="text-black dark:text-white">{t('Typing')}...</h2>
      ) : (
        <div
          className={`${
            isOponentOnline ? 'text-darkGreen' : 'text-veryDarkRed'
          }`}
        >
          {isOponentOnline ? t('Online') : t('Offline')}
        </div>
      )}
    </>
  );
};

export default ChatHeaderOponentInfo;
