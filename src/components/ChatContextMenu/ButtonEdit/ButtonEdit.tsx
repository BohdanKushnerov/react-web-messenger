import { FC } from 'react';
import { DocumentData } from 'firebase/firestore';
import { useTranslation } from 'react-i18next';

import useChatStore from '@zustand/store';
import { IGroupedMessages } from '@interfaces/IGroupedMessages';
import sprite from '@assets/sprite.svg';

interface IButtonEditProps {
  groupedMessages: IGroupedMessages | null;
  textContent?: boolean;
  color: string;
}

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
        // isLastMessage:
        //   selectedDocDataMessage[0].id ===
        //   mergedArray[mergedArray.length - 1].id
        //     ? true
        //     : false,
      };

      updateEditingMessage(editingMessageInfo);
      resetSelectedMessages();

      const inputElement = document.getElementById('chatFormInput')!;
      inputElement.focus();
    }
  };

  return (
    <button
      className="flex items-center justify-between w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-zinc-600/90 hover:rounded-md"
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
