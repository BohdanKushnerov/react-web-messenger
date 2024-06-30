export interface IOnMessageListenerPayload {
  from: string;
  collapseKey: string;
  messageId: string;
  notification: {
    title: string;
    body: string;
  };
  data: {
    [key: string]: string;
  };
}
