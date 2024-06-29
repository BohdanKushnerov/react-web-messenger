import type { IFile } from '@interfaces/IFile';

const calculateMessageImageWidth = (
  files: IFile[],
  file: IFile,
  index: number
) => {
  const height = file.height ?? 0;
  const width = file.width ?? 0;
  const isWideImage = width / height > 1.4;
  const isSingleFile = files.length === 1;
  const isFirstOrSecondIndex = index <= 1;

  if (isSingleFile) {
    return isWideImage ? 336 : 200;
  }

  return isFirstOrSecondIndex ? 159 : 78.5;
};

export default calculateMessageImageWidth;
