import { IFile } from '@interfaces/IFile';

const calculateMsgImageWidth = (files: IFile[], file: IFile, index: number) => {
  const height = file.height ?? 0;
  const width = file.width ?? 0;

  if (width / height > 1.4) {
    return files.length === 1 ? 336 : index <= 1 ? 159 : 78.5;
  } else {
    return files.length === 1 ? 200 : index <= 1 ? 159 : 78.5;
  }
};

export default calculateMsgImageWidth;
