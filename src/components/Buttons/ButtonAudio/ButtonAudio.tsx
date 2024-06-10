import { FC } from 'react';

import { IButtonAudioProps } from '@interfaces/IButtonAudioProps';
import sprite from '@assets/sprite.svg';

const ButtonAudio: FC<IButtonAudioProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <button onClick={onPlayPause} className="py-3" aria-label="Stop/Play">
      {isPlaying ? (
        <svg
          width={24}
          height={24}
          className="fill-zinc-600 dark:fill-zinc-200 "
        >
          <use href={sprite + '#icon-stop'} />
        </svg>
      ) : (
        <svg
          width={24}
          height={24}
          className="fill-zinc-600 dark:fill-zinc-200"
        >
          <use href={sprite + '#icon-play'} />
        </svg>
      )}
    </button>
  );
};

export default ButtonAudio;
