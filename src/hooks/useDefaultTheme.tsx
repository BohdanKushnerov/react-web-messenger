import { useEffect } from 'react';

const useDefaultTheme = () => {
  useEffect(() => {
    if (!localStorage.theme) {
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)'
      ).matches;
      localStorage.theme = prefersDarkMode ? 'dark' : 'light';
    }

    document.documentElement.classList.toggle(
      'dark',
      localStorage.theme === 'dark'
    );
  }, []);

  return null;
};

export default useDefaultTheme;
