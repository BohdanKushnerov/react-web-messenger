import { useEffect } from 'react';

import { auth } from '@myfirebase/config';

import useChatStore from '@state/store';

const useOnAuthStateChanged = () => {
  const updateCurrentUser = useChatStore(state => state.updateCurrentUser);

  useEffect(() => {
    const unsub = auth.onAuthStateChanged(authUser => {
      if (authUser) {
        updateCurrentUser(authUser);
      } else {
        updateCurrentUser(null);
      }
    });

    return () => unsub();
  }, [updateCurrentUser]);
};

export default useOnAuthStateChanged;
