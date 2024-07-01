import type { FC } from 'react';
import {
  Suspense,
  lazy,
  useCallback,
  useDeferredValue,
  useRef,
  useState,
} from 'react';

import type { DocumentData } from 'firebase/firestore';

import MessageList from './MessagesList/MessageList';
import MessagesScrollBar from './MessagesScrollBar/MessagesScrollBar';
import MessagesSkeleton from './MessagesSkeleton/MessagesSkeleton';

import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';

import useChatStore from '@store/store';

import useChatMessageUpdates from '@hooks/messages/useChatMessageUpdates';
import useGetFirstMessages from '@hooks/messages/useGetFirstMessages';
import useResetMessagesStates from '@hooks/messages/useResetMessagesStates';
import useSelectedMessagesHandling from '@hooks/messages/useSelectedMessagesHandling';
import usePersistChatUID from '@hooks/usePersistChatUID';

import calculateMenuPosition from '@utils/messages/calculateMenuPosition';
import handleScrollLoadMoreMessages from '@utils/messages/handleScrollLoadMoreMessages';

import { ElementsId } from '@enums/elementsId';

import type { GroupedMessages } from 'types/GroupedMessages';

const MessageContextMenuModal = lazy(
  () =>
    import('@components/Modals/ModalMessageContextMenu/ModalMessageContextMenu')
);
const ChatContextMenu = lazy(
  () => import('../ChatContextMenu/ChatContextMenu')
);

const throttleScrollTime = 100;

const Messages: FC = () => {
  const [groupedMessages, setGroupedMessages] =
    useState<GroupedMessages | null>(null);
  const [isReadyFirstMessages, setIsReadyFirstMessages] = useState(false);
  const [isScrollDownButtonVisible, setIsScrollDownButtonVisible] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const scrollbarsRef = useRef<HTMLDivElement>(null);
  const msgListWrapRef = useRef<HTMLDivElement>(null);
  const handleScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isReadyToFetchFirstNewChatMessages = useRef<boolean>(true);
  const isInfinityScrollLoading = useRef<boolean>(false);
  const lastLoadedMessage = useRef<DocumentData | null>(null);
  const isFinishMessages = useRef<boolean>(false);

  const { chatUID } = useChatStore(state => state.currentChatInfo);
  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);
  const updateIsSelectedMessages = useChatStore(
    state => state.updateIsSelectedMessages
  );
  const selectedDocDataMessage = useChatStore(
    state => state.selectedDocDataMessage
  );
  const updateSelectedDocDataMessage = useChatStore(
    state => state.updateSelectedDocDataMessage
  );
  const resetSelectedMessages = useChatStore(
    state => state.resetSelectedMessages
  );

  const deferredIsShowMenuModal = useDeferredValue(
    groupedMessages && selectedDocDataMessage
  );

  const onReset = useCallback(() => {
    isReadyToFetchFirstNewChatMessages.current = true;
    lastLoadedMessage.current = null;
    isFinishMessages.current = false;

    setGroupedMessages(null);
    setIsReadyFirstMessages(false);
  }, []);

  usePersistChatUID();
  useSelectedMessagesHandling();
  useChatMessageUpdates(setGroupedMessages);
  useResetMessagesStates(chatUID, onReset);
  useGetFirstMessages(
    chatUID,
    isReadyToFetchFirstNewChatMessages,
    lastLoadedMessage,
    setIsReadyFirstMessages,
    setGroupedMessages
  );

  const handleScroll = useCallback(async () => {
    if (handleScrollTimeout.current) {
      return;
    }

    handleScrollTimeout.current = setTimeout(async () => {
      handleScrollTimeout.current = null;

      const scrollHeight = scrollbarsRef.current?.scrollHeight || 0;
      const clientHeight = scrollbarsRef.current?.clientHeight || 0;
      const scrollTop = scrollbarsRef.current?.scrollTop || 0;

      const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;
      const top = scrollTop <= 700;

      if (top && isNearBottom && isFinishMessages.current === false) {
        await handleScrollLoadMoreMessages(
          chatUID,
          isInfinityScrollLoading,
          lastLoadedMessage,
          isFinishMessages,
          setGroupedMessages
        );
        isInfinityScrollLoading.current = false;
      }

      setIsScrollDownButtonVisible(isNearBottom);
    }, throttleScrollTime);
  }, [chatUID]);

  const handleClickRigthButtonMessage = useCallback(
    (message: DocumentData, e: React.MouseEvent) => {
      e.preventDefault();

      const chatContainerEl = document.getElementById(
        ElementsId.Scrollbars
      ) as HTMLDivElement;

      if (isSelectedMessages) {
        updateIsSelectedMessages(false);
      }

      const { clientX, clientY } = e;

      setModalPosition(
        calculateMenuPosition(chatContainerEl, clientX, clientY)
      );

      if (
        selectedDocDataMessage !== null &&
        selectedDocDataMessage.find(msg => msg.id === message.id) !== undefined
      ) {
        updateSelectedDocDataMessage(null);
      } else {
        updateSelectedDocDataMessage([message]);
      }
    },
    [
      isSelectedMessages,
      selectedDocDataMessage,
      updateIsSelectedMessages,
      updateSelectedDocDataMessage,
    ]
  );

  const handleToggleSelectedMessage = useCallback(
    (message: DocumentData) => {
      if (selectedDocDataMessage?.find(msg => msg.id === message.id)) {
        updateSelectedDocDataMessage(prev => {
          const filteredMessages = prev?.filter(msg => msg.id !== message.id);

          if (filteredMessages?.length === 0) {
            return null;
          }

          return filteredMessages ?? null;
        });
      } else {
        updateSelectedDocDataMessage(prev =>
          prev === null ? [message] : [...prev, message]
        );
      }
    },
    [selectedDocDataMessage, updateSelectedDocDataMessage]
  );

  const handleCloseModal = (e?: React.MouseEvent<HTMLDivElement>) => {
    if (e && e.target instanceof Element && e.target.id && isSelectedMessages) {
      return;
    }

    if (selectedDocDataMessage !== null) {
      resetSelectedMessages();
    }
  };

  return (
    <>
      <div className="h-full w-full py-1" onClick={handleCloseModal}>
        <MessagesScrollBar ref={scrollbarsRef} handleScroll={handleScroll}>
          <MessageList
            chatUID={chatUID}
            groupedMessages={groupedMessages}
            isReadyFirstMessages={isReadyFirstMessages}
            selectedDocDataMessage={selectedDocDataMessage}
            isScrollDownButtonVisible={isScrollDownButtonVisible}
            handleClickRigthButtonMessage={handleClickRigthButtonMessage}
            handleToggleSelectedMessage={handleToggleSelectedMessage}
            ref={msgListWrapRef}
          />
        </MessagesScrollBar>

        <MessagesSkeleton isLoadedContent={isReadyFirstMessages} />
      </div>

      {deferredIsShowMenuModal && (
        <Suspense
          fallback={
            <div
              className="pointer-events-none z-10 h-screen w-screen bg-transparent"
              style={{
                position: 'absolute',
                top: `${modalPosition.top}px`,
                left: `${modalPosition.left}px`,
              }}
            >
              <div className="pointer-events-auto h-56 w-56 rounded-3xl bg-mediumDarkZincOpacity10 p-2">
                <LoaderUIActions size={200} />
              </div>
            </div>
          }
        >
          <MessageContextMenuModal
            closeModal={handleCloseModal}
            modalPosition={modalPosition}
          >
            <ChatContextMenu groupedMessages={groupedMessages} />
          </MessageContextMenuModal>
        </Suspense>
      )}
    </>
  );
};

export default Messages;
