import { FC } from 'react';

import { ISelectIconsProps } from '@interfaces/ISelectIconsProps';

import { ElementsId } from '@enums/elementsId';

import sprite from '@assets/sprite.svg';

const SelectIcons: FC<ISelectIconsProps> = ({
  isSelectedMessages,
  currentItem,
}) => {
  return (
    <>
      {isSelectedMessages && currentItem ? (
        <svg
          id={ElementsId.Select}
          width={32}
          height={32}
          className="fill-white"
        >
          <use href={sprite + '#icon-select'} />
        </svg>
      ) : (
        isSelectedMessages &&
        !currentItem && (
          <svg
            id={ElementsId.NotSelect}
            width={32}
            height={32}
            className="fill-white"
          >
            <use href={sprite + '#icon-not-select'} />
          </svg>
        )
      )}
    </>
  );
};

export default SelectIcons;
