import { FC } from 'react';

import MessageFile from '../MessageFile/MessageFile';

import { IFile } from '@interfaces/IFile';
import { IMessageFilesProps } from '@interfaces/IMessageFilesProps';

const MessageFiles: FC<IMessageFilesProps> = ({ filteredFiles }) => {
  return (
    <>
      {filteredFiles?.map((fileInside: IFile) => (
        <MessageFile
          key={`${fileInside.name}-${fileInside.type}`}
          file={fileInside}
        />
      ))}
    </>
  );
};

MessageFiles.displayName = 'MessageFiles';

export default MessageFiles;
