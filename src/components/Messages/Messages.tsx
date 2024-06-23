import {
  FC,
  Suspense,
  lazy,
  useCallback,
  useDeferredValue,
  useRef,
  useState,
} from 'react';

import {
  DocumentData,
  collection,
  getDocs,
  limit,
  orderBy,
  query,
  startAfter,
} from 'firebase/firestore';

import MessageList from './MessagesList/MessageList';
import MessagesScrollBar from './MessagesScrollBar/MessagesScrollBar';
import MessagesSkeleton from './MessagesSkeleton/MessagesSkeleton';

import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

import { db } from '@myfirebase/config';

import useChatStore from '@zustand/store';

import useChatMessageUpdates from '@hooks/useChatMessageUpdates';
import useGetFirstMsgs from '@hooks/useFirstMsgs';
import usePersistChatUID from '@hooks/usePersistChatUID';
import useResetMsgsStates from '@hooks/useResetMsgsStates';
import useSelectedMessagesHandling from '@hooks/useSelectedMessagesHandling';

import calculateMenuPosition from '@utils/messages/calculateMenuPosition';
import mergeChatMessages from '@utils/messages/mergeChatMessages';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

import { ElementsId } from '@enums/elementsId';

import '@i18n';

const MessageContextMenuModal = lazy(
  () =>
    import('@components/Modals/ModalMessageContextMenu/ModalMessageContextMenu')
);
const ChatContextMenu = lazy(
  () => import('../ChatContextMenu/ChatContextMenu')
);

const Messages: FC = () => {
  const [groupedMessages, setGroupedMessages] =
    useState<IGroupedMessages | null>(null);
  const [isReadyFirstMsgs, setIsReadyFirstMsgs] = useState(false);
  const [isScrollDownButtonVisible, setIsScrollDownButtonVisible] =
    useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });

  const scrollbarsRef = useRef<HTMLDivElement>(null);
  const msgListWrapRef = useRef<HTMLDivElement>(null);
  const handleScrollTimeout = useRef<NodeJS.Timeout | null>(null);
  const isReadyToFetchFirstNewChatMsgs = useRef<boolean>(true);
  const isInfinityScrollLoading = useRef<boolean>(false);
  const lastLoadedMsg = useRef<DocumentData | null>(null);
  const isFinishMsgs = useRef<boolean>(false);

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

  useSelectedMessagesHandling();
  useChatMessageUpdates(setGroupedMessages);
  usePersistChatUID();
  useResetMsgsStates(
    isReadyToFetchFirstNewChatMsgs,
    lastLoadedMsg,
    isFinishMsgs,
    setIsReadyFirstMsgs,
    setGroupedMessages
  );
  useGetFirstMsgs(
    isReadyToFetchFirstNewChatMsgs,
    lastLoadedMsg,
    setIsReadyFirstMsgs,
    setGroupedMessages
  );

  const handleScroll = useCallback(async () => {
    const throttleTime = 100;

    if (handleScrollTimeout.current) {
      return;
    }

    const loadMoreMessages = async () => {
      if (isInfinityScrollLoading.current) {
        return;
      }

      isInfinityScrollLoading.current = true;

      const queryParams = query(
        collection(db, `chats/${chatUID}/messages`),
        orderBy('date', 'desc'),
        startAfter(lastLoadedMsg.current),
        limit(15)
      );

      const snapshot = await getDocs(queryParams);

      if (!snapshot.empty) {
        const updatedMessages: DocumentData[] = snapshot.docs;

        const lastVisible = updatedMessages[updatedMessages.length - 1];

        if (lastLoadedMsg.current?.id === lastVisible.id) {
          return;
        }

        lastLoadedMsg.current = lastVisible;

        const groupedMsgs = updatedMessages.reduce((acc, message) => {
          const messageData = message.data();
          if (messageData?.date) {
            const date = messageData.date.toDate();
            const dateString = date.toISOString().split('T')[0];

            acc[dateString] = acc[dateString] || [];
            acc[dateString].push(message);
          }

          return acc;
        }, {});

        const entries = Object.entries(groupedMsgs);
        entries.forEach(arr => arr[1].reverse());
        entries.sort(
          ([dateA], [dateB]) =>
            new Date(dateA).getTime() - new Date(dateB).getTime()
        );
        const sortedData = Object.fromEntries(entries);

        setGroupedMessages(prev =>
          mergeChatMessages(sortedData, prev as IGroupedMessages)
        );
      } else {
        isFinishMsgs.current = true;
      }
    };

    handleScrollTimeout.current = setTimeout(async () => {
      handleScrollTimeout.current = null;

      const scrollHeight = scrollbarsRef.current?.scrollHeight || 0;
      const clientHeight = scrollbarsRef.current?.clientHeight || 0;
      const scrollTop = scrollbarsRef.current?.scrollTop || 0;

      const isNearBottom = scrollHeight - scrollTop - clientHeight > 100;
      const top = scrollTop <= 700;

      if (top && isScrollDownButtonVisible && isFinishMsgs.current === false) {
        await loadMoreMessages();
        isInfinityScrollLoading.current = false;
      }

      setIsScrollDownButtonVisible(isNearBottom);
    }, throttleTime);
  }, [chatUID, isScrollDownButtonVisible]);

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
          const filteredMsgs = prev?.filter(msg => msg.id !== message.id);

          if (filteredMsgs?.length === 0) {
            return null;
          } else {
            return filteredMsgs ?? null;
          }
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
            isReadyFirstMsgs={isReadyFirstMsgs}
            selectedDocDataMessage={selectedDocDataMessage}
            isScrollDownButtonVisible={isScrollDownButtonVisible}
            handleClickRigthButtonMessage={handleClickRigthButtonMessage}
            handleToggleSelectedMessage={handleToggleSelectedMessage}
            ref={msgListWrapRef}
          />
        </MessagesScrollBar>

        <MessagesSkeleton isLoadedContent={isReadyFirstMsgs} />
      </div>

      {deferredIsShowMenuModal && (
        <Suspense
          fallback={
            <div
              className="pointer-events-none z-10 h-screen w-screen bg-transparent"
              style={{
                position: 'absolute',
                top: modalPosition.top + 'px',
                left: modalPosition.left + 'px',
              }}
            >
              <div
                className={`pointer-events-auto h-56 w-56 rounded-3xl bg-mediumDarkZincOpacity10 p-2`}
              >
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
