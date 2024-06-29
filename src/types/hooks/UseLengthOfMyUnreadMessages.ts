export type UseLengthOfMyUnreadMessages = (
  chatUID: string | null,
  isNotify?: boolean,
  isGetAdditionalMessage?: boolean
) => number;
