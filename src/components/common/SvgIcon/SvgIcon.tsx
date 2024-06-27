import type { FC } from 'react';

import type { ISvgIconProps } from '@interfaces/ISvgIconProps';

import sprite from '@assets/sprite.svg';

const SvgIcon: FC<ISvgIconProps> = ({ id, className, iconId, size }) => {
  return (
    <svg id={id} className={className} width={size} height={size}>
      <use href={sprite + iconId} />
    </svg>
  );
};

export default SvgIcon;
