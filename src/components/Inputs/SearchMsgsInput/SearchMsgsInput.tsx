import { FC } from 'react';

import { ISearchMsgsInputProps } from '@interfaces/ISearchMsgsInputProps';

import sprite from '@assets/sprite.svg';

const SearchMsgsInput: FC<ISearchMsgsInputProps> = ({
  value,
  handleChange,
  placeholderText,
}) => {
  return (
    <div className="relative w-full">
      <input
        className="h-10 w-full rounded-3xl border-2 border-transparent bg-mediumDarkZinc px-10 py-2 text-white outline-none placeholder:text-mediumLightZinc focus:border-solid focus:border-mediumDarkCyan dark:bg-darkBackground placeholder:dark:text-mediumZinc"
        type="text"
        autoFocus
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

export default SearchMsgsInput;
