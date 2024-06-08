import { RefObject, useCallback, useEffect } from 'react';

import { IGroupedMessages } from '@interfaces/IGroupedMessages';

const useQuickScrollToBottom = (
  bottomElementRef: RefObject<HTMLDivElement>,
  isReadyFirstMsgs: boolean,
  isScrollDownButtonVisible: boolean,
  groupedMessages: IGroupedMessages | null
) => {
  const quickScrollBottom = useCallback(() => {
    if (bottomElementRef.current) {
      bottomElementRef.current.scrollIntoView({ block: 'end' });
    }
  }, [bottomElementRef]);

  useEffect(() => {
    if (isReadyFirstMsgs) {
      quickScrollBottom();
    }
  }, [isReadyFirstMsgs, quickScrollBottom]);

  useEffect(() => {
    const isMobileScreen = window.innerWidth <= 639;

    if (isReadyFirstMsgs && !isScrollDownButtonVisible && isMobileScreen) {
      setTimeout(() => {
        quickScrollBottom();
      }, 300);
    }
  }, [isReadyFirstMsgs, isScrollDownButtonVisible, quickScrollBottom]);

  useEffect(() => {
    if (!isScrollDownButtonVisible) {
      quickScrollBottom();
    }
  }, [groupedMessages, isScrollDownButtonVisible, quickScrollBottom]);
};

export default useQuickScrollToBottom;
