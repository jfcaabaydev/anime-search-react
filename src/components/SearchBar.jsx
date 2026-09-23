import "./SearchBar.css";

function SearchBar({onSearch}) {
  return (
    <div className="search-bar">
      <input type="search" placeholder="Search Anime..." onChange={(e) => onSearch(e.target.value)} />
    </div>
  )
}
export default SearchBar;