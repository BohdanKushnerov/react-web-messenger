import { useEffect, useState } from 'react';

import { onValue, ref } from 'firebase/database';

import { database } from '@myfirebase/config';

import { UseIsOnlineStatus } from 'types/hooks/UseIsOnlineStatus';

const useIsOnlineStatus: UseIsOnlineStatus = (userUID: string | null) => {
  const [isOnline, setIsOnline] = useState<boolean | null>(null);

  useEffect(() => {
    if (!userUID) return;
    const dbRef = ref(database, 'status/' + userUID);

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
