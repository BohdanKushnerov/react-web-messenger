import { FC } from 'react';
import { DocumentData } from 'firebase/firestore';

interface IFile {
  url: string;
  name: string;
  type: string;
}

interface IMessageImageItemProps {
  msg: DocumentData;
  file: IFile;
  index: number;
}

const MessageImageItem: FC<IMessageImageItemProps> = ({ msg, file, index }) => {
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
      // key={index}
      src={file.url}
      alt={file.type}
      style={imageStyle}
      loading="lazy"
    />
  );
};

export default MessageImageItem;
