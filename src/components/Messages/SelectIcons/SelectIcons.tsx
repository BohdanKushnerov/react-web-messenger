import { FC } from 'react';

import { ISelectIconsProps } from '@interfaces/ISelectIconsProps';

import sprite from '@assets/sprite.svg';

const SelectIcons: FC<ISelectIconsProps> = ({
  isSelectedMessages,
  currentItem,
}) => {
  return (
    <>
      {isSelectedMessages && currentItem ? (
        <svg width={32} height={32} id="select" className="fill-white">
          <use href={sprite + '#icon-select'} />
        </svg>
      ) : (
        isSelectedMessages &&
        !currentItem && (
          <svg width={32} height={32} id="not-select" className="fill-white">
            <use href={sprite + '#icon-not-select'} />
          </svg>
        )
      )}
    </>
  );
};

export default SelectIcons;
