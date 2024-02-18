import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useChatStore from '@zustand/store';
import { handleDeleteMessage } from '@utils/messages/handleDeleteMessage';
import sprite from '@assets/sprite.svg';

interface IDeleteButtonProps {
  textContent?: boolean;
  color: string;
}

const DeleteButton: FC<IDeleteButtonProps> = ({
  textContent = true,
  color,
}) => {
  const { t } = useTranslation();

  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);

  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

  return (
    <button
      className="flex items-center justify-between w-full px-8 py-2 text-white transition-all duration-150 hover:cursor-pointer hover:bg-zinc-600/90 hover:rounded-md"
      onClick={() =>
        handleDeleteMessage(
          selectedDocDataMessage,
          chatUID,
          currentUserUID,
          userUID,
          t,
          resetSelectedMessages
        )
      }
      aria-label="Delete message"
    >
      <svg width={20} height={20}>
        <use href={sprite + '#icon-delete-button'} fill={color} />
      </svg>
      {textContent && (
        <span className="text-base">{t('ContextMenu.Delete')}</span>
      )}
    </button>
  );
};

export default DeleteButton;
