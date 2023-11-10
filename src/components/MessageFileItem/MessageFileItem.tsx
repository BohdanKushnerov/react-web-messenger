import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import { storage } from '@myfirebase/config';
import { IMessageFileItemProps } from '@interfaces/IMessageFileItemProps';

function FileItem({ file }: IMessageFileItemProps) {
  const [link, setLink] = useState('');

  const fileType: DefaultExtensionType =
    (file.name.split('.').pop() as DefaultExtensionType) || 'default';

  useEffect(() => {
    const downloadFileFromStorage = async (url: string) => {
      const httpsReference = ref(storage, url);

      try {
        const refer = await getDownloadURL(httpsReference);
        return refer;
      } catch (error) {
        console.error('Ошибка при получении URL:', error);
        return null;
      }
    };

    const fetchFileAndSetLink = async () => {
      const refFile = await downloadFileFromStorage(file.url);
      if (refFile) {
        setLink(refFile);
      }
    };

    fetchFileAndSetLink();
  }, [file]);

  return (
    <p className="w-124px lg:w-304px flex gap-8 items-center h-12 ">
      <span className="w-10 h-10">
        <FileIcon extension={fileType} {...defaultStyles[fileType]} />
      </span>
      <span className="text-white">{file.name}</span>
      <a target="blank" href={link}>
        Link
      </a>
    </p>
  );
}

export default FileItem;