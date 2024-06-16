import { FC } from 'react';
import { FileIcon, defaultStyles } from 'react-file-icon';

import { Line } from 'rc-progress';

import { IUploadDocumentFileProps } from '@interfaces/IUploadDocumentFileProps';

const UploadDocumentFile: FC<IUploadDocumentFileProps> = ({
  fileType,
  file,
  status,
}) => {
  return (
    <li key={file.name} className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <span className="w-12">
          <FileIcon extension={fileType} {...defaultStyles[fileType]} />
        </span>
        <div className="flex flex-col">
          <p className="w-24 text-white 2xl:w-64">{file.name}</p>
          <p className="text-veryDarkGray">
            {(file.size / 1024).toFixed(2) + ' KB'}
          </p>
        </div>
      </div>
      {status >= 0 && (
        <Line
          style={{ width: 150 }}
          percent={status}
          strokeWidth={6}
          strokeColor="#5ee987"
        />
      )}
    </li>
  );
};

export default UploadDocumentFile;
