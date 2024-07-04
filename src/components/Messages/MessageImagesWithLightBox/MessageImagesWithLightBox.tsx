import type { FC } from 'react';
import { Suspense, lazy, useState } from 'react';
import 'yet-another-react-lightbox/styles.css';

import classNames from 'classnames';
import type { DocumentData } from 'firebase/firestore';

import MessageImage from '../MessageImage/MessageImage';

import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';

import useChatStore from '@store/store';

import getMessageImages from '@utils/messages/getMessageImages';
import getSlidesForLightbox from '@utils/messages/getSlidesForLightbox';

import type { IFile } from '@interfaces/IFile';

import { ElementsId } from '@enums/elementsId';

interface IMessageImagesWithLightBoxProps {
  msg: DocumentData;
}

const LightBox = lazy(() => import('yet-another-react-lightbox'));

const MessageImagesWithLightBox: FC<IMessageImagesWithLightBoxProps> = ({
  msg,
}) => {
  const [indexClickedPhoto, setIndexClickedPhoto] = useState(-1);

  const isSelectedMessages = useChatStore(state => state.isSelectedMessages);

  const slidesForLightBox = getSlidesForLightbox(msg);
  const imagesForMessage = getMessageImages(msg);

  const handleClickPhoto = (index: number) => {
    if (!isSelectedMessages) {
      setIndexClickedPhoto(index);
    }
  };

  return (
    <>
      {msg.data().file?.some((file: IFile) => file.type.includes('image')) && (
        <div
          id={ElementsId.LightBoxContainer}
          className={classNames(
            'flex flex-wrap gap-0.5 sm:justify-center lg:justify-normal',
            {
              'max-w-md': msg.data()?.file?.length === 1,
              'w-160px max-w-xs lg:w-full': !(msg.data()?.file?.length === 1),
            }
          )}
        >
          {imagesForMessage.map((fileInside: IFile, index: number) => {
            if (fileInside.type.includes('image')) {
              return (
                <MessageImage
                  key={`${fileInside.name}-${fileInside.type}`}
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
              <div onContextMenu={event => event.stopPropagation()}>
                <LightBox
                  index={indexClickedPhoto}
                  slides={slidesForLightBox}
                  open={indexClickedPhoto >= 0}
                  close={() => handleClickPhoto(-1)}
                  carousel={{
                    finite: true,
                  }}
                  styles={{
                    container: {
                      pointerEvents: 'auto',
                      backgroundColor: 'rgb(51 65 85 / 0.7)',
                    },
                  }}
                />
              </div>
            </Suspense>
          )}
        </div>
      )}
    </>
  );
};

export default MessageImagesWithLightBox;
