import { FC } from 'react';

import { IButtonArrowProps } from '@interfaces/IButtonArrowProps';
import sprite from '@assets/sprite.svg';

const ButtonArrow: FC<IButtonArrowProps> = ({ handleClickButtonArrow }) => {
  return (
    <button
      className="flex justify-center items-center w-12 h-12 text-white rounded-full transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 cursor-pointer"
      onClick={handleClickButtonArrow}
      aria-label="Come back"
    >
      <svg className="rotate-180 fill-zinc-600" width={24} height={24}>
        <use href={sprite + '#icon-right-arrow'} />
      </svg>
    </button>
  );
};

export default ButtonArrow;
