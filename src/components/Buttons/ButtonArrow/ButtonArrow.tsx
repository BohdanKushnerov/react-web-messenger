import { FC } from 'react';

import sprite from '@assets/sprite.svg';

interface IButtonArrow {
  handleClickButtonArrow: () => void;
}

const ButtonArrow: FC<IButtonArrow> = ({ handleClickButtonArrow }) => {
  return (
    <button
      className="flex justify-center items-center w-12 h-12 text-white rounded-full transition-all duration-300 hover:bg-hoverGray  cursor-pointer"
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
