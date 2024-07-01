import type { FC } from 'react';

import type { IconId } from '@enums/iconsSpriteId';

import sprite from '@assets/sprite.svg';

interface ISvgIconProps {
  id?: string;
  className: string;
  size: string | number;
  iconId: IconId;
}

const SvgIcon: FC<ISvgIconProps> = ({ id, className, iconId, size }) => {
  return (
    <svg id={id} className={className} width={size} height={size}>
      <use href={sprite + iconId} />
    </svg>
  );
};

export default SvgIcon;
