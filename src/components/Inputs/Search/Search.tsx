import { ISearch } from '@interfaces/ISearch';
import sprite from '@assets/sprite.svg';

export const Search = ({value, handleChange}: ISearch) => {
  return (
    <div className="relative w-full">
      <input
        className="py-2 px-10 h-10 w-full rounded-3xl bg-zinc-500 dark:bg-mySeacrhBcg text-white outline-none border-2 border-transparent focus:border-solid focus:border-cyan-500"
        type="text"
        placeholder="Search"
        value={value}
        onChange={handleChange}
      />

      <svg
        className="absolute top-2 left-2 fill-zinc-600 dark:fill-zinc-400"
        width={24}
        height={24}
      >
        <use href={sprite + '#icon-search'} />
      </svg>
    </div>
  );
}
