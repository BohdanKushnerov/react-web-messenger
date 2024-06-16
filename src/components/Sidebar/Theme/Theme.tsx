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

  useTheme();

  const handleChangeTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  const themes = [
    {
      id: 'light-theme-switcher',
      theme: 'light',
      icon: '#ligth-theme-sun',
      label: t('Light'),
      isActive: isLightTheme,
    },
    {
      id: 'dark-theme-switcher',
      theme: 'dark',
      icon: '#dark-theme-moon',
      label: t('Dark'),
      isActive: !isLightTheme,
    },
  ];

  return (
    <div className="flex flex-col rounded-md border border-darkZinc p-1 dark:border-darkZinc">
      <h2 className="text-center font-extrabold text-black dark:text-white">
        {t('Theme')}
      </h2>
      <div className="flex">
        {themes.map(({ id, theme, icon, label, isActive }) => (
          <button
            key={id}
            id={id}
            className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-extraDarkGray ${
              isActive
                ? 'bg-mediumZinc dark:bg-mediumGray'
                : 'hover:bg-mediumDarkGray dark:text-mediumGray dark:hover:bg-main'
            } rounded-md transition-all duration-300 disabled:pointer-events-none hover:dark:text-extraDarkGray`}
            data-theme={theme}
            disabled={isActive}
            onClick={handleChangeTheme}
            aria-label={`${theme} theme`}
          >
            <div className="pointer-events-none flex items-center justify-center gap-1">
              <svg width={24} height={24} fill="currentColor">
                <use href={sprite + icon} />
              </svg>
              <span data-theme-name={theme}>{label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  // return (
  //   <div className="flex flex-col p-1 border border-darkZinc dark:border-darkZinc rounded-md">
  //     <h2 className="text-center font-extrabold text-black dark:text-white">
  //       {t('Theme')}
  //     </h2>
  //     <div className="flex">
  //       <button
  //         id="light-theme-switcher"
  //         className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-extraDarkGray dark:text-mediumGray ${
  //           isLightTheme && 'bg-mediumZinc'
  //         } transition-all duration-300 hover:dark:text-extraDarkGray hover:bg-main rounded-md disabled:pointer-events-none`}
  //         data-theme="light"
  //         disabled={isLightTheme}
  //         onClick={handleChangeTheme}
  //         aria-label="Light theme"
  //       >
  //         <div className="flex justify-center items-center gap-1 pointer-events-none">
  //           <svg width={24} height={24} fill="currentColor">
  //             <use href={sprite + '#ligth-theme-sun'} />
  //           </svg>
  //           <span data-theme-name="light">{t('Light')}</span>
  //         </div>
  //       </button>
  //       <button
  //         id="dark-theme-switcher"
  //         className={`w-full whitespace-nowrap px-3 py-2 text-sm font-normal text-veryDarkGray ${
  //           !isLightTheme && 'bg-mediumZinc'
  //         } transition-all duration-300 hover:bg-mediumDarkGray rounded-md disabled:pointer-events-none`}
  //         data-theme="dark"
  //         disabled={!isLightTheme}
  //         onClick={handleChangeTheme}
  //         aria-label="Dark theme"
  //       >
  //         <div className="flex justify-center items-center gap-1 pointer-events-none">
  //           <svg width={24} height={24} fill="currentColor">
  //             <use href={sprite + '#dark-theme-moon'} />
  //           </svg>
  //           <span data-theme-name="dark">{t('Dark')}</span>
  //         </div>
  //       </button>
  //     </div>
  //   </div>
  // );
};

export default Theme;
