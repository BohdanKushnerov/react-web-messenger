import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import { IMessageFileItemProps } from '@interfaces/IMessageFileItemProps';
import { useFileLinkFromStorage } from '@hooks/useFileLinkFromStorage';

const FileItem = ({ file }: IMessageFileItemProps) => {
  const storageLink = useFileLinkFromStorage(file); // получения ссилки на файл

  const fileType: DefaultExtensionType =
    (file.name.split('.').pop() as DefaultExtensionType) || 'default';

  return (
    <p className="flex gap-1 items-center h-auto w-full sm:w-40 md:w-full">
      <span className="w-10 h-10">
        <FileIcon extension={fileType} {...defaultStyles[fileType]} />
      </span>
      <span className="text-black dark:text-white w-full">{file.name}</span>
      <a className="w-10" target="blank" href={storageLink}>
        Link
      </a>
    </p>
  );
};

export default FileItem;
