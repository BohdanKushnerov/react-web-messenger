import { RefObject } from 'react';

export type UseKeyDown = (
  inputRef: RefObject<HTMLInputElement>,
  isShowSearchMessages: boolean
) => void;
