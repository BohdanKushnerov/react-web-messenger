import { type RefObject, useEffect } from 'react';

import { ElementsId } from '@enums/elementsId';

type UseKeyDown = (
  inputRef: RefObject<HTMLInputElement>,
  isShowSearchMessages: boolean
) => void;

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

      const attachFilesModalInput = document.getElementById(
        ElementsId.AttachFilesModalInput
      ) as HTMLInputElement;

      const profileNameInput = document.getElementById(
        ElementsId.ProfileName
      ) as HTMLInputElement;

      const isAnyInputFocused =
        document.activeElement === inputRef.current ||
        document.activeElement === searchInput ||
        document.activeElement === attachFilesModalInput ||
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
