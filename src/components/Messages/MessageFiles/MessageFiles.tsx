import { FC, memo } from 'react';

import MessageFile from '../MessageFile/MessageFile';

import getFilesWithoutImages from '@utils/messages/getFilesWithoutImages';

import { IFile } from '@interfaces/IFile';
import { IMessageFilesProps } from '@interfaces/IMessageFilesProps';

const MessageFiles: FC<IMessageFilesProps> = memo(({ msg }) => {
  const filteredFiles = getFilesWithoutImages(msg);

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
});

MessageFiles.displayName = 'MessageFiles';

export default MessageFiles;
