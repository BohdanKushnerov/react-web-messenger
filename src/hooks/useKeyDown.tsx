import { useEffect } from 'react';

import { ElementsId } from '@enums/elementsId';

import type { UseKeyDown } from 'types/hooks/UseKeyDown';

const useKeyDown: UseKeyDown = (inputRef, isShowSearchMessages) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (isShowSearchMessages === true) return;

      if (event.key === 'Tab') {
        return;
      }

      const searchInput = document.getElementById(
        ElementsId.SearchInput
      ) as HTMLInputElement;

      const atachFilesModalInput = document.getElementById(
        ElementsId.AtachFilesModalInput
      ) as HTMLInputElement;

      const profileNameInput = document.getElementById(
        ElementsId.ProfileName
      ) as HTMLInputElement;

      const isAnyInputFocused =
        document.activeElement === inputRef.current ||
        document.activeElement === searchInput ||
        document.activeElement === atachFilesModalInput ||
        document.activeElement === profileNameInput;

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
