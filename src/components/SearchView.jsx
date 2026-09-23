import SearchBar from "./SearchBar";
import  AnimeGrid  from "./AnimeGrid";

function SearchView({animeList, onSearch, onSelectAnime}) {
  
  return (
    <>
      <SearchBar onSearch={onSearch}/>
      <AnimeGrid animeList={animeList} onSelectAnime={onSelectAnime}/>
    </>
  )
}
export default SearchView;