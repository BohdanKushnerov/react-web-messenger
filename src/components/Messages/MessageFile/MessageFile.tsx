import { FC } from 'react';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import AudioComponent from '../AudioComponent/AudioComponent';
import VideoComponent from '../VideoComponent/VideoComponent';

import useFileLinkFromStorage from '@hooks/useFileLinkFromStorage';

import { IMessageFileProps } from '@interfaces/IMessageFileProps';

const MessageFile: FC<IMessageFileProps> = ({ file }) => {
  const storageLink = useFileLinkFromStorage(file);
  const fileType: DefaultExtensionType =
    (file.name.split('.').pop() as DefaultExtensionType) || 'default';

  if (file.type.includes('video')) {
    return <VideoComponent source={file.url} />;
  } else if (file.type.includes('audio')) {
    return <AudioComponent audioUrl={file.url} />;
  } else {
    return (
      <div className="flex h-40px w-full max-w-200px items-center gap-1">
        {storageLink && (
          <>
            <span className="h-10 w-10">
              <FileIcon extension={fileType} {...defaultStyles[fileType]} />
            </span>
            <span className="w-full text-black dark:text-white">
              {file.name}
            </span>
            <a className="w-10" target="blank" href={storageLink}>
              Link
            </a>
          </>
        )}
      </div>
    );
  }
};

export default MessageFile;
