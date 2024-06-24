import { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IconId } from '@enums/iconsSpriteId';

interface IButtonStopRecordingAndSendAudioProps {
  stopRecordingAndSendAudio: () => void;
}

const ButtonStopRecordingAndSendAudio: FC<
  IButtonStopRecordingAndSendAudioProps
> = ({ stopRecordingAndSendAudio }) => {
  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10"
      type="button"
      onClick={stopRecordingAndSendAudio}
      aria-label="Stop recording and send audio"
    >
      <SvgIcon
        className="fill-mediumLightZinc dark:fill-mediumZinc"
        iconId={IconId.IconStop}
        size={24}
      />
    </button>
  );
};

export default ButtonStopRecordingAndSendAudio;
