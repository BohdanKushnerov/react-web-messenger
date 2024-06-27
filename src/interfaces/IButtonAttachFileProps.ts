import type { ReactNode } from 'react';

import type { DocumentData } from 'firebase/firestore';

export interface IButtonAttachFileProps {
  editingMessageInfo: {
    selectedMessage: DocumentData;
  } | null;
  handleClickFileInput: (e: React.MouseEvent) => void;
  children: ReactNode;
}
