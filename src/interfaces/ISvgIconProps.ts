import type { IconId } from '@enums/iconsSpriteId';

export interface ISvgIconProps {
  id?: string;
  className: string;
  size: string | number;
  iconId: IconId;
}
