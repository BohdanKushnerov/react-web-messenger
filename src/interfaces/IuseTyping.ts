export interface IuseTyping {
  (
    message: string,
    myTypingTimeoutRef: React.MutableRefObject<NodeJS.Timeout | null>
  ): void;
}