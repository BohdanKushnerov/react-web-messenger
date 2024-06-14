import { FC, Suspense, lazy, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import FileAttachment from '@components/ChatForm/FileAttachment/FileAttachment';
import Emoji from '@components/ChatForm/Emoji/Emoji';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
import SendMessage from '@components/Buttons/ButtonSendMessage/ButtonSendMessage';
import ButtonRecordAudio from '@components/Buttons/ButtonRecordAudio/ButtonRecordAudio';
const RecordingAudio = lazy(
  () => import('@components/ChatForm/RecordingAudio/RecordingAudio')
);
const ChatFormSelectedMsgs = lazy(
  () => import('@components/ChatForm/ChatFormSelectedMsgs/ChatFormSelectedMsgs')
);
const EditingMsgInfo = lazy(() => import('./EditingMsgInfo/EditingMsgInfo'));
import useChatStore from '@zustand/store';
import useBeforeUnloadToStopTyping from '@hooks/useBeforeUnloadToStopTyping';
import useTyping from '@hooks/useTyping';
import useClearMessagesOnChatChange from '@hooks/useClearMessagesOnChatChange';
import useEditingMessage from '@hooks/useEditingMessage';
import handleUpdateEditMessage from '@utils/messages/handleUpdateEditMessage';
import handleSendMessage from '@utils/chatForm/handleSendMessage';
import '@i18n';

const ChatForm: FC = () => {
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { t } = useTranslation();

  const message = useChatStore(state => state.message);
  const setMessage = useChatStore(state => state.setMessage);
  const currentUserUID = useChatStore(state => state.currentUser.uid);
  const { chatUID, userUID } = useChatStore(state => state.currentChatInfo);
  const editingMessageInfo = useChatStore(state => state.editingMessageInfo);
  const resetEditingMessage = useChatStore(state => state.resetEditingMessage);
  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);

  useBeforeUnloadToStopTyping();
  useTyping(message);
  useEditingMessage(editingMessageInfo, setMessage);
  useClearMessagesOnChatChange(chatUID, setMessage);

  useEffect(() => {
    inputRef.current?.focus();
  }, [chatUID]);

  const handleCancelEditingMessage = () => {
    resetEditingMessage();
    setMessage('');

    inputRef.current?.focus();
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
      handleSendMessage(message, chatUID, currentUserUID, userUID);
      setMessage('');
    }
  };

  const handleToggleRecordingStatus = () => {
    setIsRecording(prev => !prev);
  };

  return (
    <div className="absolute bottom-0 left-0 z-10 w-full h-24 flex flex-col items-center">
      {!isSelectedMessages ? (
        <div className="relative flex flex-col justify-center w-full h-full shadow-whiteTopShadow xl:w-8/12">
          {editingMessageInfo && (
            <Suspense
              fallback={
                <div className="mx-auto">
                  <LoaderUIActions size={48} />
                </div>
              }
            >
              <EditingMsgInfo
                selectedMessage={editingMessageInfo.selectedMessage}
                handleCancelEditingMessage={handleCancelEditingMessage}
              />
            </Suspense>
          )}
          <form
            className="flex justify-center items-center gap-2 px-3"
            onSubmit={handleManageSendMessage}
          >
            <input
              id="chatFormInput"
              autoFocus={true}
              autoComplete="off"
              className="w-full h-10 py-1 pl-10 pr-14 rounded-3xl bg-mediumLightZinc dark:bg-darkBackground text-black dark:text-white placeholder:text-ultraDarkZinc placeholder:dark:text-mediumZinc border-2 border-transparent outline-none focus:border-solid focus:dark:border-mediumDarkCyan"
              type="text"
              placeholder={t('ChatForm.ChatInputPlaceholder')}
              ref={inputRef}
              value={message}
              onChange={handleChangeMessage}
            />
            {message ? (
              <SendMessage />
            ) : (
              <>
                {!isRecording ? (
                  <ButtonRecordAudio
                    handleToggleRecordingStatus={handleToggleRecordingStatus}
                  />
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
        <Suspense>
          <ChatFormSelectedMsgs />
        </Suspense>
      )}
    </div>
  );
};

export default ChatForm;
