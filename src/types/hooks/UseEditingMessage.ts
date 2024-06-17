import { RefObject } from 'react';

import { DocumentData } from 'firebase/firestore';

export type UseEditingMessage = (
  chatUID: string | null,
  inputRef: RefObject<HTMLInputElement>,
  setMessage: (msg: string | ((prev: string) => string)) => void,
  editingMessageInfo: {
    selectedMessage: DocumentData;
  } | null,
  resetEditingMessage: () => void
) => void;
