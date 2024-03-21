import { FC, useEffect, useRef, useState } from 'react';
import { useWavesurfer } from '@wavesurfer/react';
import { useTranslation } from 'react-i18next';
import { useDebounce } from 'use-debounce';

import convertAudioMsgTime from '@utils/messages/convertAudioMsgTime';
import { IAudioComponentProps } from '@interfaces/IAudioComponentProps';
import sprite from '@assets/sprite.svg';

const AudioComponent: FC<IAudioComponentProps> = ({ audioUrl }) => {
  const [volume, setVolume] = useState<number>(100);
  const containerRef = useRef(null);
  const [debouncedVolume] = useDebounce(volume, 50);
  const { t } = useTranslation('translation');

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    url: audioUrl,
    waveColor: 'yellow',
    height: 50,
  });

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setVolume(debouncedVolume / 100);
    }
  }, [debouncedVolume, wavesurfer]);

  const onPlayPause = () => {
    wavesurfer && wavesurfer.playPause();
  };

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
  };

  return (
    <div className="flex flex-row items-start gap-2 w-[160px] md:min-w-[360px] md:max-w-sm">
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

        <div className="flex justify-between w-full">
          <div className="flex gap-1">
            <p className="text-dark dark:text-white">{t('Time')}</p>
            {isPlaying && (
              <p className="text-black dark:text-white">
                {convertAudioMsgTime(currentTime)}
              </p>
            )}
            {!isPlaying && wavesurfer && (
              <p className="text-black dark:text-white">
                {convertAudioMsgTime(wavesurfer.getDuration())}
              </p>
            )}
          </div>

          <div className="flex gap-1">
            <p className="text-dark dark:text-white">{t('Volume')}</p>
            <input
              className="w-24 
            appearance-none bg-transparent 
            [&::-webkit-slider-runnable-track]:rounded-full 
            [&::-webkit-slider-runnable-track]:bg-zinc-100

            [&::-webkit-slider-thumb]:appearance-none 
            [&::-webkit-slider-thumb]:h-[10px] 
            [&::-webkit-slider-thumb]:w-[10px] 
            [&::-webkit-slider-thumb]:rounded-full 
            [&::-webkit-slider-thumb]:bg-zinc-500"
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={onVolumeChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioComponent;
