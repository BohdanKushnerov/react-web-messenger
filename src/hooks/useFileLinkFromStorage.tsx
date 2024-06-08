import { useEffect, useRef } from 'react';

import downloadFileFromStorage from '@api/storage/downloadFileFromStorage';
import { FileFromStorage } from 'types/FileFromStorage';

const useFileLinkFromStorage = (file: FileFromStorage) => {
  const linkFileRef = useRef<string | null>(null);
  useEffect(() => {
    const fetchFileAndSetLink = async () => {
      const fileRef = await downloadFileFromStorage(file.url);
      if (fileRef) {
        linkFileRef.current = fileRef;
      }
    };

    fetchFileAndSetLink();
  }, [file]);

  return linkFileRef.current;
};

export default useFileLinkFromStorage;
