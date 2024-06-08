import { FC } from 'react';

import { IButtonCancelRecordingProps } from '@interfaces/IButtonCancelRecordingProps';
import sprite from '@assets/sprite.svg';

const ButtonCancelRecording: FC<IButtonCancelRecordingProps> = ({
  cancelRecording,
}) => {
  return (
    <button
      className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
      type="button"
      onClick={cancelRecording}
      aria-label="Cancel recording"
    >
      <svg width={24} height={24} className="fill-zinc-200 dark:fill-zinc-400">
        <use href={sprite + '#icon-delete-button'} />
      </svg>
    </button>
  );
};

export default ButtonCancelRecording;
