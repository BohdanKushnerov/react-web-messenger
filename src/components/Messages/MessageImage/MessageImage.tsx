import { FC } from 'react';
import { IFile } from '@interfaces/IFile';
import { IMessageImageProps } from '@interfaces/IMessageImageProps';

const MessageImage: FC<IMessageImageProps> = ({
  msg,
  file,
  index,
  handleClickPhoto,
}) => {
  const files: IFile[] = msg.data().file;

  const getImageStyle = (files: IFile[], index: number) => {
    const width = files.length === 1 ? 448 : index === 0 ? 320 : 159;
    const height = 'auto';
    const maxHeight = files.length === 1 ? 400 : index === 0 ? 320 : 159;
    const objectFit = 'cover' as const;
    const borderRadius = 6;

    return {
      width,
      height,
      maxHeight,
      objectFit,
      borderRadius,
    };
  };

  const imageStyle = getImageStyle(files, index);

  return (
    <img
      className="cursor-pointer"
      src={file.url}
      alt={file.type}
      style={imageStyle}
      loading="lazy"
      onClick={() => handleClickPhoto(index)}
    />
  );
};

export default MessageImage;
