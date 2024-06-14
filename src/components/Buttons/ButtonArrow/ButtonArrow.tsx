import { FC } from 'react';

import { IButtonArrowProps } from '@interfaces/IButtonArrowProps';
import sprite from '@assets/sprite.svg';

const ButtonArrow: FC<IButtonArrowProps> = ({
  disabled,
  handleClickButtonArrow,
}) => {
  return (
    <button
      className="flex justify-center items-center w-12 h-12 text-white rounded-full transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10 cursor-pointer"
      onClick={handleClickButtonArrow}
      aria-label="Come back"
      disabled={disabled}
    >
      <svg className="rotate-180 fill-darkZinc" width={24} height={24}>
        <use href={sprite + '#icon-right-arrow'} />
      </svg>
    </button>
  );
};

export default ButtonArrow;
