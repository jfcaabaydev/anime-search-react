import { useNavigate } from "react-router-dom";
import  AnimeCard  from "./AnimeCard";
import "./AnimeGrid.css"

function AnimeGrid({animeList}) {
const navigate = useNavigate();

  const onSelectAnime = (anime) => {
    navigate(`/anime/${anime.id}`);
  }

  
  return (
      <div className="anime-grid">
        {animeList.map((anime) => (
          <AnimeCard 
            key={anime.id}
            image={anime.attributes.posterImage.small} 
            title={anime.attributes.canonicalTitle} 
            rating={anime.attributes.averageRating} 
            onClick={() => onSelectAnime(anime)}
          />
        ))}
      </div>
  )
}

export default AnimeGrid;