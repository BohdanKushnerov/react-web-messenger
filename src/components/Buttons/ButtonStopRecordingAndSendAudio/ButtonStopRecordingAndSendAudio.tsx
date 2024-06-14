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
      className="flex justify-center items-center h-12 w-12 bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10 rounded-full cursor-pointer"
      type="button"
      onClick={stopRecordingAndSendAudio}
      aria-label="Stop recording and send audio"
    >
      <svg
        width={24}
        height={24}
        className="fill-mediumLightZinc dark:fill-mediumZinc"
      >
        <use href={sprite + '#icon-stop'} />
      </svg>
    </button>
  );
};

export default ButtonStopRecordingAndSendAudio;
