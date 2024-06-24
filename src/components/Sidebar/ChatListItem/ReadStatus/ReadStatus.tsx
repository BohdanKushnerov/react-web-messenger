import { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@zustand/store';

import useIsReadMyLastMessage from '@hooks/useIsReadMyLastMessage';

import { IReadStatusProps } from '@interfaces/IReadStatusProps';

import { IconId } from '@enums/iconsSpriteId';


const ReadStatus: FC<IReadStatusProps> = ({ senderUserID, itemChatUID }) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const { uid } = useChatStore(state => state.currentUser);

  const isReadMyLastMessage = useIsReadMyLastMessage(itemChatUID);

  return (
    <>
      {senderUserID === uid &&
        (isReadMyLastMessage ? (
          <SvgIcon
            className={`${
              chatUID === itemChatUID
                ? 'fill-white'
                : 'fill-ultraDarkZinc dark:fill-white'
            }`}
            iconId={IconId.IconDoubleCheck}
            size={48}
          />
        ) : (
          <SvgIcon
            className={`${
              chatUID === itemChatUID
                ? 'fill-white'
                : 'fill-ultraDarkZinc dark:fill-white'
            } drop-shadow-2xl`}
            iconId={IconId.IconSingleCheck}
            size={48}
          />
        ))}
    </>
  );
};

export default ReadStatus;
