import { FC } from 'react';

import { IButtonArrowProps } from '@interfaces/IButtonArrowProps';

import sprite from '@assets/sprite.svg';

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
      <svg className="rotate-180 fill-darkZinc" width={24} height={24}>
        <use href={sprite + '#icon-right-arrow'} />
      </svg>
    </button>
  );
};

export default ButtonArrow;
