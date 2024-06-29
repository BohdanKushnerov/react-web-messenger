import { useCallback, useEffect } from 'react';

import useResizeWindow from './useResizeWindow';

import type { UseQuickScrollToBottom } from 'types/hooks/UseQuickScrollToBottom';

const useQuickScrollToBottom: UseQuickScrollToBottom = (
  bottomElementRef,
  isReadyFirstMessages,
  isScrollDownButtonVisible,
  groupedMessages
) => {
  const { isFullScreen, heightWindow } = useResizeWindow();

  const quickScrollBottom = useCallback(() => {
    if (bottomElementRef.current) {
      bottomElementRef.current.scrollIntoView({ block: 'end' });
    }
  }, [bottomElementRef]);

  useEffect(() => {
    if (isReadyFirstMessages) {
      quickScrollBottom();
    }
  }, [isReadyFirstMessages, quickScrollBottom]);

  useEffect(() => {
    const isMobileScreen = !isFullScreen;
    if (isMobileScreen && !isScrollDownButtonVisible && heightWindow) {
      setTimeout(() => {
        quickScrollBottom();
      }, 100);
    }
  }, [
    isScrollDownButtonVisible,
    isFullScreen,
    quickScrollBottom,
    heightWindow,
  ]);

  useEffect(() => {
    const isMobileScreen = !isFullScreen;

    if (isReadyFirstMessages && !isScrollDownButtonVisible && isMobileScreen) {
      setTimeout(() => {
        quickScrollBottom();
      }, 300);
    }
  }, [
    isFullScreen,
    isReadyFirstMessages,
    isScrollDownButtonVisible,
    quickScrollBottom,
  ]);

  useEffect(() => {
    if (!isScrollDownButtonVisible) {
      quickScrollBottom();
    }
  }, [groupedMessages, isScrollDownButtonVisible, quickScrollBottom]);
};

export default useQuickScrollToBottom;
