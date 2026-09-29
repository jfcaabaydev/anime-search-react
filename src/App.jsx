import { Routes, Route } from "react-router-dom";
import BrowsePage from "./pages/BrowsePage";
import DetailPage from "./pages/DetailPage";
import MyListPage from "./pages/MyListPage";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import LoadingSpinner from "./components/LoadingSpinner";
import "./App.css";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [allAnimeList, setAllAnimeList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSearchResults = async (query) => {
    const response = await fetch(
      `https://kitsu.io/api/edge/anime?filter[text]=${query}&page[limit]=20`,
    );
    const result = await response.json();
    setAllAnimeList(result.data);
  };

  useEffect(() => {
    const fetchPopularAnime = async () => {
      try {
        const response = await fetch(
          "https://kitsu.io/api/edge/anime?page[limit]=20&sort=popularityRank",
        );
        const result = await response.json();
        setAllAnimeList(result.data);
      } catch {
        setError("Failed to load anime. Please try again.");
      } finally {
        setLoading(false);
      }
    };

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
      <Header />
      <Routes>
        <Route path="/" element={<BrowsePage allAnimeList={allAnimeList} setSearchQuery={setSearchQuery} />} />
        <Route path="/anime/:id" element={<DetailPage />} />
        <Route path="/mylist" element={<MyListPage />} />
        <Route path="*" element={<p>Page not found</p>} />
      </Routes>
    </>
  );
}

export default App;
