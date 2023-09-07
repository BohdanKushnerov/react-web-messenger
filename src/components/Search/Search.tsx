interface SearchProps {
  searchUsers: string;
  setSearchUsers: (value: string) => void;
}

export default function Search({ searchUsers, setSearchUsers }: SearchProps) {


  return (
    <div>
      <input
        className="py-1 px-10 h-10 w-60 rounded-3xl bg-mySeacrhBcg"
        type="text"
        placeholder="Search"
        value={searchUsers}
        onChange={e => setSearchUsers(e.target.value)}
      />
    </div>
  );
}
