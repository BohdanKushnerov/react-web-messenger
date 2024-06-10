import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import '@i18n';

const useDefaultLanguage = () => {
  const { i18n } = useTranslation('translation', {
    keyPrefix: 'NavBar',
  });

  useEffect(() => {
    if (localStorage.language) {
      return;
    }

    const userLanguage = navigator.language;

    if (userLanguage === 'uk-UA') {
      localStorage.setItem('language', 'ua');
      i18n.changeLanguage('ua');
    } else if (userLanguage === 'ru-RU') {
      localStorage.setItem('language', 'ru');
      i18n.changeLanguage('ru');
    } else {
      localStorage.setItem('language', 'en');
      i18n.changeLanguage('en');
    }
  }, [i18n]);
};

export default useDefaultLanguage;
