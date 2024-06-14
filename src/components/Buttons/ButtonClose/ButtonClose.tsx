import { FC } from 'react';

import { IButtonCloseProps } from '@interfaces/IButtonCloseProps';
import sprite from '@assets/sprite.svg';

const ButtonClose: FC<IButtonCloseProps> = ({ handleClickButtonClose }) => {
  return (
    <button
      className="absolute top-2 left-2 w-8 h-8 flex justify-center items-center border-2 border-darkZinc dark:border-white rounded-full transition-all duration-300 group hover:border-darkGreen dark:hover:border-darkGreen hover:shadow-mainShadow cursor-pointer"
      onClick={handleClickButtonClose}
      aria-label="Close"
    >
      <svg
        width={16}
        height={16}
        className="transition-all duration-300 fill-darkZinc dark:fill-white group-hover:fill-darkGreen"
      >
        <use href={sprite + '#icon-cross-close'} />
      </svg>
    </button>
  );
};

export default ButtonClose;
