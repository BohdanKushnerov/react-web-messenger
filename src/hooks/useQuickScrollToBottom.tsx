import { useCallback, useEffect } from 'react';

import { UseQuickScrollToBottom } from 'types/hooks/UseQuickScrollToBottom';

const useQuickScrollToBottom: UseQuickScrollToBottom = (
  bottomElementRef,
  isReadyFirstMsgs,
  isScrollDownButtonVisible,
  groupedMessages
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
