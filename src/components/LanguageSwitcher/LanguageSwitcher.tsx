// LanguageSwitcher.js
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: FC = () => {
  const { i18n, t } = useTranslation('translation', {
    keyPrefix: 'NavBar',
  });

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language;

  return (
    <div className="flex flex-col p-1 border border-zinc-600 dark:border-zinc-500 rounded-md">
      <h2 className="text-center font-extrabold text-black dark:text-white">
        {t('Language')}
      </h2>
      <div className="flex">
        <button
          className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-800  ${
            currentLanguage === 'en'
              ? 'bg-gray-600 text-gray-800'
              : 'dark:text-gray-300'
          } disabled:pointer-events-none transition-all duration-300 hover:bg-gray-500 rounded-md`}
          onClick={() => {
            changeLanguage('en');
            localStorage.setItem('language', 'en');
          }}
        >
          {t('English')}
        </button>
        <button
          className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-800  ${
            currentLanguage === 'ua'
              ? 'bg-gray-600 text-gray-800'
              : 'dark:text-gray-300'
          } disabled:pointer-events-none transition-all duration-300 hover:bg-gray-500 rounded-md`}
          onClick={() => {
            changeLanguage('ua');
            localStorage.setItem('language', 'ua');
          }}
        >
          {t('Ukrainian')}
        </button>
        <button
          className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-800  ${
            currentLanguage === 'ru'
              ? 'bg-gray-600 text-gray-800'
              : 'dark:text-gray-300'
          } disabled:pointer-events-none transition-all duration-300 hover:bg-gray-500 rounded-md`}
          onClick={() => {
            changeLanguage('ru');
            localStorage.setItem('language', 'ru');
          }}
        >
          {t('Russian')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
