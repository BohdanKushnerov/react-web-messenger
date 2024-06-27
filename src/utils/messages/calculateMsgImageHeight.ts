import type { IFile } from '@interfaces/IFile';

const calculateMsgImageHeight = (
  files: IFile[],
  file: IFile,
  index: number
) => {
  const height = file.height ?? 0;
  const width = file.width ?? 0;
  const isTallImage = height / width > 1.4;
  const isSingleFile = files.length === 1;

  if (isSingleFile) {
    return isTallImage ? 336 : 200;
  }

  return index <= 1 ? 159 : 78.5;
};

export default calculateMsgImageHeight;
