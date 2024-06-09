import { useEffect, useState } from 'react';

import downloadFileFromStorage from '@api/storage/downloadFileFromStorage';
import { FileFromStorage } from 'types/FileFromStorage';

const useFileLinkFromStorage = (file: FileFromStorage) => {
  const [linkFile, setLinkFile] = useState<string | null>(null);
  useEffect(() => {
    const fetchFileAndSetLink = async () => {
      const fileRef = await downloadFileFromStorage(file.url);
      if (fileRef) {
        setLinkFile(fileRef);
      }
    };

    fetchFileAndSetLink();
  }, [file]);

  return linkFile;
};

export default useFileLinkFromStorage;
