import { useEffect, useState } from 'react';
import { getDownloadURL, ref } from 'firebase/storage';
import { DefaultExtensionType, FileIcon, defaultStyles } from 'react-file-icon';

import { storage } from '@myfirebase/config';

interface IFileItemProps {
  file: { url: string; name: string; type: string };
}

export default function FileItem({ file }: IFileItemProps) {
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
    if(refFile) {
      setLink(refFile);
    }
  };

  fetchFileAndSetLink();
}, [file]);

  return (
    <p className="flex gap-8 items-center h-12 ">
      <span className="w-10 h-10">
        <FileIcon extension={fileType} {...defaultStyles[fileType]} />
      </span>
      <span className="text-white">{file.name}</span>
      <a href={link}>Link</a>
    </p>
  );
}
