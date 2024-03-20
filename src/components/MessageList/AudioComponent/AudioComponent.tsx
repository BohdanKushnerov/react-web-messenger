import { FC, useRef } from 'react';
import { useWavesurfer } from '@wavesurfer/react';

import sprite from '@assets/sprite.svg';

function convertToTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const tensSeconds = Math.floor((seconds % 60) / 10);
  const unitsSeconds = Math.floor(seconds % 10);

  return `${minutes}:${tensSeconds}${unitsSeconds}`;
}

interface IAudioComponentProps {
  audioUrl: string;
}

const AudioComponent: FC<IAudioComponentProps> = ({ audioUrl }) => {
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioUrl,
    waveColor: 'yellow',
    height: 50,
  });

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  return (
    <div className="flex flex-row items-start gap-2 w-[160px] md:min-w-[240px] md:max-w-sm">
      <button onClick={onPlayPause} className="py-3">
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

      <div className="flex flex-1 flex-col items-start">
        <div className="flex-1 w-full" ref={containerRef} />

        <p className="text-black dark:text-white">
          {convertToTime(currentTime)}
        </p>
      </div>
    </div>
  );
};

export default AudioComponent;
