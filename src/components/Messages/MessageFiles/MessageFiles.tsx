import { FC } from 'react';

import MessageFile from '../MessageFile/MessageFile';
import { IMessageFilesProps } from '@interfaces/IMessageFilesProps';
import { IFile } from '@interfaces/IFile';

const MessageFiles: FC<IMessageFilesProps> = ({ msg }) => {
  const filterdeFiles =
    msg.data().file &&
    msg
      .data()
      .file.map((file: IFile) => {
        if (
          !(
            file.type === 'image/png' ||
            file.type === 'image/jpeg' ||
            file.type === 'image/webp'
          )
        ) {
          return file;
        }
        return null; // or handle other types if needed
      })
      .filter(
        (slide: IFile | null) =>
          slide !== null
      );

  return (
    <>
      {filterdeFiles &&
        filterdeFiles.map((fileInside: IFile, index: number) => (
          <MessageFile key={index} file={fileInside} />
        ))}
    </>
  );
};

export default MessageFiles;
