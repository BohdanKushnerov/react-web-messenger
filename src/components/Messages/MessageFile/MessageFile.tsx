import { FC } from 'react';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import VideoComponent from '../VideoComponent/VideoComponent';
import AudioComponent from '../AudioComponent/AudioComponent';
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
      <>
        {storageLink && (
          <div className="flex gap-1 items-center h-auto w-full max-w-[200px]">
            <span className="w-10 h-10">
              <FileIcon extension={fileType} {...defaultStyles[fileType]} />
            </span>
            <span className="text-black dark:text-white w-full">
              {file.name}
            </span>
            <a className="w-10" target="blank" href={storageLink}>
              Link
            </a>
          </div>
        )}
      </>
    );
  }
};

export default MessageFile;
