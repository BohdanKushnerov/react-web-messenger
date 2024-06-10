import { DocumentData } from 'firebase/firestore';

import { IFile } from '@interfaces/IFile';

const getMessageImages = (msg: DocumentData) => {
  const images = msg
    .data()
    .file?.map((file: IFile) => {
      if (file.type.includes('image')) {
        return file;
      }
      return null;
    })
    .filter((slide: IFile | null) => slide !== null);

  return images;
};

export default getMessageImages;
