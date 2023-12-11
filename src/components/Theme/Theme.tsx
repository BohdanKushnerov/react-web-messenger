import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useTheme from '@hooks/useTheme';
import '@i18n';

const Theme: FC = () => {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });
  const { t } = useTranslation();

  useTheme(); // хук следик за кликом на темы

  const handleChangeTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <div className="flex">
      <button
        id="light-theme-switcher"
        className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-800 dark:text-gray-300 ${
          isLightTheme && 'bg-gray-600'
        } disabled:pointer-events-none transition-all duration-300 hover:dark:text-gray-800 hover:bg-gray-200 rounded-md`}
        data-theme="light"
        disabled={isLightTheme}
        onClick={handleChangeTheme}
      >
        <div className="pointer-events-none">
          <div
            className="inline-block w-[24px] text-center"
            data-theme-icon="light"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline-block h-6 w-6"
            >
              <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z" />
            </svg>
          </div>
          <span data-theme-name="light">{t('Light')}</span>
        </div>
      </button>
      <button
        id="dark-theme-switcher"
        className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-700 ${
          !isLightTheme && 'bg-gray-300'
        } disabled:pointer-events-none transition-all duration-300 hover:bg-gray-500 rounded-md`}
        data-theme="dark"
        disabled={!isLightTheme}
        onClick={handleChangeTheme}
      >
        <div className="pointer-events-none">
          <div
            className="inline-block w-[24px] text-center"
            data-theme-icon="dark"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="inline-block h-6 w-6"
            >
              <path
                fillRule="evenodd"
                d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <span data-theme-name="dark">{t('Dark')}</span>
        </div>
      </button>
    </div>
  );
};

export default Theme;
