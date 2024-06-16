import { useEffect, useState } from 'react';

import downloadFileFromStorage from '@api/storage/downloadFileFromStorage';

import { UseFileLinkFromStorage } from 'types/hooks/UseFileLinkFromStorage';

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
