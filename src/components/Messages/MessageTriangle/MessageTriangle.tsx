import { FC } from 'react';

import { IMessageTriangleProps } from '@interfaces/IMessageTriangleProps';

import sprite from '@assets/sprite.svg';

const MessageTriangle: FC<IMessageTriangleProps> = ({ myUID }) => {
  return (
    <>
      {myUID ? (
        <svg
          width={16}
          height={16}
          className="absolute -right-4 fill-mediumEmerald dark:fill-mediumDarkCyan"
        >
          <use href={sprite + '#icon-triangle-rigth'} />
        </svg>
      ) : (
        <svg
          width={16}
          height={16}
          className="absolute -left-2 fill-veryLightZinc dark:fill-darkGreen"
        >
          <use href={sprite + '#icon-triangle-left'} />
        </svg>
      )}
    </>
  );
};

export default MessageTriangle;
