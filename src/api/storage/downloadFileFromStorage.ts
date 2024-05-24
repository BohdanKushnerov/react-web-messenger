import { getDownloadURL, ref } from 'firebase/storage';

import { storage } from '@myfirebase/config';

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

export default downloadFileFromStorage;
