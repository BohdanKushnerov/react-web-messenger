import { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { ISelectIconsProps } from '@interfaces/ISelectIconsProps';

import { ElementsId } from '@enums/elementsId';
import { IconId } from '@enums/iconsSpriteId';

const SelectIcons: FC<ISelectIconsProps> = ({
  isSelectedMessages,
  currentItem,
}) => {
  return (
    <>
      {isSelectedMessages && currentItem ? (
        <SvgIcon
          id={ElementsId.Select}
          className="fill-white"
          iconId={IconId.IconSelect}
          size={32}
        />
      ) : (
        isSelectedMessages &&
        !currentItem && (
          <SvgIcon
            id={ElementsId.NotSelect}
            className="fill-white"
            iconId={IconId.IconNotSelect}
            size={32}
          />
        )
      )}
    </>
  );
};

export default SelectIcons;
