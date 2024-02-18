import { FC, Suspense, lazy } from 'react';

import MessageImage from '../MessageImage/MessageImage';
const Lightbox = lazy(() => import('yet-another-react-lightbox'));
import 'yet-another-react-lightbox/styles.css';
import { IMessageImagesWithLightBoxProps } from '@interfaces/IMessageImagesWithLightBoxProps';
import { IFile } from '@interfaces/IFile';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

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
      {indexClickedPhoto >= 0 && (
        <Suspense
          fallback={
            <div className="absolute">
              <LoaderUIActions size={200} />
            </div>
          }
        >
          <Lightbox
            index={indexClickedPhoto}
            slides={slidesForLightBox}
            open={indexClickedPhoto >= 0}
            close={() => handleClickPhoto(-1)}
          />
        </Suspense>
      )}
    </>
  );
};

export default MessageImagesWithLightBox;
