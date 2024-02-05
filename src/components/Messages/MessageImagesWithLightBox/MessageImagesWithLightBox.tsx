import { FC } from 'react';

import MessageImage from '../MessageImage/MessageImage';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { IFile } from '@interfaces/IFile';
import { IMessageImagesWithLightBoxProps } from '@interfaces/IMessageImagesWithLightBoxProps';

const MessageImagesWithLightBox: FC<IMessageImagesWithLightBoxProps> = ({
  msg,
  indexClickedPhoto,
  handleClickPhoto,
}) => {
  const slidesForLightBox =
    msg.data().file &&
    msg
      .data()
      .file.map((file: IFile) => {
        if (
          file.type === 'image/png' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/webp'
        ) {
          return { src: file.url };
        }
        return null; // or handle other types if needed
      })
      .filter((slide: IFile | null) => slide !== null);

  const slidesForImages =
    msg.data().file &&
    msg
      .data()
      .file.map((file: IFile) => {
        if (
          file.type === 'image/png' ||
          file.type === 'image/jpeg' ||
          file.type === 'image/webp'
        ) {
          return file;
        }
        return null; // or handle other types if needed
      })
      .filter((slide: IFile | null) => slide !== null);

  return (
    <>
      {slidesForImages &&
        slidesForImages.map((fileInside: IFile, index: number) => {
          if (
            fileInside.type === 'image/png' ||
            fileInside.type === 'image/jpeg' ||
            fileInside.type === 'image/webp'
          ) {
            return (
              <MessageImage
                key={index}
                msg={msg}
                file={fileInside}
                index={index}
                handleClickPhoto={handleClickPhoto}
              />
            );
          }
          return null;
        })}
      <Lightbox
        index={indexClickedPhoto}
        slides={slidesForLightBox}
        open={indexClickedPhoto >= 0}
        close={() => handleClickPhoto(-1)}
      />
    </>
  );
};

export default MessageImagesWithLightBox;
