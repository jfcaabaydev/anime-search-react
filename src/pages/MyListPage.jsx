import { useState } from "react";
import { useWatchList } from "../context/useWatchList";
import "./MyListPage.css";

function MyListPage() {
  const {
    watchList,
    removeFromWatchList,
    updateStatus,
    updateRating,
    toggleFavorite,
  } = useWatchList();
  const [filter, setFilter] = useState("All");

  const filteredList = watchList.filter((anime) => {
    if (filter === "All") return true;
    if (filter === "Favorites") return anime.favorite === true;
    return anime.status === filter;
  });


  return (
    <div className="watchlist-container">
      <div className="watchlist-filter">
        <select
          className="filter-feature"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="All">All</option>
          <option value="Plan to Watch">Plan to Watch</option>
          <option value="Watching">Watching</option>
          <option value="Complete">Complete</option>
          <option value="Favorites">Favorites</option>
        </select>
      </div>

      <div className="watchlist-grid">
        {filteredList.length === 0 && (
          <p className="empty-watchlist">No anime in the list yet</p>
        )}
        {filteredList.map((anime) => (
          <div key={anime.id} className="watchlist-card">
            <div>
              <img src={anime.image} alt={anime.title} />
              <p>{anime.title}</p>
            </div>

            <div>
              <button onClick={() => removeFromWatchList(anime.id)}>
                Remove
              </button>
              <select
                value={anime.status}
                onChange={(e) => updateStatus(anime.id, e.target.value)}
              >
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Complete">Complete</option>
              </select>
              <select
                value={anime.rating || ""}
                onChange={(e) => updateRating(anime.id, Number(e.target.value))}
              >
                <option value="">Rate this anime</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>
              <button onClick={() => toggleFavorite(anime.id)}>
                {watchList.find((a) => a.id === anime.id)?.favorite
                  ? "★ Favorited"
                  : "☆ Favorite"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyListPage;
