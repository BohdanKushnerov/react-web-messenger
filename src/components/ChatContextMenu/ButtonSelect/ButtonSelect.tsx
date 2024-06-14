import { FC } from 'react';
import { useTranslation } from 'react-i18next';

import useChatStore from '@zustand/store';
import { IButtonSelectProps } from '@interfaces/IButtonSelectProps';
import sprite from '@assets/sprite.svg';

const ButtonSelect: FC<IButtonSelectProps> = ({ textContent = true }) => {
  const { t } = useTranslation();

  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);
  const updateIsSelectedMessages = useChatStore(
    state => state.updateIsSelectedMessages
  );
  const updateSelectedDocDataMessage = useChatStore(
    state => state.updateSelectedDocDataMessage
  );
  const handleToggleSelect = () => {
    if (isSelectedMessages) {
      updateSelectedDocDataMessage(null);
      updateIsSelectedMessages(false);
    } else {
      updateIsSelectedMessages(true);
    }
  };
  return (
    <button
      className="flex items-center justify-between w-full px-8 py-2 text-white transition-all duration-150 hover:cursor-pointer hover:bg-darkZincOpacity90 hover:rounded-md"
      onClick={handleToggleSelect}
      aria-label="Select message"
    >
      <svg width={16} height={16}>
        <use href={sprite + '#icon-select'} fill="#FFFFFF" />
      </svg>
      {textContent && (
        <span className="text-base">{t('ContextMenu.Select')}</span>
      )}
    </button>
  );
};

export default ButtonSelect;
