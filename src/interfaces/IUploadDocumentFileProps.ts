import { DefaultExtensionType } from 'react-file-icon';

export interface IUploadDocumentFileProps {
  fileType: DefaultExtensionType;
  file: File;
  status: number;
}
