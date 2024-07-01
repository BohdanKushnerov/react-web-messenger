import { useEffect } from 'react';

type UseResetMessagesStates = (
  chatUID: string | null,
  onReset: () => void
) => void;

const useResetMessagesStates: UseResetMessagesStates = (chatUID, onReset) => {
  useEffect(() => {
    if (!chatUID) return;
    onReset();
  }, [chatUID, onReset]);
};

export default useResetMessagesStates;
