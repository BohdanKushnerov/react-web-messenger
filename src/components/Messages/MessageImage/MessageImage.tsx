import type { FC } from 'react';

import classNames from 'classnames';
import type { DocumentData } from 'firebase/firestore';

import BlurImage from '@components/common/BlurImage/BlurImage';

import useBlurLoadingImage from '@hooks/useBlurLoadingImage';

import calculateMessageImageHeight from '@utils/messages/calculateMessageImageHeight';
import calculateMessageImageWidth from '@utils/messages/calculateMessageImageWidth';

import type { IFile } from '@interfaces/IFile';

import { ElementsId } from '@enums/elementsId';

interface IMessageImageProps {
  msg: DocumentData;
  file: IFile;
  index: number;
  handleClickPhoto: (index: number) => void;
}

const MessageImage: FC<IMessageImageProps> = ({
  msg,
  file,
  index,
  handleClickPhoto,
}) => {
  const loadingImg = useBlurLoadingImage(file.url);

  const files: IFile[] = msg.data().file;

  const imgHeight = calculateMessageImageHeight(files, file, index);
  const imgWidth = calculateMessageImageWidth(files, file, index);

  return (
    <BlurImage loading={loadingImg}>
      <button
        className={classNames(
          'cursor-pointer overflow-hidden rounded-md object-cover',
          {
            invisible: loadingImg,
            block: !loadingImg,
          }
        )}
        style={{
          height: imgHeight,
          width: imgWidth,
        }}
        type="button"
        onClick={() => handleClickPhoto(index)}
        aria-label={file.name}
      >
        <img
          className="h-full w-full object-cover object-center"
          src={file.url}
          alt={file.type}
          loading="lazy"
          id={ElementsId.Img}
        />
      </button>
    </BlurImage>
  );
};

export default MessageImage;
