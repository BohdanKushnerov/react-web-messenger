export interface IUseClearMessagesOnChatChange {
  (
    chatUID: string | null,
    setMessage: (msg: string | ((prev: string) => string)) => void
  ): void;
}