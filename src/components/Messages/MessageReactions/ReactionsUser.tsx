import { FC } from 'react';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import BlurImage from '@components/BlurImage/BlurImage';

import useBlurLoadingImage from '@hooks/useBlurLoadingImage';
import useChatInfo from '@hooks/useChatInfo';

import { IReactionsUserProps } from '@interfaces/IReactionsUserProps';

const ReactionsUser: FC<IReactionsUserProps> = ({ userUID }) => {
  const currentChatInfo = useChatInfo(userUID);

  const loadingImg = useBlurLoadingImage(currentChatInfo?.photoURL);

  return (
    <BlurImage loading={loadingImg}>
      <AvatarProfile
        photoURL={currentChatInfo?.photoURL}
        displayName={currentChatInfo?.displayName}
        size="20"
      />
    </BlurImage>
  );
};

export default ReactionsUser;
