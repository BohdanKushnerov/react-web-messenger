import { FC } from 'react';

import CopyButton from './CopyButton/CopyButton';
import DeleteButton from './DeleteButton/DeleteButton';
import ButtonSelect from './ButtonSelect/ButtonSelect';
import ButtonEdit from './ButtonEdit/ButtonEdit';
import useChatStore from '@zustand/store';
import { IGroupedMessages } from '@interfaces/IGroupedMessages';

interface IChatContextMenuProps {
  groupedMessages: IGroupedMessages | null;
}

const ChatContextMenu: FC<IChatContextMenuProps> = ({ groupedMessages }) => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );

  return (
    <>
      {!isSelectedMessages && selectedDocDataMessage && (
        <div
          className={`w-56 h-56 p-2 bg-myBlackBcg rounded-3xl pointer-events-auto ${
            isSelectedMessages && 'hidden'
          }`}
        >
          {selectedDocDataMessage.length === 1 &&
            selectedDocDataMessage[0]?.data()?.senderUserID ===
              currentUserUID && (
              <ButtonEdit groupedMessages={groupedMessages} color="white" />
            )}

          <CopyButton white="white" dark="white" />

          <DeleteButton color="white" />

          <ButtonSelect color="white" />
        </div>
      )}
    </>
  );
};

export default ChatContextMenu;
