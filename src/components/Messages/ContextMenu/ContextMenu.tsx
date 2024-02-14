import { FC } from 'react';
import { DocumentData } from 'firebase/firestore';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import { textFromSelectedMsgs } from '../MessageList/utils/textFromSelectedMsgs';
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';
import { handleDeleteMessage } from '../MessageList/utils/handleDeleteMessage';
import { IGroupedMessages } from '@interfaces/IGroupedMessages';

interface IContextMenuProps {
  groupedMessages: IGroupedMessages | null;
  handleCloseModal: (e?: React.MouseEvent<HTMLDivElement>) => void;
}

const ContextMenu: FC<IContextMenuProps> = ({
  groupedMessages,
  handleCloseModal,
}) => {
  const { t } = useTranslation();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const updateEditingMessage = useChatStore(
    state => state.updateEditingMessage
  );

  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);
  const updateIsSelectedMessages = useChatStore(
    state => state.updateIsSelectedMessages
  );
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const updateSelectedDocDataMessage = useChatStore(
    state => state.updateSelectedDocDataMessage
  );

  const handleToggleSelectOn = () => {
    if (isSelectedMessages) {
      updateSelectedDocDataMessage(null);
      updateIsSelectedMessages(false);
    } else {
      updateIsSelectedMessages(true);
    }
  };

  const handleChooseEditMessage = () => {
    if (!groupedMessages) return;
    const mergedArray: DocumentData[] = Object.values(groupedMessages).reduce(
      (acc, currentArray) => acc.concat(currentArray),
      []
    );

    if (
      chatUID &&
      mergedArray &&
      selectedDocDataMessage &&
      selectedDocDataMessage.length === 1
    ) {
      const editingMessageInfo = {
        selectedMessage: selectedDocDataMessage[0],
        isLastMessage:
          selectedDocDataMessage[0].id ===
          mergedArray[mergedArray.length - 1].id
            ? true
            : false,
      };

      updateEditingMessage(editingMessageInfo);
      handleCloseModal();

      const inputElement = document.getElementById('chatFormInput')!;
      inputElement.focus();
    }
  };

  const handleSuccessClickCopyTextMsg = () => {
    toast.success(t('Toasts.CopyToClipboard'));
    handleCloseModal();

    const inputElement = document.getElementById('chatFormInput')!;
    inputElement.focus();
  };

  return (
    <>
      {!isSelectedMessages && (
        <div
          className={`w-56 h-56 p-2 bg-myBlackBcg rounded-3xl pointer-events-auto ${
            isSelectedMessages && 'hidden'
          }`}
        >
          {selectedDocDataMessage &&
            selectedDocDataMessage.length === 1 &&
            selectedDocDataMessage[0]?.data()?.senderUserID ===
              currentUserUID && (
              <button
                className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md"
                onClick={handleChooseEditMessage}
              >
                <svg width={16} height={16}>
                  <use href={sprite + '#icon-pencil'} fill="#FFFFFF" />
                </svg>
                <span className="text-base">{t('ContextMenu.Edit')}</span>
              </button>
            )}

          {selectedDocDataMessage && (
            <CopyToClipboard
              text={textFromSelectedMsgs(selectedDocDataMessage) || ''}
              onCopy={handleSuccessClickCopyTextMsg}
            >
              <div className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md">
                <svg width={16} height={16}>
                  <use href={sprite + '#icon-copy'} fill="#FFFFFF" />
                </svg>
                <span className="text-base">{t('ContextMenu.Copy')}</span>
              </div>
            </CopyToClipboard>
          )}

          <button
            className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md"
            onClick={() =>
              handleDeleteMessage(
                selectedDocDataMessage,
                chatUID,
                currentUserUID,
                userUID,
                t,
                handleCloseModal
              )
            }
          >
            <svg width={16} height={16}>
              <use href={sprite + '#icon-delete-button'} fill="#FFFFFF" />
            </svg>
            <span className="text-base">{t('ContextMenu.Delete')}</span>
          </button>

          <button
            className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md"
            onClick={handleToggleSelectOn}
          >
            <svg width={16} height={16}>
              <use href={sprite + '#icon-select'} fill="#FFFFFF" />
            </svg>
            <span className="text-base">{t('ContextMenu.Select')}</span>
          </button>
        </div>
      )}
    </>
  );
};

export default ContextMenu;
