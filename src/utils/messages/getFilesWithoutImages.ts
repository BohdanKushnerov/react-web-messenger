import { DocumentData } from 'firebase/firestore';

import { IFile } from '@interfaces/IFile';

const getFilesWithoutImages = (msg: DocumentData) => {
  const files = msg
    .data()
    .file?.map((file: IFile) => {
      if (!file.type.includes('image')) {
        return file;
      }
      return null;
    })
    .filter((slideOfFile: IFile | null) => slideOfFile !== null);

  return files;
};

export default getFilesWithoutImages;
