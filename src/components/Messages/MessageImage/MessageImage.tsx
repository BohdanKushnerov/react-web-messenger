import { FC } from 'react';

import BlurImage from '@components/BlurImage/BlurImage';

import useBlurLoadingImage from '@hooks/useBlurLoadingImage';

import calculateMsgImageHeight from '@utils/messages/calculateMsgImageHeight';
import calculateMsgImageWidth from '@utils/messages/calculateMsgImageWidth';

import { IFile } from '@interfaces/IFile';
import { IMessageImageProps } from '@interfaces/IMessageImageProps';

const MessageImage: FC<IMessageImageProps> = ({
  msg,
  file,
  index,
  handleClickPhoto,
}) => {
  const loadingImg = useBlurLoadingImage(file.url);

  const files: IFile[] = msg.data().file;

  const imgHeight = calculateMsgImageHeight(files, file, index);
  const imgWidth = calculateMsgImageWidth(files, file, index);

  return (
    <BlurImage loading={loadingImg}>
      <button
        className={`${
          loadingImg ? 'invisible' : 'block'
        } cursor-pointer overflow-hidden rounded-md object-cover`}
        style={{
          height: imgHeight,
          width: imgWidth,
        }}
        onClick={() => handleClickPhoto(index)}
        aria-label={file.name}
      >
        <img
          className="h-full w-full object-cover object-center"
          src={file.url}
          alt={file.type}
          loading="lazy"
          id="img"
        />
      </button>
    </BlurImage>
  );
};

export default MessageImage;
