import { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import useChatStore from '@zustand/store';

import copyTextSelectedMsgs from '@utils/messages/copyTextSelectedMsgs';

import { ICopyButtonProps } from '@interfaces/ICopyButtonProps';

import sprite from '@assets/sprite.svg';

const CopyButton: FC<ICopyButtonProps> = ({
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

  const handleClickCopyTextMsg = () => {
    toast.success(t('Toasts.CopyToClipboard'));
    resetSelectedMessages();
  };

  return (
    <>
      {selectedDocDataMessage && (
        <CopyToClipboard
          text={copyTextSelectedMsgs(selectedDocDataMessage) ?? ''}
          onCopy={handleClickCopyTextMsg}
        >
          <div
            className={`flex items-center ${
              textContent ? 'justify-between' : 'justify-center'
            } w-full px-8 py-2 text-white transition-all duration-150 hover:cursor-pointer hover:rounded-md hover:bg-darkZincOpacity90`}
          >
            <svg
              width={20}
              height={20}
              className={`flex fill-${white} dark:fill-${dark}`}
            >
              <use href={sprite + '#icon-copy'} />
            </svg>
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
