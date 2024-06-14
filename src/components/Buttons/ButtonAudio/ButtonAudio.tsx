import { FC } from 'react';

import { IButtonAudioProps } from '@interfaces/IButtonAudioProps';
import sprite from '@assets/sprite.svg';

const ButtonAudio: FC<IButtonAudioProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <button
      onClick={onPlayPause}
      className="flex items-center justify-center w-8 h-8 my-3 rounded-full transition-all duration-300 hover:bg-lightZincOpacity40"
      aria-label="Stop/Play"
    >
      {isPlaying ? (
        <svg
          width={24}
          height={24}
          className="fill-darkZinc dark:fill-mediumLightZinc"
        >
          <use href={sprite + '#icon-stop'} />
        </svg>
      ) : (
        <svg
          width={24}
          height={24}
          className="fill-darkZinc dark:fill-mediumLightZinc"
        >
          <use href={sprite + '#icon-play'} />
        </svg>
      )}
    </button>
  );
};

export default ButtonAudio;
