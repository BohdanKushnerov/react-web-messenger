import { FC } from 'react';

import { IButtonScrollDownProps } from '@interfaces/IButtonScrollDownProps';

import sprite from '@assets/sprite.svg';

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
        <svg
          className="rotate-180 transition-all duration-150 group-hover:scale-125"
          width={24}
          height={24}
        >
          <use href={sprite + '#icon-scroll-up'} />
        </svg>
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
