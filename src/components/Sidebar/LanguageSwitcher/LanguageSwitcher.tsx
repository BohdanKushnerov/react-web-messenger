import type { FC } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import { defaultNS } from '@i18n/i18n';

const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation(defaultNS, {
    keyPrefix: 'NavBar',
  });

  const changeLanguage = (lng: string) => {
    localStorage.setItem('language', lng);
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  const languages = [
    { code: 'en', label: t('English') },
    { code: 'ua', label: t('Ukrainian') },
    { code: 'ru', label: t('Russian') },
  ];

  return (
    <div className="flex flex-col rounded-md border border-darkZinc p-1 dark:border-darkZinc">
      <h2 className="text-center font-extrabold text-black dark:text-white">
        {t('Language')}
      </h2>
      <div className="flex">
        {languages.map(language => (
          <button
            key={language.code}
            className={classNames(
              'w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-extraDarkGray dark:text-mediumGray dark:hover:text-extraDarkGray disabled:dark:text-extraDarkGray',
              {
                'bg-mediumZinc dark:bg-mediumGray dark:text-extraDarkGray':
                  currentLanguage === language.code,
                'hover:bg-mediumDarkGray dark:hover:bg-main':
                  currentLanguage !== language.code,
              },
              'rounded-md transition-all duration-300 disabled:pointer-events-none'
            )}
            type="button"
            onClick={() => changeLanguage(language.code)}
            aria-label={`Choose ${language.label} language`}
            disabled={currentLanguage === language.code}
          >
            {language.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default LanguageSwitcher;
