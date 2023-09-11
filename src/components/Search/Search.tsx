import useChatStore from "@zustand/store";

export default function Search() {
  const searchValue = useChatStore(state => state.searchValue);
  const updateSearchValue = useChatStore(state => state.updateSearchValue);

  return (
    <div>
      <input
        className="py-1 px-10 h-10 w-60 rounded-3xl bg-mySeacrhBcg"
        type="text"
        placeholder="Search"
        value={searchValue}
        onChange={e => updateSearchValue(e.target.value)}
      />
    </div>
  );
}
