import { FC } from 'react';

import { IButtonRecordAudioProps } from '@interfaces/IButtonRecordAudioProps';

import sprite from '@assets/sprite.svg';

const ButtonRecordAudio: FC<IButtonRecordAudioProps> = ({
  handleToggleRecordingStatus,
}) => {
  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10"
      type="button"
      onClick={handleToggleRecordingStatus}
      aria-label="Recording audio"
    >
      <svg
        width={24}
        height={24}
        className="fill-mediumLightZinc dark:fill-mediumZinc"
      >
        <use href={sprite + '#icon-mic'} />
      </svg>
    </button>
  );
};

export default ButtonRecordAudio;
