import type { FC } from 'react';
import { lazy } from 'react';

import ButtonEdit from './ButtonEdit/ButtonEdit';
import ButtonSelect from './ButtonSelect/ButtonSelect';
import CopyButton from './CopyButton/CopyButton';
import DeleteButton from './DeleteButton/DeleteButton';

import useChatStore from '@store/store';

import type { GroupedMessages } from 'types/GroupedMessages';

interface IChatContextMenuProps {
  groupedMessages: GroupedMessages | null;
}

const Reactions = lazy(
  () => import('@components/ChatContextMenu/Reactions/Reactions')
);

const ChatContextMenu: FC<IChatContextMenuProps> = ({ groupedMessages }) => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );

  return (
    <>
      <Reactions />

      <div className="pointer-events-auto h-56 w-56 rounded-3xl bg-mainBlack p-2">
        {selectedDocDataMessage &&
          selectedDocDataMessage.length === 1 &&
          selectedDocDataMessage[0]?.data()?.senderUserID ===
            currentUserUID && (
            <ButtonEdit groupedMessages={groupedMessages} color="white" />
          )}

        <CopyButton white="white" dark="white" />

        <DeleteButton color="fill-white" />

        <ButtonSelect color="fill-white" />
      </div>
    </>
  );
};

export default ChatContextMenu;
