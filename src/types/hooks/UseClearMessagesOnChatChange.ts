export type UseClearMessagesOnChatChange = (
  chatUID: string | null,
  setMessage: (msg: string | ((prev: string) => string)) => void
) => void;
