import { FC } from 'react';

import AvatarProfile from '@components/AvatarProfile/AvatarProfile';
import useChatInfo from '@hooks/useChatInfo';

interface IReactionsUserProps {
  userUID: string;
}

const ReactionsUser: FC<IReactionsUserProps> = ({ userUID }) => {
  const currentChatInfo = useChatInfo(userUID);

  return (
    <AvatarProfile
      photoURL={currentChatInfo?.photoURL}
      displayName={currentChatInfo?.displayName}
      size="20"
    />
  );
};

export default ReactionsUser;
