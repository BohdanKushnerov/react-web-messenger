import { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IButtonAttachFileProps } from '@interfaces/IButtonAttachFileProps';

import { IconId } from '@enums/iconsSpriteId';

const ButtonAttachFile: FC<IButtonAttachFileProps> = ({
  editingMessageInfo,
  handleClickFileInput,
  children,
}) => {
  return (
    <button
      className={`absolute ${
        editingMessageInfo ? 'bottom-1' : 'top-7'
      } right-16 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-transparent transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10`}
      type="button"
      onClick={handleClickFileInput}
      aria-label="Attach file to message"
    >
      <SvgIcon
        className="fill-ultraDarkZinc dark:fill-mediumZinc"
        iconId={IconId.IconPaperClip}
        size={24}
      />
      {children}
    </button>
  );
};

export default ButtonAttachFile;
