import { DocumentData } from 'firebase/firestore';

import { IFile } from '@interfaces/IFile';

function getMessageImages(msg: DocumentData) {
  return (
    msg.data().file &&
    msg
      .data()
      .file.map((file: IFile) => {
        if (file.type.includes('image')) {
          return file;
        }
        return null; // or handle other types if needed
      })
      .filter((slide: IFile | null) => slide !== null)
  );
}

export default getMessageImages;
