import React from "react";

interface Props {
  searchText: string;
  setSearchText: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ searchText, setSearchText }: Props) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        type="text"
        value={searchText}
        placeholder="Поиск..."
        onChange={(e) => setSearchText(e.target.value)}
      />
    </form>
  );
}

export default Search;
