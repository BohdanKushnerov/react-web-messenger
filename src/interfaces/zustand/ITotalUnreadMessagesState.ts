import type { IUnreadMessages } from '@interfaces/IUnreadMessages';

export interface ITotalUnreadMessagesState {
  totalUnreadMessages: IUnreadMessages;
  updateTotalUnreadMessages: (updateData: IUnreadMessages) => void;
}
