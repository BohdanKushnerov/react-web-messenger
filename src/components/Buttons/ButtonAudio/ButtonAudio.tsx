import { FC } from 'react';

import { IButtonAudioProps } from '@interfaces/IButtonAudioProps';

import sprite from '@assets/sprite.svg';

const ButtonAudio: FC<IButtonAudioProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <button
      className="my-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-lightZincOpacity40"
      type="button"
      onClick={onPlayPause}
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
