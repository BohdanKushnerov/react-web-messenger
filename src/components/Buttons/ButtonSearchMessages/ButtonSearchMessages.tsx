import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IButtonSearchMessagesProps } from '@interfaces/IButtonSearchMessagesProps';

import { IconId } from '@enums/iconsSpriteId';

const ButtonSearchMessages: FC<IButtonSearchMessagesProps> = ({
  handleClick,
}) => {
  return (
    <button
      className="ml-auto flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:bg-mediumZinc hover:dark:bg-veryLightZincOpacity10"
      type="button"
      onClick={handleClick}
      aria-label="Search messages"
    >
      <SvgIcon
        className="fill-darkZinc dark:fill-mediumZinc"
        iconId={IconId.IconSearch}
        size={24}
      />
    </button>
  );
};

export default ButtonSearchMessages;
