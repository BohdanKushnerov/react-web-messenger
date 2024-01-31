import { FC } from 'react';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import { IMessageFileItemProps } from '@interfaces/IMessageFileItemProps';
import { useFileLinkFromStorage } from '@hooks/useFileLinkFromStorage';

const FileItem: FC<IMessageFileItemProps> = ({ file }) => {
  const storageLink = useFileLinkFromStorage(file); // получения ссилки на файл

  const fileType: DefaultExtensionType =
    (file.name.split('.').pop() as DefaultExtensionType) || 'default';

  return (
    <div className="flex gap-1 items-center h-auto w-full">
      {file.type.includes('audio') ? (
        <div>
          <audio controls className="">
            <source src={file.url} type="audio/webm"></source>
          </audio>
        </div>
      ) : (
        <>
          <span className="w-10 h-10">
            <FileIcon extension={fileType} {...defaultStyles[fileType]} />
          </span>
          <span className="text-black dark:text-white w-full">{file.name}</span>
          <a className="w-10" target="blank" href={storageLink}>
            Link
          </a>
        </>
      )}
    </div>
  );
};

export default FileItem;
