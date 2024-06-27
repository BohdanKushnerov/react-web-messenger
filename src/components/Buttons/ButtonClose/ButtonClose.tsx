import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IButtonCloseProps } from '@interfaces/IButtonCloseProps';

import { IconId } from '@enums/iconsSpriteId';

const ButtonClose: FC<IButtonCloseProps> = ({ handleClickButtonClose }) => {
  return (
    <button
      className="group absolute left-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-darkZinc transition-all duration-300 hover:border-darkGreen hover:shadow-mainShadow dark:border-white dark:hover:border-darkGreen"
      type="button"
      onClick={handleClickButtonClose}
      aria-label="Close"
    >
      <SvgIcon
        className="fill-darkZinc transition-all duration-300 group-hover:fill-darkGreen dark:fill-white"
        iconId={IconId.IconCrossClose}
        size={16}
      />
    </button>
  );
};

export default ButtonClose;
