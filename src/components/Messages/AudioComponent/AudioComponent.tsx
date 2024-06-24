import WavesurferPlayer from '@wavesurfer/react';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from 'use-debounce';
import WaveSurfer from 'wavesurfer.js';

import ButtonAudio from '@components/Buttons/ButtonAudio/ButtonAudio';
import LoaderUIActions from '@components/LoaderUIActions/LoaderUIActions';

import convertTimeWithZero from '@utils/convertTimeWithZero';

import { IAudioComponentProps } from '@interfaces/IAudioComponentProps';

const AudioComponent: FC<IAudioComponentProps> = ({ audioUrl }) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [debouncedVolume] = useDebounce(volume, 50);

  const { t } = useTranslation('translation', { keyPrefix: 'General' });

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseInt(event.target.value);
    setVolume(newVolume);
  };

  const onPlayPause = () => {
    wavesurfer?.playPause();
  };

  const onReady = (ws: WaveSurfer) => {
    setWavesurfer(ws);
    setIsPlaying(false);
    setIsLoading(false);
  };

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setVolume(debouncedVolume / 100);
    }
  }, [debouncedVolume, wavesurfer]);

  const calculateCurrentTime = (wavesurfer: WaveSurfer) => {
    setCurrentTime(wavesurfer?.getCurrentTime());
  };

  return (
    <div className="w-220px relative flex flex-row items-start gap-2 sm:w-200px md:min-w-220px md:max-w-md lg:min-w-360px">
      <ButtonAudio isPlaying={isPlaying} onPlayPause={onPlayPause} />

      {isLoading && (
        <div className="absolute left-8 top-0">
          <LoaderUIActions size={60} />
        </div>
      )}

      <div className="flex w-full flex-1 flex-col items-start">
        <div
          className={`${
            isLoading && 'opacity-0'
          } w-full flex-1 sm:w-[95%] md:w-full`}
        >
          <WavesurferPlayer
            height={60}
            width="100%"
            waveColor="orange"
            url={audioUrl}
            onReady={onReady}
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onAudioprocess={calculateCurrentTime}
          />
        </div>

        <div className="flex w-full justify-between sm:flex-col lg:flex-row">
          <div className="flex gap-1">
            <p className="text-dark dark:text-white">{t('Time')}</p>
            {isPlaying && (
              <p className="text-black dark:text-white">
                {convertTimeWithZero(currentTime)}
              </p>
            )}
            {!isPlaying && wavesurfer && (
              <p className="text-black dark:text-white">
                {convertTimeWithZero(wavesurfer.getDuration())}
              </p>
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            <p className="text-dark dark:text-white">{t('Volume')}</p>
            <input
              className="w-24 appearance-none bg-transparent sm:w-16 lg:w-24 [&::-webkit-slider-runnable-track]:rounded-full [&::-webkit-slider-runnable-track]:bg-mediumDarkZinc dark:[&::-webkit-slider-runnable-track]:bg-veryLightZinc [&::-webkit-slider-thumb]:h-10px [&::-webkit-slider-thumb]:w-10px [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-nearBlackZinc dark:[&::-webkit-slider-thumb]:bg-mediumDarkZinc"
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
