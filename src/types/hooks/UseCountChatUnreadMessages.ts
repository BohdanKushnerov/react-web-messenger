import { IUnreadMessages } from '../../interfaces/IUnreadMessages';

export type UseCountChatUnreadMessages = (
  chatUnreadMessages: IUnreadMessages
) => number | null;
