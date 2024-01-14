import { useEffect } from 'react';
import { onDisconnect, ref, set } from 'firebase/database';

import { database } from '@myfirebase/config';
import useChatStore from '@zustand/store';

const useIsOnlineMyStatus = () => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useEffect(() => {
    if (currentUserUID) {
      const dbRef = ref(database, 'status/' + currentUserUID);

      // Устанавливаем онлайн-статус при входе
      set(dbRef, true);

      // Устанавливаем обработчик отключения
      const disconnectRef = onDisconnect(dbRef);

      // Устанавливаем офлайн-статус при отключении
      disconnectRef.set(false);

      return () => {
        // Очищаем обработчик отключения при размонтировании компонента
        disconnectRef.cancel();
        // Устанавливаем офлайн-статус при размонтировании компонента
        set(dbRef, false);
      };
    }
  }, [currentUserUID]);
};

export default useIsOnlineMyStatus;
