import { FC } from 'react';

import useChatStore from '@zustand/store';
import useIsReadMyLastMessage from '@hooks/useIsReadMyLastMessage';
import { IReadStatusProps } from '@interfaces/IReadStatusProps';
import sprite from '@assets/sprite.svg';

const ReadStatus: FC<IReadStatusProps> = ({ chatInfo }) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const { uid } = useChatStore(state => state.currentUser);

  const isReadMyLastMessage = useIsReadMyLastMessage(chatInfo);

  return (
    <>
      {chatInfo[1].senderUserID === uid &&
        (isReadMyLastMessage ? (
          <svg
            width={48}
            height={48}
            className={`${
              chatUID === chatInfo[0]
                ? 'fill-white'
                : 'fill-zinc-800 dark:fill-white'
            }`}
          >
            <use
              href={sprite + '#icon-double-check'}
              className="shadow-avatarShadow"
            />
          </svg>
        ) : (
          <svg
            width={48}
            height={48}
            className={`${
              chatUID === chatInfo[0]
                ? 'fill-white'
                : 'fill-zinc-800 dark:fill-white'
            } drop-shadow-2xl`}
          >
            <use
              href={sprite + '#icon-single-check'}
              className="drop-shadow-2xl"
            />
          </svg>
        ))}
    </>
  );
};

export default ReadStatus;
