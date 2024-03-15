import { FC } from 'react';

import MessageFile from '../MessageFile/MessageFile';
import getFilesWithoutImages from '@utils/messages/getFilesWithoutImages';
import { IMessageFilesProps } from '@interfaces/IMessageFilesProps';
import { IFile } from '@interfaces/IFile';

const MessageFiles: FC<IMessageFilesProps> = ({ msg }) => {
  const filteredFiles = getFilesWithoutImages(msg);

  return (
    <>
      {filteredFiles &&
        filteredFiles.map((fileInside: IFile, index: number) => (
          <MessageFile key={index} file={fileInside} />
        ))}
    </>
  );
};

export default MessageFiles;
