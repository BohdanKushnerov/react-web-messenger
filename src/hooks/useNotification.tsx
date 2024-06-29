import { useEffect } from 'react';
import { toast } from 'react-toastify';

import { doc, updateDoc } from 'firebase/firestore';
import { onMessage } from 'firebase/messaging';

import { db, messaging, requestForToken } from '@myfirebase/config';

import useChatStore from '@store/store';

import makeSoundNotification from '@utils/messages/makeSoundNotification';

import type { IOnMessageListenerPayload } from '@interfaces/IOnMessageListenerPayload';

const useNotification = () => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useEffect(() => {
    if (!currentUserUID) {
      return;
    }

    const fetchTokenAndUpdateProfile = async () => {
      try {
        const token = await requestForToken();

        if (!token) {
          toast.warn(
            'Notification permission was not granted, you do not have token for firebase cloud messaging'
          );
          return;
        }

        await updateDoc(doc(db, 'users', currentUserUID), {
          tokenFCM: token,
        });
      } catch (error) {
        console.error('Error updating token:', error);
      }
    };

    fetchTokenAndUpdateProfile();
  }, [currentUserUID]);

  useEffect(() => {
    const handleNewMessage = async (payload: IOnMessageListenerPayload) => {
      try {
        const { notification } = payload;

        makeSoundNotification();
        toast.info(`${notification.title}: ${notification.body}`);
      } catch (error) {
        console.error('Error handling new message:', error);
      }
    };

    const unsub = onMessage(messaging, payload => {
      handleNewMessage(payload as IOnMessageListenerPayload);
    });

    return () => {
      unsub();
    };
  }, []);
};

export default useNotification;
