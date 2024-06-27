import type { RefObject } from 'react';

export interface IProfileSettingsModalProps {
  photoProfileInputRef: RefObject<HTMLInputElement>;
  handleToggleProfilePhotoModal: () => void;
}
