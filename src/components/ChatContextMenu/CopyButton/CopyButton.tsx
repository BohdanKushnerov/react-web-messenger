import { FC } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { toast } from 'react-toastify';
import { useTranslation } from 'react-i18next';

import useChatStore from '@zustand/store';
import { textFromSelectedMsgs } from '@utils/messages/textFromSelectedMsgs';
import sprite from '@assets/sprite.svg';

interface ICopyButtonProps {
  textContent?: boolean;
  white?: string;
  dark?: string;
}

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
            }  w-full px-8 py-2 text-white transition-all duration-150 hover:cursor-pointer hover:bg-zinc-600/90 hover:rounded-md`}
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
