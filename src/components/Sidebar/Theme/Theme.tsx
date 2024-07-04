import type { FC } from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import classNames from 'classnames';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import useTheme from '@hooks/useTheme';

import { ElementsId } from '@enums/elementsId';
import { IconId } from '@enums/iconsSpriteId';

import { defaultNS } from '@i18n/i18n';

const Theme: FC = () => {
  const [isLightTheme, setIsLightTheme] = useState(() => {
    return localStorage.getItem('theme') === 'light';
  });

  const { t } = useTranslation(defaultNS, { keyPrefix: 'NavBar' });

  useTheme();

  const handleChangeTheme = () => {
    setIsLightTheme(prev => !prev);
  };

  const themes = [
    {
      id: ElementsId.LightThemeSwitcher,
      theme: 'light',
      icon: IconId.IconLigthThemeSun,
      label: t('Light'),
      isActive: isLightTheme,
    },
    {
      id: ElementsId.DarkThemeSwitcher,
      theme: 'dark',
      icon: IconId.IconDarkThemeSun,
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
            className={classNames(
              'w-full whitespace-nowrap rounded-md px-3 py-2 text-sm font-normal text-extraDarkGray transition-all duration-300 disabled:pointer-events-none hover:dark:text-extraDarkGray',
              {
                'bg-mediumZinc dark:bg-mediumGray': isActive,
                'hover:bg-mediumDarkGray dark:text-mediumGray dark:hover:bg-main':
                  !isActive,
              }
            )}
            type="button"
            data-theme={theme}
            onClick={handleChangeTheme}
            aria-label={`${theme} theme`}
            disabled={isActive}
          >
            <div className="pointer-events-none flex items-center justify-center gap-1">
              <SvgIcon
                className="fill-current"
                iconId={icon as IconId}
                size={24}
              />
              <span data-theme-name={theme}>{label}</span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Theme;
