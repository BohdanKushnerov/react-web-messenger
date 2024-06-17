export type UseLengthOfMyUnreadMsgs = (
  chatUID: string | null,
  isNotify?: boolean,
  isGetAdditionalMessage?: boolean
) => number;
