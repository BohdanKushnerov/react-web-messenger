import { useEffect, useState } from 'react';

import { downloadFileFromStorage } from '@api/storage/downloadFileFromStorage';
import { FileFromStorage } from 'types/FileFromStorage';

export const useFileLinkFromStorage = (file: FileFromStorage) => {
  const [link, setLink] = useState('');
  // еффект получения ссилки на файл
  useEffect(() => {
    const fetchFileAndSetLink = async () => {
      const refFile = await downloadFileFromStorage(file.url);
      if (refFile) {
        setLink(refFile);
      }
    };

    fetchFileAndSetLink();
  }, [file]);

  return link;
};
