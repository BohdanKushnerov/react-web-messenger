import { RefObject } from 'react';

export interface IFileInputProps {
  handleChangeFileInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}
