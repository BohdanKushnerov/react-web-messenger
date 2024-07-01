import type { FC } from 'react';
import { Suspense, lazy, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';

import Emoji from '@components/ChatForm/Emoji/Emoji';
import FileAttachment from '@components/ChatForm/FileAttachment/FileAttachment';
import Button from '@components/common/Button/Button';
import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';
import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useChatStore from '@store/store';

import useBeforeUnloadToStopTyping from '@hooks/chatFrom/useBeforeUnloadToStopTyping';
import useClearMessagesOnChatChange from '@hooks/chatFrom/useClearMessagesOnChatChange';
import useEditingMessage from '@hooks/chatFrom/useEditingMessage';
import useMyTyping from '@hooks/chatFrom/useMyTyping';
import useKeyDown from '@hooks/useKeyDown';

import checkMicrophonePermission from '@utils/chatForm/checkMicrophonePermission';
import handleSendMessage from '@utils/chatForm/handleSendMessage';
import handleUpdateEditMessage from '@utils/messages/handleUpdateEditMessage';

import { ElementsId } from '@enums/elementsId';
import { IconId } from '@enums/iconsSpriteId';

interface IChatFormProps {
  isShowSearchMessages: boolean;
}

const RecordingAudio = lazy(
  () => import('@components/ChatForm/RecordingAudio/RecordingAudio')
);
const ChatFormSelectedMessages = lazy(
  () =>
    import(
      '@components/ChatForm/ChatFormSelectedMessages/ChatFormSelectedMessages'
    )
);
const EditingMessageInfo = lazy(
  () => import('./EditingMessageInfo/EditingMessageInfo')
);

const ChatForm: FC<IChatFormProps> = ({ isShowSearchMessages }) => {
  const [isRecording, setIsRecording] = useState<boolean>(false);

  const inputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  const message = useChatStore(state => state.message);
  const setMessage = useChatStore(state => state.setMessage);
  const { uid: currentUserUID, displayName } = useChatStore(
    state => state.currentUser
  );
  const { chatUID, userUID, tokenFCM } = useChatStore(
    state => state.currentChatInfo
  );
  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);
  const resetEditingMessage = useChatStore(state => state.resetEditingMessage);
  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);

  useMyTyping();
  useBeforeUnloadToStopTyping();
  useClearMessagesOnChatChange();
  useKeyDown(inputRef, isShowSearchMessages);
  useEditingMessage(inputRef);

  const handleCancelEditingMessage = () => {
    resetEditingMessage();
    setMessage('');
  };

  const handleChangeMessage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleManageSendMessage = (e: React.FormEvent) => {
    e.preventDefault();

    if (message.trim() === '') {
      return;
    }

    if (editingMessageInfo) {
      handleUpdateEditMessage(
        editingMessageInfo,
        chatUID,
        message,
        currentUserUID,
        userUID,
        t
      );
      resetEditingMessage();
      setMessage('');
    } else {
      handleSendMessage(
        displayName,
        message,
        tokenFCM,
        chatUID,
        currentUserUID,
        userUID
      );
      setMessage('');
    }
  };

  const handleToggleRecordingStatus = async () => {
    const hasPermission = await checkMicrophonePermission();

    if (hasPermission) {
      setIsRecording(prev => !prev);
    } else {
      toast.error('Do not have microphone permission');
    }
  };

  return (
    <div className="absolute bottom-0 left-0 z-10 flex h-24 w-full flex-col items-center shadow-whiteTopShadow">
      {!isSelectedMessages ? (
        <div className="relative flex h-full w-full flex-col justify-center xl:w-8/12">
          {editingMessageInfo && (
            <Suspense
              fallback={
                <div className="mx-auto">
                  <LoaderUIActions size={48} />
                </div>
              }
            >
              <EditingMessageInfo
                selectedMessage={editingMessageInfo.selectedMessage}
                handleCancelEditingMessage={handleCancelEditingMessage}
              />
            </Suspense>
          )}
          <form
            className="flex items-center justify-center gap-2 px-3"
            onSubmit={handleManageSendMessage}
          >
            <input
              id={ElementsId.ChatFormInput}
              autoComplete="off"
              className="h-10 w-full rounded-3xl border-2 border-transparent bg-mediumLightZinc py-1 pl-10 pr-14 text-black outline-none placeholder:text-ultraDarkZinc focus:border-solid dark:bg-darkBackground dark:text-white placeholder:dark:text-mediumZinc focus:dark:border-mediumDarkCyan"
              type="text"
              placeholder={t('ChatForm.ChatInputPlaceholder')}
              ref={inputRef}
              value={message}
              onChange={handleChangeMessage}
            />
            {message ? (
              <Button
                variant="sendMessages"
                type="submit"
                ariaLabel="Send message"
              >
                <SvgIcon
                  className="fill-mediumLightZinc dark:fill-mediumZinc"
                  iconId={IconId.IconSendMessage}
                  size={24}
                />
              </Button>
            ) : (
              <>
                {!isRecording ? (
                  <Button
                    variant="recording"
                    type="button"
                    onClick={handleToggleRecordingStatus}
                    ariaLabel="Recording audio"
                  >
                    <SvgIcon
                      className="fill-mediumLightZinc dark:fill-mediumZinc"
                      iconId={IconId.IconMic}
                      size={24}
                    />
                  </Button>
                ) : (
                  <Suspense fallback={<LoaderUIActions size={40} />}>
                    <RecordingAudio
                      isRecording={isRecording}
                      handleToggleRecordingStatus={handleToggleRecordingStatus}
                    />
                  </Suspense>
                )}
              </>
            )}
          </form>
          {!isRecording && <FileAttachment />}
          <Emoji />
        </div>
      ) : (
        <Suspense fallback={<LoaderUIActions size={96} />}>
          <ChatFormSelectedMessages />
        </Suspense>
      )}
    </div>
  );
};

export default ChatForm;
