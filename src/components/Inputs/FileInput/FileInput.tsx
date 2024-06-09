import { forwardRef } from 'react';

import { IFileInputProps } from '@interfaces/IFileInputProps';

const FileInput = forwardRef<HTMLInputElement, IFileInputProps>(
  ({ handleChangeFileInput }, ref) => {
    return (
      <input
        style={{ display: 'none' }}
        type="file"
        multiple
        onChange={handleChangeFileInput}
        ref={ref}
      />
    );
  }
);

export default FileInput;
