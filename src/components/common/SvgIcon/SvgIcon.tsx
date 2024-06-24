import { FC } from 'react';

import { ISvgIconProps } from '@interfaces/ISvgIconProps';

import sprite from '@assets/sprite.svg';

const SvgIcon: FC<ISvgIconProps> = ({ id, className, iconId, size }) => {
  return (
    <svg
      id={id}
      className={className}
      width={size}
      height={size}
      fill="currentColor"
    >
      <use href={sprite + iconId} />
    </svg>
  );
};

export default SvgIcon;
