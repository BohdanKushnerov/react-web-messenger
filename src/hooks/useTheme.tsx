import { useEffect } from 'react';

import { ElementsId } from '@enums/elementsId';

const useTheme = () => {
  useEffect(() => {
    const setDarkTheme = () => {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    };

    const setLightTheme = () => {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    };

    const lightThemeEl = document.getElementById(
      ElementsId.LightThemeSwitcher
    ) as HTMLButtonElement;
    const darkThemeEl = document.getElementById(
      ElementsId.DarkThemeSwitcher
    ) as HTMLButtonElement;

    lightThemeEl.addEventListener('click', setLightTheme);
    darkThemeEl.addEventListener('click', setDarkTheme);

    return () => {
      lightThemeEl.removeEventListener('click', setLightTheme);
      darkThemeEl.removeEventListener('click', setDarkTheme);
    };
  }, []);
};

export default useTheme;
