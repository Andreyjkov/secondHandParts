import React from "react";

interface Props {
  filterText: string;
  onFilterTextChange: React.Dispatch<React.SetStateAction<string>>;
}

function Search({ filterText, onFilterTextChange }: Props) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Поиск..."
        onChange={(e) => onFilterTextChange(e.target.value)}
      />
    </form>
  );
}

export default Search;
