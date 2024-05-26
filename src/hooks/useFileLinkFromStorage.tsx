import { useEffect, useRef } from 'react';

import downloadFileFromStorage from '@api/storage/downloadFileFromStorage';
import { FileFromStorage } from 'types/FileFromStorage';

const useFileLinkFromStorage = (file: FileFromStorage) => {
  // const [link, setLink] = useState('');
  const linkFileRef = useRef<string | null>(null);
  // еффект получения ссилки на файл
  useEffect(() => {
    const fetchFileAndSetLink = async () => {
      const fileRef = await downloadFileFromStorage(file.url);
      if (fileRef) {
        linkFileRef.current = fileRef;
      }
      // if (fileRef) {
      //   setLink(fileRef);
      // }
    };

    fetchFileAndSetLink();
  }, [file]);

  return linkFileRef.current;
  // return link;
};

export default useFileLinkFromStorage;
