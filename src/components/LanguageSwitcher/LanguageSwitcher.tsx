// LanguageSwitcher.js
import { FC } from 'react';
import { useTranslation } from 'react-i18next';

const LanguageSwitcher: FC = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const currentLanguage = i18n.language

  return (
    <div className="flex">
      <button
        className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-800 dark:text-gray-300 ${
          currentLanguage === 'en' && 'bg-gray-600'
        } disabled:pointer-events-none transition-all duration-300 hover:dark:text-gray-800 hover:bg-gray-200 rounded-md`}
        onClick={() => changeLanguage('en')}
      >
        English
      </button>
      <button
        className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-700 ${
          currentLanguage === 'ua' && 'bg-gray-300'
        } disabled:pointer-events-none transition-all duration-300 hover:bg-gray-500 rounded-md`}
        onClick={() => changeLanguage('ua')}
      >
        Українська
      </button>
    </div>
  );
};

export default LanguageSwitcher;
