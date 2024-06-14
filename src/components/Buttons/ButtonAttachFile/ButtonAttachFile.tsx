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
      } right-16 w-10 h-10 flex justify-center items-center bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10 rounded-full cursor-pointer`}
      onClick={handleClickFileInput}
      aria-label="Attach file to message"
    >
      <svg
        width={24}
        height={24}
        className="fill-ultraDarkZinc dark:fill-mediumZinc"
      >
        <use href={sprite + '#icon-paper-clip'} />
      </svg>
      {children}
    </button>
  );
};

export default ButtonAttachFile;
