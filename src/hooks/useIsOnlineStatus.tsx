import { useEffect, useState } from 'react';
import { onValue, ref } from 'firebase/database';

import { database } from '@myfirebase/config';

const useIsOnlineStatus = (userUID: string | null) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  // следим за состоянием онлайн/офлайн
  useEffect(() => {
    if (!userUID) return;
    const dbRef = ref(database, 'status/' + userUID);

    // Устанавливаем слушатель для данных
    const unsubOnlineStatus = onValue(dbRef, snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        setIsOnline(data);
      } else {
        setIsOnline(false);
      }
    });

    return () => {
      unsubOnlineStatus();
    };
  }, [userUID]);

  return isOnline;
};

export default useIsOnlineStatus;
