import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useWatchList } from "../context/useWatchList";
import "./DetailPage.css";

function DetailPage() {
  const { id } = useParams(); // gets the id from /anime/:id
  const [anime, setAnime] = useState(null);
  const {
    watchList,
    addToWatchList,
    removeFromWatchList,
    updateStatus,
    updateRating,
    toggleFavorite,
  } = useWatchList();
  const isInWatchList = watchList.some((watch) => watch.id === id);
  const watchListEntry = watchList.find((w) => w.id === id);

  useEffect(() => {
    // fetch anime data using this id
    const fetchAnime = async () => {
      try {
        const response = await fetch(`https://kitsu.io/api/edge/anime/${id}`);
        const result = await response.json();
        setAnime(result.data);
      } catch (error) {
        console.error("Failed to fetch anime:", error);
      }
    };

    fetchAnime();
  }, [id]);

  if (!anime) {
    return <div>Loading...</div>;
  }

  return (
    <div className="detail-page">
      <Link className="detail-back" to="/">
        Back to browse
      </Link>

      <div className="detail-view">
        <img
          className="detail-poster"
          src={anime.attributes.posterImage?.medium}
          alt={anime.attributes.canonicalTitle}
        />

        <div className="detail-content">
          <div>
            <p className="detail-title">{anime.attributes.titles.en || anime.attributes.titles.en_jp}</p>
            <p className="detail-synopsis">{anime.attributes.synopsis}</p>
          </div>

          <div className="detail-meta">
            <p>Episodes: {anime.attributes.episodeCount}</p>
            <p>Rating: {anime.attributes.averageRating}</p>
            <p>Status: {anime.attributes.status}</p>
            <p>Start date: {anime.attributes.startDate}</p>
          </div>
        </div>

        <div className="detail-actions">
          <button
            onClick={() =>
              isInWatchList ? removeFromWatchList(id) : addToWatchList(anime)
            }
          >
            {isInWatchList ? "Remove" : "Add to Watchlist"}
          </button>

          {isInWatchList && (
            <>
              <select
                value={watchListEntry.status}
                onChange={(e) => updateStatus(id, e.target.value)}
              >
                <option value="Plan to Watch">Plan to Watch</option>
                <option value="Watching">Watching</option>
                <option value="Complete">Complete</option>
              </select>

              <select
                value={watchListEntry.rating || ""}
                onChange={(e) => updateRating(id, Number(e.target.value))}
              >
                <option value="">Rate this anime</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                  <option key={n} value={n}>
                    {n}
                  </option>
                ))}
              </select>

              <button onClick={() => toggleFavorite(id)}>
                {watchList.find((a) => a.id === id)?.favorite
                  ? "★ Favorited"
                  : "☆ Favorite"}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
