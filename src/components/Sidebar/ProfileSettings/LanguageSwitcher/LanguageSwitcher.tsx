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
    <div className="flex flex-col p-1 border border-darkZinc dark:border-darkZinc rounded-md">
      <h2 className="text-center font-extrabold text-black dark:text-white">
        {t('Language')}
      </h2>
      <div className="flex">
        <button
          className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-extraDarkGray dark:text-mediumGray dark:hover:text-extraDarkGray disabled:dark:text-extraDarkGray ${
            currentLanguage === 'en'
              ? 'bg-mediumZinc dark:bg-mediumGray dark:text-extraDarkGray'
              : 'hover:bg-mediumDarkGray dark:hover:bg-main'
          } disabled:pointer-events-none transition-all duration-300 rounded-md `}
          onClick={() => {
            changeLanguage('en');
            localStorage.setItem('language', 'en');
          }}
          aria-label="Choose english language"
          disabled={currentLanguage === 'en'}
        >
          {t('English')}
        </button>
        <button
          className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-extraDarkGray dark:text-mediumGray dark:hover:text-extraDarkGray disabled:dark:text-extraDarkGray ${
            currentLanguage === 'ua'
              ? 'bg-mediumZinc dark:bg-mediumGray dark:text-extraDarkGray'
              : 'hover:bg-mediumDarkGray dark:hover:bg-main'
          } disabled:pointer-events-none transition-all duration-300 rounded-md `}
          onClick={() => {
            changeLanguage('ua');
            localStorage.setItem('language', 'ua');
          }}
          aria-label="Choose ukrainian language"
          disabled={currentLanguage === 'ua'}
        >
          {t('Ukrainian')}
        </button>
        <button
          className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-extraDarkGray dark:text-mediumGray dark:hover:text-extraDarkGray disabled:dark:text-extraDarkGray ${
            currentLanguage === 'ru'
              ? 'bg-mediumZinc dark:bg-mediumGray dark:text-extraDarkGray'
              : 'hover:bg-mediumDarkGray dark:hover:bg-main'
          } disabled:pointer-events-none transition-all duration-300 rounded-md `}
          onClick={() => {
            changeLanguage('ru');
            localStorage.setItem('language', 'ru');
          }}
          aria-label="Choose russian language"
          disabled={currentLanguage === 'ru'}
        >
          {t('Russian')}
        </button>
      </div>
    </div>
  );
};

export default LanguageSwitcher;
