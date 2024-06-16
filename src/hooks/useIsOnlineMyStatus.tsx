import { useEffect } from 'react';

import { onDisconnect, ref, set } from 'firebase/database';

import { database } from '@myfirebase/config';

import useChatStore from '@zustand/store';

const useIsOnlineMyStatus = () => {
  const currentUserUID = useChatStore(state => state.currentUser.uid);

  useEffect(() => {
    if (currentUserUID) {
      const dbRef = ref(database, 'status/' + currentUserUID);
      set(dbRef, true);

      const disconnectRef = onDisconnect(dbRef);
      disconnectRef.set(false);

      return () => {
        disconnectRef.cancel();
        set(dbRef, false);
      };
    }
  }, [currentUserUID]);
};

export default useIsOnlineMyStatus;
