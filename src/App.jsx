import { useState, useEffect } from "react";
import SearchView from "./components/SearchView";
import DetailView from "./components/DetailView";
import LoadingSpinner from "./components/LoadingSpinner";
import './App.css';


function App() {
const [ searchQuery, setSearchQuery ] = useState("");
const [ allAnimeList, setAllAnimeList ] = useState([]);
const [ selectedAnime, setSelectedAnime ] = useState(null);
const [ loading, setLoading ] = useState(true);
const [ error, setError ] = useState(null);


// 
const fetchSearchResults = async (query) => {
  const response = await fetch(`https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=20`);
  const result = await response.json();
  setAllAnimeList(result.data);
}


useEffect(() => {
  const fetchPopularAnime = async () => {
    try {
      const response = await fetch("https://kitsu.io/api/edge/anime?page[limit]=20&sort=popularityRank");
      const result = await response.json();
      setAllAnimeList(result.data);
    } catch {
      setError("Failed to load anime. Please try again.");
    } finally {
      setLoading(false);
    }
}

  if (searchQuery === "") {
    // if empty, load popular anime
    fetchPopularAnime();
    return; 
  } 

  const timer = setTimeout(() => {
    fetchSearchResults(searchQuery);
  }, 500);

  // cleanup - cancel the timer if user types again before 500ms
  return () => clearTimeout(timer);
}, [searchQuery]);


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
          onSearch={(query) => setSearchQuery(query)} 
          animeList={allAnimeList} onSelectAnime={(anime) => 
            setSelectedAnime(anime)} />
      )}
    </>
  )
}

export default App
