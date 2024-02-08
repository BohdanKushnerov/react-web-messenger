import { Dispatch, RefObject, SetStateAction } from 'react';

export interface IFileInputModalProps {
  hiddenFileInput: RefObject<HTMLInputElement>;
  setIsModalAddFileOpen: Dispatch<SetStateAction<boolean>>;
  handleToggleModal: () => void;
}
