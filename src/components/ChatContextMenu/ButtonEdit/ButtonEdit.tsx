import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import { DocumentData } from 'firebase/firestore';

import useChatStore from '@zustand/store';

import { IButtonEditProps } from '@interfaces/IButtonEditProps';

import sprite from '@assets/sprite.svg';

const ButtonEdit: FC<IButtonEditProps> = ({
  groupedMessages,
  textContent = true,
  color,
}) => {
  const { t } = useTranslation();

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const updateEditingMessage = useChatStore(
    state => state.updateEditingMessage
  );
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

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
      };

      updateEditingMessage(editingMessageInfo);
      resetSelectedMessages();
    }
  };

  return (
    <button
      className="flex w-full items-center justify-between px-8 py-2 text-white hover:cursor-pointer hover:rounded-md hover:bg-darkZincOpacity90"
      type="button"
      onClick={handleChooseEditMessage}
      aria-label="Edit message"
    >
      <svg width={20} height={20}>
        <use href={sprite + '#icon-pencil'} fill={color} />
      </svg>
      {textContent && (
        <span className="text-base">{t('ContextMenu.Edit')}</span>
      )}
    </button>
  );
};

export default ButtonEdit;
