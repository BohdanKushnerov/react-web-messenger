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

  function calculateWidth(file: IFile) {
    const height = file.height;
    const width = file.width;

    if (width / height > 1.4) {
      return files.length === 1 ? 336 : index === 0 || index === 1 ? 159 : 78.5;
    } else {
      return files.length === 1 ? 200 : index === 0 || index === 1 ? 159 : 78.5;
    }
  }

  function calculateHeight(file: IFile) {
    const height = file.height;
    const width = file.width;

    if (height / width > 1.4) {
      return files.length === 1 ? 336 : index === 0 || index === 1 ? 159 : 78.5;
    } else {
      return files.length === 1 ? 200 : index === 0 || index === 1 ? 159 : 78.5;
    }
  }

  return (
    <img
      className="cursor-pointer object-cover rounded-md"
      src={file.url}
      alt={file.type}
      style={{
        width: calculateWidth(file),
        height: calculateHeight(file),
      }}
      loading="lazy"
      onClick={() => handleClickPhoto(index)}
      id="img"
    />
  );
};

export default MessageImage;

// const files: IFile[] = msg.data().file;

// width={files.length === 1 ? 336 : index === 0 || index === 1 ? 159 : 78}
// height={files.length === 1 ? 200 : index === 0 || index === 1 ? 159 : 78}

// width={files.length === 1 ? 448 : index === 0 ? 320 : 159}
// height={files.length === 1 ? 400 : index === 0 ? 320 : 159}
// width={files.length === 1 ? 224 : index === 0 || index === 1 ? 159 : 78}
// height={files.length === 1 ? 200 : index === 0 || index === 1 ? 159 : 78}
