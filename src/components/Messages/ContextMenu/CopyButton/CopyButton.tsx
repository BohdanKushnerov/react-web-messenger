import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';

import { textFromSelectedMsgs } from '@utils/messages/textFromSelectedMsgs';
import useChatStore from '@zustand/store';
import sprite from '@assets/sprite.svg';

interface ICopyButtonProps {
  textContent?: boolean;
  color: string;
}

const CopyButton: FC<ICopyButtonProps> = ({ textContent = true, color }) => {
  const { t } = useTranslation();

  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

  const handleSuccessClickCopyTextMsg = () => {
    toast.success(t('Toasts.CopyToClipboard'));
    resetSelectedMessages();

    const inputElement = document.getElementById('chatFormInput')!;
    inputElement.focus();
  };

  return (
    <>
      {selectedDocDataMessage && (
        <CopyToClipboard
          text={textFromSelectedMsgs(selectedDocDataMessage) || ''}
          onCopy={handleSuccessClickCopyTextMsg}
        >
          <div
            className={`flex items-center ${
              textContent ? 'justify-between' : 'justify-center'
            }  w-full px-8 py-2 text-white hover:cursor-pointer hover:bg-hoverGray hover:rounded-md`}
          >
            <svg width={20} height={20}>
              <use href={sprite + '#icon-copy'} fill={color} />
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
