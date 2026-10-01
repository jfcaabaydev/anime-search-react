import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "./DetailPage.css";

function DetailPage() {
  const { id } = useParams(); // gets the id from /anime/:id
  const [anime, setAnime] = useState(null);


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
    <div className="detail-view">
      <p>Title: {anime.attributes.titles.en || anime.attributes.titles.en_jp}</p>
      <p>Synopsis: {anime.attributes.synopsis}</p>
      <p>Episodes: {anime.attributes.episodeCount}</p>
      <img
        src={anime.attributes.posterImage?.medium}
        alt={anime.attributes.canonicalTitle}
      />
      <p>Rating: {anime.attributes.averageRating}</p>
      <p>{anime.attributes.status}</p>
      <p>Start date: {anime.attributes.startDate}</p>

      <Link to="/">
        <button>BACK</button>
      </Link>
    </div>
  );
}

export default DetailPage;
