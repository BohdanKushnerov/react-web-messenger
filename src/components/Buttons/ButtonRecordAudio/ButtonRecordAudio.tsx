import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IButtonRecordAudioProps } from '@interfaces/IButtonRecordAudioProps';

import { IconId } from '@enums/iconsSpriteId';

const ButtonRecordAudio: FC<IButtonRecordAudioProps> = ({
  handleToggleRecordingStatus,
}) => {
  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10"
      type="button"
      onClick={handleToggleRecordingStatus}
      aria-label="Recording audio"
    >
      <SvgIcon
        className="fill-mediumLightZinc dark:fill-mediumZinc"
        iconId={IconId.IconMic}
        size={24}
      />
    </button>
  );
};

export default ButtonRecordAudio;
