import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IButtonScrollDownProps } from '@interfaces/IButtonScrollDownProps';

import { IconId } from '@enums/iconsSpriteId';

const ButtonScrollDown: FC<IButtonScrollDownProps> = ({
  scrollToBottom,
  lengthOfUnreadMsgs,
}) => {
  return (
    <button
      className="group absolute bottom-32 right-10 rounded-full bg-white p-2 outline-1 outline-mediumDarkGreen hover:scale-105 hover:outline"
      type="button"
      onClick={scrollToBottom}
      aria-label="Scroll down"
    >
      <div className="relative">
        <SvgIcon
          className="rotate-180 transition-all duration-150 group-hover:scale-125"
          iconId={IconId.IconScrollUp}
          size={24}
        />
        {lengthOfUnreadMsgs > 0 && (
          <span className="absolute bottom-0 right-0 -mb-4 flex h-6 w-6 translate-x-4 transform items-center justify-center rounded-full bg-mediumDarkRed text-white">
            {lengthOfUnreadMsgs}
          </span>
        )}
      </div>
    </button>
  );
};

export default ButtonScrollDown;
