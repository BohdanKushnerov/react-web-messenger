import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import type { IMessageTriangleProps } from '@interfaces/IMessageTriangleProps';

import { IconId } from '@enums/iconsSpriteId';

const MessageTriangle: FC<IMessageTriangleProps> = ({ myUID }) => {
  return (
    <>
      {myUID ? (
        <SvgIcon
          className="absolute -right-4 fill-mediumEmerald dark:fill-mediumDarkCyan"
          iconId={IconId.IconTriangleRigth}
          size={16}
        />
      ) : (
        <SvgIcon
          className="absolute -left-2 fill-veryLightZinc dark:fill-darkGreen"
          iconId={IconId.IconTriangleLeft}
          size={16}
        />
      )}
    </>
  );
};

export default MessageTriangle;
