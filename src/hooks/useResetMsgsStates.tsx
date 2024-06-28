// Do not add line breaks between global imports
import { useEffect } from 'react';
import useChatStore from '@zustand/store';

// I don't like idea to store every type outside. Most likely no other hook will use the same props. So just keep its type here.
import type { UseResetMsgsStates } from 'types/hooks/UseResetMsgsStates';

// Try to avoid abbreviations in variables names. If the name is already too long - maybe select a better name.
// "useResetMessagesEffect" - is a good name for our custom hook - it tells us that it is based on "useEffect" and somehow resets some messages
const useResetMsgsStates: UseResetMsgsStates = (
  // How should I know that many of those props are refs? Add "Ref" ending in names. For example - "isReadyToFetchMessagesRef".
  // You, as a developer, already know which values you will assign to thisvariables. So why you pass all of this inside?
  // This hook should have only TWO props - "chatUID: string" and "onReset: () => void"
  isReadyToFetchFirstNewChatMsgs,
  lastLoadedMsg,
  isFinishMsgs,
  setIsReadyFirstMsgs,
  setGroupedMessages
) => {
  // This hook is only called once in "Messages" component and there is "chatUID" variable outside.
  // So why you call "useChatStore" again? Just pass "chatUID" from outside.
  const { chatUID } = useChatStore(state => state.currentChatInfo);

  // After all changes this "useEffect" will look like this;
  // useEffect(() => {
  //    if (!chatUID) return;
  //    onReset();
  // }, [chatUID, onReset])
  useEffect(() => {
    if (!chatUID) return;

    isReadyToFetchFirstNewChatMsgs.current = true;
    lastLoadedMsg.current = null;
    isFinishMsgs.current = false;

    setGroupedMessages(null);
    setIsReadyFirstMsgs(false);
  }, [
    chatUID,
    isFinishMsgs,
    isReadyToFetchFirstNewChatMsgs,
    lastLoadedMsg,
    setGroupedMessages,
    setIsReadyFirstMsgs,
  ]);
};

// No reason to export hooks and components by default as for me.
export default useResetMsgsStates;
