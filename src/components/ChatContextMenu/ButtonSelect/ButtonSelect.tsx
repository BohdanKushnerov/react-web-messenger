import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import type { IButtonSelectProps } from '@interfaces/IButtonSelectProps';

import { IconId } from '@enums/iconsSpriteId';

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
      className="flex w-full items-center justify-between px-8 py-2 text-white transition-all duration-150 hover:cursor-pointer hover:rounded-md hover:bg-darkZincOpacity90"
      type="button"
      onClick={handleToggleSelect}
      aria-label="Select message"
    >
      <SvgIcon className="fill-white" iconId={IconId.IconSelect} size={16} />
      {textContent && (
        <span className="text-base">{t('ContextMenu.Select')}</span>
      )}
    </button>
  );
};

export default ButtonSelect;
