import { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';

import useTheme from '@hooks/useTheme';
import sprite from '@assets/sprite.svg';
import '@i18n';

const Theme: FC = () => {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });
  const { t } = useTranslation('translation', { keyPrefix: 'NavBar' });

  useTheme(); // хук следик за кликом на темы

  const handleChangeTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  return (
    <div className="flex flex-col p-1 border border-zinc-600 dark:border-zinc-500 rounded-md">
      <h2 className="text-center font-extrabold text-black dark:text-white">
        {t('Theme')}
      </h2>
      <div className="flex">
        <button
          id="light-theme-switcher"
          className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-800 dark:text-gray-300 ${
            isLightTheme && 'bg-gray-600'
          } transition-all duration-300 hover:dark:text-gray-800 hover:bg-gray-200 rounded-md disabled:pointer-events-none`}
          data-theme="light"
          disabled={isLightTheme}
          onClick={handleChangeTheme}
          aria-label="Light theme"
        >
          <div className="flex justify-center items-center gap-1 pointer-events-none">
            <svg width={24} height={24} fill="currentColor">
              <use href={sprite + '#ligth-theme-sun'} />
            </svg>
            <span data-theme-name="light">{t('Light')}</span>
          </div>
        </button>
        <button
          id="dark-theme-switcher"
          className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-gray-700 ${
            !isLightTheme && 'bg-gray-300'
          } transition-all duration-300 hover:bg-gray-500 rounded-md disabled:pointer-events-none`}
          data-theme="dark"
          disabled={!isLightTheme}
          onClick={handleChangeTheme}
          aria-label="Dark theme"
        >
          <div className="flex justify-center items-center gap-1 pointer-events-none">
            <svg width={24} height={24} fill="currentColor">
              <use href={sprite + '#dark-theme-moon'} />
            </svg>
            <span data-theme-name="dark">{t('Dark')}</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Theme;
