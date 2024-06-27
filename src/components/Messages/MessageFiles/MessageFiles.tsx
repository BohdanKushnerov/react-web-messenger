import type { FC } from 'react';

import MessageFile from '../MessageFile/MessageFile';

import type { IFile } from '@interfaces/IFile';
import type { IMessageFilesProps } from '@interfaces/IMessageFilesProps';

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
