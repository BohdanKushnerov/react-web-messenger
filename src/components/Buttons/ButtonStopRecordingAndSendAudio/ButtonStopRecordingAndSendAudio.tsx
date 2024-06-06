import { FC } from 'react';

import sprite from '@assets/sprite.svg';

interface IButtonStopRecordingAndSendAudioProps {
  stopRecordingAndSendAudio: () => void;
}

const ButtonStopRecordingAndSendAudio: FC<
  IButtonStopRecordingAndSendAudioProps
> = ({ stopRecordingAndSendAudio }) => {
  return (
    <button
      className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-zinc-100/20 hover:dark:bg-zinc-100/10 rounded-full cursor-pointer"
      type="button"
      onClick={stopRecordingAndSendAudio}
      aria-label="Stop recording and send audio"
    >
      <svg width={24} height={24} className="fill-zinc-200 dark:fill-zinc-400">
        <use href={sprite + '#icon-stop'} />
      </svg>
    </button>
  );
};

export default ButtonStopRecordingAndSendAudio;
