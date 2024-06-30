import { type ChangeEvent, forwardRef } from 'react';

interface IFileInputProps {
  handleChangeFileInput: (event: ChangeEvent<HTMLInputElement>) => void;
}
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
