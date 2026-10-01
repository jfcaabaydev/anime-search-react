import { useState, useEffect } from "react";
import { WatchListContext } from "./WatchListContext";


export function WatchListProvider({ children }) {
  const [watchList, setWatchList] = useState(() => {
    const saved = localStorage.getItem("watchlist");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlist", JSON.stringify(watchList));
  }, [watchList]);

  // functions to add, remove, update
  const addToWatchList = (anime) => {
    setWatchList([
      ...watchList,
      {
        id: anime.id,
        title: anime.attributes.canonicalTitle,
        image: anime.attributes.posterImage?.medium,
        status: "Plan to Watch",
        rating: null,
        favorite: false,
      },
    ]);
  };

  const removeFromWatchList = (id) => {
    setWatchList(watchList.filter((watch) => watch.id !== id));
  };

  const updateStatus = (id, status) => {
    setWatchList(
      watchList.map((watch) =>
        watch.id === id ? { ...watch, status: status } : watch,
      ),
    );
  };

  const updateRating = (id, rating) => {
    setWatchList(
      watchList.map((watch) =>
        watch.id === id ? { ...watch, rating: rating } : watch,
      ),
    );
  };

  const toggleFavorite = (id) => {
    setWatchList(
      watchList.map((watch) =>
        watch.id === id ? { ...watch, favorite: !watch.favorite } : watch,
      ),
    );
  };

  return (
    <WatchListContext.Provider
      value={{
        watchList,
        setWatchList,
        addToWatchList,
        removeFromWatchList,
        updateStatus,
        updateRating,
        toggleFavorite,
      }}
    >
      {children}
    </WatchListContext.Provider>
  );
}
