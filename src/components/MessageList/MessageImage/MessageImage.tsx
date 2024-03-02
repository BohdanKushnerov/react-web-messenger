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

  const getImageStyle = () => {
    // const width = files.length === 1 ? 448 : index === 0 ? 320 : 159;
    // const height = 'auto';
    // const maxHeight = files.length === 1 ? 400 : index === 0 ? 320 : 159;
    const objectFit = 'cover' as const;
    const borderRadius = 6;

    return {
      // width,
      // height,
      // maxHeight,
      objectFit,
      borderRadius,
    };
  };

  const imageStyle = getImageStyle();

  return (
    <img
      className="cursor-pointer"
      src={file.url}
      alt={file.type}
      style={imageStyle}
      // width={files.length === 1 ? 448 : index === 0 ? 320 : 159}
      // height={files.length === 1 ? 400 : index === 0 ? 320 : 159}
      width={files.length === 1 ? 224 : index === 0 || index === 1 ? 159 : 78}
      height={files.length === 1 ? 200 : index === 0 || index === 1 ? 159 : 78}
      loading="lazy"
      onClick={() => handleClickPhoto(index)}
      id="img"
    />
  );
};

export default MessageImage;
