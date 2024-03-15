import { DocumentData } from 'firebase/firestore';

import { IFile } from '@interfaces/IFile';

function getFilesWithoutImages(msg: DocumentData) {
  return (
    msg.data().file &&
    msg
      .data()
      .file.map((file: IFile) => {
        if (
          !(
            file.type === 'image/png' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/webp'
          )
        ) {
          return file;
        }
        return null; // or handle other types if needed
      })
      .filter((slideOfFile: IFile | null) => slideOfFile !== null)
  );
}

export default getFilesWithoutImages;
