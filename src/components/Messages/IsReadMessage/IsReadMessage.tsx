import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IIsReadMessageProps } from '@interfaces/IIsReadMessageProps';

import { IconId } from '@enums/iconsSpriteId';

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
