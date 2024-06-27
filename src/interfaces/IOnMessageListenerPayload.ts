import type { INotification } from './INotification';

export interface IOnMessageListenerPayload {
  from: string;
  collapseKey: string;
  messageId: string;
  notification: INotification;
  data: {
    [key: string]: string;
  };
}
