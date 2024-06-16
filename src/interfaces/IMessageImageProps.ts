import { DocumentData } from 'firebase/firestore';

import { IFile } from './IFile';

export interface IMessageImageProps {
  msg: DocumentData;
  file: IFile;
  index: number;
  handleClickPhoto: (index: number) => void;
}
