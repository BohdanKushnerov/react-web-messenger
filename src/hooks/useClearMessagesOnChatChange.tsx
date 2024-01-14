import { useEffect } from 'react';

interface IUseClearMessagesOnChatChange {
  (
    chatUID: string | null,
    setMessage: (msg: string | ((prev: string) => string)) => void
  ): void;
}

const useClearMessagesOnChatChange: IUseClearMessagesOnChatChange = (
  chatUID,
  setMessage
) => {
  //  чистит при смене юзера сообщение
  useEffect(() => {
    if (chatUID) {
      setMessage('');
    }
  }, [chatUID, setMessage]);
};

export default useClearMessagesOnChatChange;
