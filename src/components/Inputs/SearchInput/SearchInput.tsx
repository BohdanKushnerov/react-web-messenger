import { FC } from 'react';

import { ISearchInputProps } from '@interfaces/ISearchInputProps';

import { ElementsId } from '@enums/elementsId';

import sprite from '@assets/sprite.svg';

const SearchInput: FC<ISearchInputProps> = ({
  value,
  handleChange,
  placeholderText,
  autoFocus,
}) => {
  return (
    <div className="relative w-full">
      <input
        id={ElementsId.SearchInput}
        className="h-10 w-full rounded-3xl border-2 border-transparent bg-mediumDarkZinc px-10 py-2 text-white outline-none placeholder:text-mediumLightZinc focus:border-solid focus:border-mediumDarkCyan dark:bg-darkBackground placeholder:dark:text-mediumZinc"
        type="text"
        autoFocus={autoFocus}
        placeholder={placeholderText}
        value={value}
        onChange={handleChange}
      />

      <svg
        className="absolute left-2 top-2 fill-darkZinc dark:fill-mediumZinc"
        width={24}
        height={24}
      >
        <use href={sprite + '#icon-search'} />
      </svg>
    </div>
  );
};

export default SearchInput;
