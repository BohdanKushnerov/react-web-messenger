import { FC } from 'react';

import { IButtonAttachFileProps } from '@interfaces/IButtonAttachFileProps';
import sprite from '@assets/sprite.svg';

const ButtonAttachFile: FC<IButtonAttachFileProps> = ({
  editingMessageInfo,
  handleClickFileInput,
  children,
}) => {
  return (
    <button
      className={`absolute ${
        editingMessageInfo ? 'bottom-1' : 'top-7'
      } right-16 w-10 h-10 flex justify-center items-center bg-transparent transition-all duration-300 hover:bg-zinc-400 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer`}
      onClick={handleClickFileInput}
      aria-label="Attach file to message"
    >
      <svg width={24} height={24} className="fill-zinc-800 dark:fill-zinc-400">
        <use href={sprite + '#icon-paper-clip'} />
      </svg>
      {children}
    </button>
  );
};

export default ButtonAttachFile;
