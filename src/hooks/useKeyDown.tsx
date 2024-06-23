import { useEffect } from 'react';

import { ElementsId } from '@enums/elementsId';

import { UseKeyDown } from 'types/hooks/UseKeyDown';

const useKeyDown: UseKeyDown = (inputRef, isShowSearchMessages) => {
  useEffect(() => {
    const handleKeyDown = () => {
      if (isShowSearchMessages === true) return;

      const searchInput = document.getElementById(
        ElementsId.SearchInput
      ) as HTMLInputElement;
      const atachFilesModalInput = document.getElementById(
        ElementsId.AtachFilesModalInput
      ) as HTMLInputElement;

      const isAnyInputFocused =
        document.activeElement === inputRef.current ||
        document.activeElement === searchInput ||
        document.activeElement === atachFilesModalInput;

      if (!isAnyInputFocused) {
        inputRef.current?.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [inputRef, isShowSearchMessages]);
};

export default useKeyDown;
