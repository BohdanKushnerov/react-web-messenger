import { useEffect } from 'react';

import { onMessageListener, requestForToken } from '@myfirebase/config';

interface INotification {
  title: string;
  body: string;
}

interface IOnMessageListenerPayload {
  from: string;
  collapseKey: string;
  messageId: string;
  notification: INotification;
  data: {
    [key: string]: string;
  };
}

const Notification = () => {
  useEffect(() => {
    requestForToken();

    onMessageListener()
      .then(payload => {
        const castPayload = payload as IOnMessageListenerPayload;
        console.log('onMessageListener payload', castPayload);
      })
      .catch(err => console.log('failed: ', err));
  }, []);

  return null;
};

export default Notification;
