import useChatStore from "@zustand/store";

export default function Search() {
  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);

  return (
    <div>
      <input
        className="py-2 px-8 h-10 w-full rounded-3xl bg-mySeacrhBcg text-white"
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={e => updateSearchValue(e.target.value)}
      />
    </div>
  );
}
