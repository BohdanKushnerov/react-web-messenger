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
        className="py-2 px-10 h-10 w-full rounded-3xl bg-mediumDarkZinc dark:bg-darkBackground text-white outline-none border-2 border-transparent focus:border-solid focus:border-mediumDarkCyan placeholder:dark:text-mediumZinc placeholder:text-mediumLightZinc "
        autoFocus={true}
        type="text"
        placeholder={placeholderText}
        value={value}
        onChange={handleChange}
      />

      <svg
        className="absolute top-2 left-2 fill-darkZinc dark:fill-mediumZinc"
        width={24}
        height={24}
      >
        <use href={sprite + '#icon-search'} />
      </svg>
    </div>
  );
};

export default SearchMsgsInput;
