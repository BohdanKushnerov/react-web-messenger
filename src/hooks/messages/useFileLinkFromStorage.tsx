import { useEffect, useState } from 'react';

import downloadFileFromStorage from '@api/storage/downloadFileFromStorage';

import type { FileFromStorage } from 'types/FileFromStorage';

type UseFileLinkFromStorage = (file: FileFromStorage) => string | null;

const useFileLinkFromStorage: UseFileLinkFromStorage = file => {
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
