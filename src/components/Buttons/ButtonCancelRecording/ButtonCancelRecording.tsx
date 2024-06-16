import { FC } from 'react';

import { IButtonCancelRecordingProps } from '@interfaces/IButtonCancelRecordingProps';

import sprite from '@assets/sprite.svg';

const ButtonCancelRecording: FC<IButtonCancelRecordingProps> = ({
  cancelRecording,
}) => {
  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10"
      type="button"
      onClick={cancelRecording}
      aria-label="Cancel recording"
    >
      <svg
        width={24}
        height={24}
        className="fill-mediumLightZinc dark:fill-mediumZinc"
      >
        <use href={sprite + '#icon-delete-button'} />
      </svg>
    </button>
  );
};

export default ButtonCancelRecording;
