import type { DocumentData } from 'firebase/firestore';

import type { IFile } from '@interfaces/IFile';

const getSlidesForLightbox = (msg: DocumentData) => {
  const slides = msg
    .data()
    .file?.map((file: IFile) => {
      if (file.type.includes('image')) {
        return { src: file.url };
      }
      return null;
    })
    .filter((slide: IFile | null) => slide !== null);

  return slides;
};

export default getSlidesForLightbox;
