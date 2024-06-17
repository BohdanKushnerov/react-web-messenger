import { useCallback, useEffect } from 'react';

import useResizeWindow from './useResizeWindow';

import { UseQuickScrollToBottom } from 'types/hooks/UseQuickScrollToBottom';

const useQuickScrollToBottom: UseQuickScrollToBottom = (
  bottomElementRef,
  isReadyFirstMsgs,
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
    if (isReadyFirstMsgs) {
      quickScrollBottom();
    }
  }, [isReadyFirstMsgs, quickScrollBottom]);

  useEffect(() => {
    const isMobileScreen = !isFullScreen;
    if (isMobileScreen && !isScrollDownButtonVisible) {
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

    if (isReadyFirstMsgs && !isScrollDownButtonVisible && isMobileScreen) {
      setTimeout(() => {
        quickScrollBottom();
      }, 300);
    }
  }, [
    isFullScreen,
    isReadyFirstMsgs,
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
