import type { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import copyTextSelectedMessages from '@utils/messages/copyTextSelectedMessages';

import { IconId } from '@enums/iconsSpriteId';

interface IButtonCopyProps {
  textContent?: boolean;
  white?: string;
  dark?: string;
}

const CopyButton: FC<IButtonCopyProps> = ({
  textContent = true,
  white = 'white',
  dark = 'white',
}) => {
  const { t } = useTranslation();

  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

  const handleClickCopyTextMessage = () => {
    toast.success(t('Toasts.CopyToClipboard'));
    resetSelectedMessages();
  };

  return (
    <>
      {selectedDocDataMessage && (
        <CopyToClipboard
          text={copyTextSelectedMessages(selectedDocDataMessage) ?? ''}
          onCopy={handleClickCopyTextMessage}
        >
          <div
            className={`flex items-center ${
              textContent ? 'justify-between' : 'justify-center'
            } w-full px-8 py-2 text-white transition-all duration-150 hover:cursor-pointer hover:rounded-md hover:bg-darkZincOpacity90`}
          >
            <SvgIcon
              className={`flex fill-${white} dark:fill-${dark}`}
              iconId={IconId.IconCopy}
              size={20}
            />
            {textContent && (
              <span className="text-base">{t('ContextMenu.Copy')}</span>
            )}
          </div>
        </CopyToClipboard>
      )}
    </>
  );
};

export default CopyButton;
