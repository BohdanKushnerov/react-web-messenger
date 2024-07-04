import type { FC } from 'react';

import classNames from 'classnames';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import useIsReadMyLastMessage from '@hooks/sidebar/useIsReadMyLastMessage';

import { IconId } from '@enums/iconsSpriteId';

interface IReadStatusProps {
  senderUserID: string;
  itemChatUID: string | null;
}

const ReadStatus: FC<IReadStatusProps> = ({ senderUserID, itemChatUID }) => {
  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const { uid } = useChatStore(state => state.currentUser);

  const isReadMyLastMessage = useIsReadMyLastMessage(itemChatUID);

  return (
    <>
      {senderUserID === uid &&
        (isReadMyLastMessage ? (
          <SvgIcon
            className={classNames({
              'fill-white': chatUID === itemChatUID,
              'fill-ultraDarkZinc dark:fill-white': chatUID !== itemChatUID,
            })}
            iconId={IconId.IconDoubleCheck}
            size={48}
          />
        ) : (
          <SvgIcon
            className={classNames({
              'fill-white': chatUID === itemChatUID,
              'fill-ultraDarkZinc dark:fill-white': chatUID !== itemChatUID,
            })}
            iconId={IconId.IconSingleCheck}
            size={48}
          />
        ))}
    </>
  );
};

export default ReadStatus;
