import type { FC } from 'react';

import SvgIcon from '@components/common/SvgIcon/SvgIcon';

import { ElementsId } from '@enums/elementsId';
import { IconId } from '@enums/iconsSpriteId';

interface ISearchInputProps {
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholderText: string;
  autoFocus: boolean;
}

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

      <SvgIcon
        className="absolute left-2 top-2 fill-darkZinc dark:fill-mediumZinc"
        iconId={IconId.IconSearch}
        size={24}
      />
    </div>
  );
};

export default SearchInput;
