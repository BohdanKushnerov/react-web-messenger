import { Dispatch, SetStateAction } from 'react';

export interface IFileInputModalProps {
  setIsModalAddFileOpen: Dispatch<SetStateAction<boolean>>;
  handleToggleModal: () => void;
}
