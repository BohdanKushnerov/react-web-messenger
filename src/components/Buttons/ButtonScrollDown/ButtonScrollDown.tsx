import { FC } from 'react';

import { IButtonScrollDownProps } from '@interfaces/IButtonScrollDownProps';
import sprite from '@assets/sprite.svg';

const ButtonScrollDown: FC<IButtonScrollDownProps> = ({
  scrollToBottom,
  lengthOfUnreadMsgs,
}) => {
  return (
    <button
      className="absolute bottom-32 right-10 bg-white p-2 rounded-full group hover:scale-105 hover:outline outline-1 outline-mediumDarkGreen"
      onClick={scrollToBottom}
      aria-label="Scroll down"
    >
      <div className="relative">
        <svg
          className="rotate-180 transition-all duration-150 group-hover:scale-125"
          width={24}
          height={24}
        >
          <use href={sprite + '#icon-scroll-up'} />
        </svg>
        {lengthOfUnreadMsgs > 0 && (
          <span className="absolute bottom-0 right-0 transform translate-x-4 -mb-4 bg-mediumDarkRed text-white rounded-full w-6 h-6 flex items-center justify-center">
            {lengthOfUnreadMsgs}
          </span>
        )}
      </div>
    </button>
  );
};

export default ButtonScrollDown;
