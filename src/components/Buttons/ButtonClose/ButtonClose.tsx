import { FC } from 'react';

import { IButtonCloseProps } from '@interfaces/IButtonCloseProps';

import sprite from '@assets/sprite.svg';

const ButtonClose: FC<IButtonCloseProps> = ({ handleClickButtonClose }) => {
  return (
    <button
      className="group absolute left-2 top-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full border-2 border-darkZinc transition-all duration-300 hover:border-darkGreen hover:shadow-mainShadow dark:border-white dark:hover:border-darkGreen"
      type="button"
      onClick={handleClickButtonClose}
      aria-label="Close"
    >
      <svg
        width={16}
        height={16}
        className="fill-darkZinc transition-all duration-300 group-hover:fill-darkGreen dark:fill-white"
      >
        <use href={sprite + '#icon-cross-close'} />
      </svg>
    </button>
  );
};

export default ButtonClose;
