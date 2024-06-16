import { ReactNode } from 'react';

import { DocumentData } from 'firebase/firestore';

export interface IButtonAttachFileProps {
  editingMessageInfo: {
    selectedMessage: DocumentData;
  } | null;
  handleClickFileInput: (e: React.MouseEvent) => void;
  children: ReactNode;
}
