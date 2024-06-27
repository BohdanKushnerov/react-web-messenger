import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IIsReadMsgProps } from '@interfaces/IIsReadMsgProps';

import { IconId } from '@enums/iconsSpriteId';

const IsReadMsg: FC<IIsReadMsgProps> = ({ msg }) => {
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

export default IsReadMsg;
