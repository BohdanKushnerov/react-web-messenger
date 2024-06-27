import WavesurferPlayer from '@wavesurfer/react';
import type { FC } from 'react';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { useDebounce } from 'use-debounce';
import type WaveSurfer from 'wavesurfer.js';

import ButtonAudio from '@components/Buttons/ButtonAudio/ButtonAudio';
import LoaderUIActions from '@components/common/LoaderUIActions/LoaderUIActions';

import convertTimeWithZero from '@utils/convertTimeWithZero';

import type { IAudioComponentProps } from '@interfaces/IAudioComponentProps';

import { defaultNS } from '@i18n/i18n';

const AudioComponent: FC<IAudioComponentProps> = ({ audioUrl }) => {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState<number>(100);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<number>(0);

  const [debouncedVolume] = useDebounce(volume, 50);

  const { t } = useTranslation(defaultNS, { keyPrefix: 'General' });

  const onVolumeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number.parseInt(event.target.value);
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

  const calculateCurrentTime = (wavesurfer: WaveSurfer) => {
    setCurrentTime(wavesurfer?.getCurrentTime());
  };

  useEffect(() => {
    if (wavesurfer) {
      wavesurfer.setVolume(debouncedVolume / 100);
    }
  }, [debouncedVolume, wavesurfer]);

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
              className="slider"
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
