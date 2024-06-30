import { type FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IconId } from '@enums/iconsSpriteId';

interface IScrollDownProps {
  lengthOfUnreadMessages: number;
}

const ScrollDown: FC<IScrollDownProps> = ({ lengthOfUnreadMessages }) => {
  return (
    <div className="relative">
      <SvgIcon
        className="rotate-180 transition-all duration-150 group-hover:scale-125"
        iconId={IconId.IconScrollUp}
        size={24}
      />
      {lengthOfUnreadMessages > 0 && (
        <span className="absolute bottom-0 right-0 -mb-4 flex h-6 w-6 translate-x-4 transform items-center justify-center rounded-full bg-mediumDarkRed text-white">
          {lengthOfUnreadMessages}
        </span>
      )}
    </div>
  );
};

export default ScrollDown;
