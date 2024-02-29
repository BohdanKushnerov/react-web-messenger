import { FC } from 'react';

import sprite from '@assets/sprite.svg';

interface IButtonSearchMessagesProps {
  handleClick: () => void;
}

const ButtonSearchMessages: FC<IButtonSearchMessagesProps> = ({
  handleClick,
}) => {
  return (
    <button
      className="ml-auto flex justify-center items-center w-10 h-10 transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 rounded-full"
      onClick={handleClick}
      aria-label="Search messages"
    >
      <svg className="fill-zinc-600 dark:fill-zinc-400" width={24} height={24}>
        <use href={sprite + '#icon-search'} />
      </svg>
    </button>
  );
};

export default ButtonSearchMessages;
