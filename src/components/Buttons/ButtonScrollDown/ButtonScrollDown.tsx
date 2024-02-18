import { FC } from 'react';

import sprite from '@assets/sprite.svg';

interface IButtonScrollDownProps {
  scrollToBottom: () => void;
  lengthOfUnreadMsgs: number;
}

const ButtonScrollDown: FC<IButtonScrollDownProps> = ({
  scrollToBottom,
  lengthOfUnreadMsgs,
}) => {
  return (
    <button
      className="absolute bottom-32 right-10 bg-white p-2 rounded-full group hover:scale-105 hover:outline outline-1 outline-green-500"
      onClick={scrollToBottom}
      aria-label="Scroll Down"
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
          <span className="absolute bottom-0 right-0 transform translate-x-4 -mb-4 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center">
            {lengthOfUnreadMsgs}
          </span>
        )}
      </div>
    </button>
  );
};

export default ButtonScrollDown;
