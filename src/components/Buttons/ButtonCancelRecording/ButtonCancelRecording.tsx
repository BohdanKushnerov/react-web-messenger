import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IButtonCancelRecordingProps } from '@interfaces/IButtonCancelRecordingProps';

import { IconId } from '@enums/iconsSpriteId';

const ButtonCancelRecording: FC<IButtonCancelRecordingProps> = ({
  cancelRecording,
}) => {
  return (
    <button
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-veryLightZincOpacity20 hover:dark:bg-veryLightZincOpacity10"
      type="button"
      onClick={cancelRecording}
      aria-label="Cancel recording"
    >
      <SvgIcon
        className="fill-mediumLightZinc dark:fill-mediumZinc"
        iconId={IconId.IconDeleteButton}
        size={24}
      />
    </button>
  );
};

export default ButtonCancelRecording;
