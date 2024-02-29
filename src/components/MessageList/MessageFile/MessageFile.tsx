import { FC } from 'react';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import { useFileLinkFromStorage } from '@hooks/useFileLinkFromStorage';
import { IMessageFileProps } from '@interfaces/IMessageFileProps';
import VideoComponent from '../VideoComponent/VideoComponent';

const MessageFile: FC<IMessageFileProps> = ({ file }) => {
  const storageLink = useFileLinkFromStorage(file); // получения ссилки на файл

  const fileType: DefaultExtensionType =
    (file.name.split('.').pop() as DefaultExtensionType) || 'default';

  if (file.type.includes('video')) {
    return (
      <div className="flex gap-1 items-center h-auto w-full">
        <VideoComponent source={file.url} />
      </div>
    );
  } else if (file.type.includes('audio')) {
    return (
      <div className="flex gap-1 items-center h-auto w-full">
        <audio controls className="w-72 sm:w-40 md:w-72">
          <source src={file.url} type="audio/webm"></source>
        </audio>
      </div>
    );
  }

  return (
    <div className="flex gap-1 items-center h-auto w-full">
      <span className="w-10 h-10">
        <FileIcon extension={fileType} {...defaultStyles[fileType]} />
      </span>
      <span className="text-black dark:text-white w-full">{file.name}</span>
      <a className="w-10" target="blank" href={storageLink}>
        Link
      </a>
    </div>
  );
};

export default MessageFile;
