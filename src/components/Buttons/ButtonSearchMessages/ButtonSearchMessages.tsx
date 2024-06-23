import { FC } from 'react';

import { IButtonSearchMessagesProps } from '@interfaces/IButtonSearchMessagesProps';

import sprite from '@assets/sprite.svg';

const ButtonSearchMessages: FC<IButtonSearchMessagesProps> = ({
  handleClick,
}) => {
  return (
    <button
      className="ml-auto flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10"
      type="button"
      onClick={handleClick}
      aria-label="Search messages"
    >
      <svg
        className="fill-darkZinc dark:fill-mediumZinc"
        width={24}
        height={24}
      >
        <use href={sprite + '#icon-search'} />
      </svg>
    </button>
  );
};

export default ButtonSearchMessages;
