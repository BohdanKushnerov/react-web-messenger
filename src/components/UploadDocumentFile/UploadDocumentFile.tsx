import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';
import { Line } from 'rc-progress';

interface IUploadDocumentFileProps {
  fileType: DefaultExtensionType;
  file: File;
  status: number;
}

const UploadDocumentFile = ({
  fileType,
  file,
  status,
}: IUploadDocumentFileProps) => {

  return (
    <li key={file.name} className="flex justify-between items-center gap-4">
      <div className="flex gap-4">
        <span className="w-10 h-10">
          <FileIcon extension={fileType} {...defaultStyles[fileType]} />
        </span>
        <div className="flex flex-col">
          <p className="text-white">{file.name}</p>
          <p className="text-gray-500">
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
