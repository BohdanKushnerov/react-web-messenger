import { FC, Suspense, lazy } from 'react';

import MessageImage from '../MessageImage/MessageImage';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';
const Lightbox = lazy(() => import('yet-another-react-lightbox'));
import 'yet-another-react-lightbox/styles.css';
import getSlidesForLightbox from '@utils/messages/getSlidesForLightbox';
import getMessageImages from '@utils/messages/getMessageImages';
import { IMessageImagesWithLightBoxProps } from '@interfaces/IMessageImagesWithLightBoxProps';
import { IFile } from '@interfaces/IFile';

const MessageImagesWithLightBox: FC<IMessageImagesWithLightBoxProps> = ({
  msg,
  indexClickedPhoto,
  handleClickPhoto,
}) => {
  const slidesForLightbox = getSlidesForLightbox(msg);

  const imagesForMessage = getMessageImages(msg);

  return (
    <>
      {imagesForMessage &&
        imagesForMessage.map((fileInside: IFile, index: number) => {
          if (fileInside.type.includes('image')) {
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
            slides={slidesForLightbox}
            open={indexClickedPhoto >= 0}
            close={() => handleClickPhoto(-1)}
            carousel={{
              finite: true,
            }}
            styles={{
              container: {
                backgroundColor: 'rgb(51 65 85 / 0.7)',
              },
            }}
          />
        </Suspense>
      )}
    </>
  );
};

export default MessageImagesWithLightBox;
