import { DocumentData } from 'firebase/firestore';

import { IFile } from '@interfaces/IFile';

function getSlidesForLightbox(msg: DocumentData) {
  return (
    msg.data().file &&
    msg
      .data()
      .file.map((file: IFile) => {
        if (file.type.includes('image')) {
          return { src: file.url };
        }
        return null;
      })
      .filter((slide: IFile | null) => slide !== null)
  );
}

export default getSlidesForLightbox;
