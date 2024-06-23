import { DocumentData } from 'firebase/firestore';

import { IFile } from '@interfaces/IFile';

const getFilesWithoutImages = (msg: DocumentData): IFile[] | null => {
  const files = msg
    .data()
    .file?.filter((file: IFile) => !file.type.includes('image'));

  return files || null;
};

export default getFilesWithoutImages;
