import { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IButtonArrowProps } from '@interfaces/IButtonArrowProps';

import { IconId } from '@enums/iconsSpriteId';

const ButtonArrow: FC<IButtonArrowProps> = ({
  disabled,
  handleClickButtonArrow,
}) => {
  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full text-white transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10"
      type="button"
      onClick={handleClickButtonArrow}
      disabled={disabled}
      aria-label="Come back"
    >
      <SvgIcon
        className="rotate-180 fill-darkZinc"
        iconId={IconId.IconRightArrow}
        size={24}
      />
    </button>
  );
};

export default ButtonArrow;
