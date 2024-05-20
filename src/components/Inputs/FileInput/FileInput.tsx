import { FC } from 'react';

import { IFileInputProps } from '@interfaces/IFileInputProps';

const FileInput: FC<IFileInputProps> = ({
  handleChangeFileInput,
  fileInputRef,
}) => {
  return (
    <input
      style={{ display: 'none' }}
      type="file"
      multiple
      onChange={handleChangeFileInput}
      ref={fileInputRef}
    />
  );
};

export default FileInput;
