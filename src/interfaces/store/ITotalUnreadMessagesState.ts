import type { IUnreadMessages } from '@interfaces/store/IUnreadMessages';

export interface ITotalUnreadMessagesState {
  totalUnreadMessages: IUnreadMessages;
  updateTotalUnreadMessages: (updateData: IUnreadMessages) => void;
}
