import { Line } from 'rc-progress';

interface IUploadPhotoFileProps {
  file: File;
  status: number;
}

const UploadPhotoFile = ({ file, status }: IUploadPhotoFileProps) => {

  return (
    <li key={file.name} className="flex justify-between items-center gap-4">
      <div className="flex items-center gap-4">
        <img
          src={URL.createObjectURL(file)}
          alt={`Image ${file.name}`}
          width={48}
          height={48}
        />
        <div className="flex flex-col">
          <p className="text-white w-24 2xl:w-64">{file.name}</p>
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

export default UploadPhotoFile;
