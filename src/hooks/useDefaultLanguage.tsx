import { useEffect } from 'react';

const useDefaultLanguage = () => {
  useEffect(() => {
    if (localStorage.language) {
      return;
    }

    const userLanguage = navigator.language;

    if (userLanguage === 'en-US') {
      localStorage.setItem('language', 'en');
    } else if (userLanguage === 'uk-UA') {
      localStorage.setItem('language', 'ua');
    } else if (userLanguage === 'ru-RU') {
      localStorage.setItem('language', 'ru');
    } else {
      localStorage.setItem('language', 'en');
    }
  }, []);
};

export default useDefaultLanguage;
