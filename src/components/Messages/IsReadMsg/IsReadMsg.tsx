import { FC } from 'react';
import { DocumentData } from 'firebase/firestore';

import sprite from '@assets/sprite.svg';

interface IIsReadMsgProps {
  msg: DocumentData;
}

const IsReadMsg: FC<IIsReadMsgProps> = ({ msg }) => {
  return (
    <p>
      {msg.data().isRead ? (
        <svg width={24} height={24} className="fill-zinc-800 dark:fill-white">
          <use href={sprite + '#icon-double-check'} />
        </svg>
      ) : (
        <svg width={24} height={24} className="fill-zinc-800 dark:fill-white">
          <use href={sprite + '#icon-single-check'} />
        </svg>
      )}
    </p>
  );
};

export default IsReadMsg;
