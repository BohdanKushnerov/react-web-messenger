import type { FC } from 'react';

import { Line } from 'rc-progress';

interface IUploadPhotoFileProps {
  file: File;
  status: number;
}
const UploadPhotoFile: FC<IUploadPhotoFileProps> = ({ file, status }) => {
  return (
    <li key={file.name} className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-4">
        <img
          src={URL.createObjectURL(file)}
          alt={file.name}
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <p className="w-24 text-black dark:text-white 2xl:w-64">
            {file.name}
          </p>
          <p className="text-mediumGray">
            {`${(file.size / 1024).toFixed(2)} KB`}
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

export default UploadPhotoFile;
