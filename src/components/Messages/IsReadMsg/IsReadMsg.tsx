import { FC } from 'react';

import { IIsReadMsgProps } from '@interfaces/IIsReadMsgProps';

import sprite from '@assets/sprite.svg';

const IsReadMsg: FC<IIsReadMsgProps> = ({ msg }) => {
  return (
    <p>
      {msg.data().isRead ? (
        <svg
          width={24}
          height={24}
          className="fill-ultraDarkZinc dark:fill-white"
        >
          <use href={sprite + '#icon-double-check'} />
        </svg>
      ) : (
        <svg
          width={24}
          height={24}
          className="fill-ultraDarkZinc dark:fill-white"
        >
          <use href={sprite + '#icon-single-check'} />
        </svg>
      )}
    </p>
  );
};

export default IsReadMsg;
