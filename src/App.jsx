import { useState, useEffect } from "react";
import SearchView from "./components/SearchView";
import DetailView from "./components/DetailView";
import LoadingSpinner from "./components/LoadingSpinner";
import './App.css';


function App() {
const [ allAnimeList, setAllAnimeList ] = useState([]);
const [ filteredAnime, setFilteredAnime ] = useState([]);
const [ selectedAnime, setSelectedAnime ] = useState(null);
const [ loading, setLoading ] = useState(true);
const [ error, setError ] = useState(null);

useEffect(() => {
  async function fetchPopularAnime() {
    try {
      const response = await fetch("https://kitsu.io/api/edge/anime?page[limit]=20&sort=popularityRank");
      const result = await response.json();
      setAllAnimeList(result.data);
      setFilteredAnime(result.data);
    } catch {
      setError("Failed to load anime. Please try again.");
    } finally {
      setLoading(false);
    }
}
fetchPopularAnime();
}, []);

function handleSearch(query) {
  const filtered = allAnimeList.filter(anime => 
    anime.attributes.canonicalTitle.toLowerCase().includes(query.toLowerCase())
  );
  setFilteredAnime(filtered);
}

if (loading) {
  return <LoadingSpinner />;
}
if (error) {
  return <p>{error}</p>;
}

  return (
    <>
      {selectedAnime ? (
        <DetailView 
          anime={selectedAnime} 
          onBack={() => setSelectedAnime(null)} />
      ) : (
        <SearchView 
          onSearch={handleSearch} 
          animeList={filteredAnime} onSelectAnime={(anime) =>
            setSelectedAnime(anime)} />
      )}
    </>
  )
}

export default App
