import { useEffect } from 'react'

const useTheme = () => {
    useEffect(() => {
      function setDarkTheme() {
        document.documentElement.classList.add('dark');
        localStorage.theme = 'dark';
      }

      function setLightTheme() {
        document.documentElement.classList.remove('dark');
        localStorage.theme = 'light';
      }

      const lightThemeEl = document.querySelector('#light-theme-switcher')!;
      const darkThemeEl = document.querySelector('#dark-theme-switcher')!;

      lightThemeEl.addEventListener('click', setLightTheme);
      darkThemeEl.addEventListener('click', setDarkTheme);

      return () => {
        lightThemeEl.removeEventListener('click', setLightTheme);
        darkThemeEl.removeEventListener('click', setDarkTheme);
      };
    }, []);
}

export default useTheme;