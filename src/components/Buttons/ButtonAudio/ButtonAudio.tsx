import { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IButtonAudioProps } from '@interfaces/IButtonAudioProps';

import { IconId } from '@enums/iconsSpriteId';

const ButtonAudio: FC<IButtonAudioProps> = ({ isPlaying, onPlayPause }) => {
  return (
    <button
      className="my-3 flex h-8 w-8 items-center justify-center rounded-full transition-all duration-300 hover:bg-lightZincOpacity40"
      type="button"
      onClick={onPlayPause}
      aria-label="Stop/Play"
    >
      {isPlaying ? (
        <SvgIcon
          className="fill-darkZinc dark:fill-mediumLightZinc"
          iconId={IconId.IconStop}
          size={24}
        />
      ) : (
        <SvgIcon
          className="fill-darkZinc dark:fill-mediumLightZinc"
          iconId={IconId.IconPlay}
          size={24}
        />
      )}
    </button>
  );
};

export default ButtonAudio;
