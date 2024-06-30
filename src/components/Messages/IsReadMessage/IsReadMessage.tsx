import type { FC } from 'react';

import type { DocumentData } from 'firebase/firestore';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { IconId } from '@enums/iconsSpriteId';

interface IIsReadMessageProps {
  msg: DocumentData;
}

const IsReadMessage: FC<IIsReadMessageProps> = ({ msg }) => {
  return (
    <p>
      {msg.data().isRead ? (
        <SvgIcon
          className="fill-ultraDarkZinc dark:fill-white"
          iconId={IconId.IconDoubleCheck}
          size={24}
        />
      ) : (
        <SvgIcon
          className="fill-ultraDarkZinc dark:fill-white"
          iconId={IconId.IconSingleCheck}
          size={24}
        />
      )}
    </p>
  );
};

export default IsReadMessage;
