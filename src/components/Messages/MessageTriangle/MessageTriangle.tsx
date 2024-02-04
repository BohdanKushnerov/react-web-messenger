import { FC } from 'react';

import sprite from '@assets/sprite.svg';

interface IMessageTriangleProps {
  myUID: boolean;
}

const MessageTriangle: FC<IMessageTriangleProps> = ({ myUID }) => {
  return (
    <>
      {myUID ? (
        <svg
          width={16}
          height={16}
          className="absolute -right-3.5 fill-emerald-400 dark:fill-cyan-600"
        >
          <use href={sprite + '#icon-triangle-rigth'} />
        </svg>
      ) : (
        <svg
          width={16}
          height={16}
          className="absolute -left-1.5 fill-zinc-100 dark:fill-green-600"
        >
          <use href={sprite + '#icon-triangle-left'} />
        </svg>
      )}
    </>
  );
};

export default MessageTriangle;
