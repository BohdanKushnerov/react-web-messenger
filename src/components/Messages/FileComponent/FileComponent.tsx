import type { FC } from 'react';
import type { DefaultExtensionType } from 'react-file-icon';
import { FileIcon, defaultStyles } from 'react-file-icon';

import useFileLinkFromStorage from '@hooks/messages/useFileLinkFromStorage';

import type { IFile } from '@interfaces/IFile';

interface IFileComponentProps {
  file: IFile;
}

const FileComponent: FC<IFileComponentProps> = ({ file }) => {
  const storageLink = useFileLinkFromStorage(file);
  const fileType: DefaultExtensionType =
    (file.name.split('.').pop() as DefaultExtensionType) || 'default';

  return (
    <div className="flex h-40px w-full max-w-200px items-center gap-1">
      {storageLink && (
        <>
          <span className="h-10 w-10">
            <FileIcon extension={fileType} {...defaultStyles[fileType]} />
          </span>
          <span className="w-full text-black dark:text-white">{file.name}</span>
          <a className="w-10" target="blank" href={storageLink}>
            Link
          </a>
        </>
      )}
    </div>
  );
};

export default FileComponent;
