import  AnimeCard  from "./AnimeCard";
import "./AnimeGrid.css"

function AnimeGrid({animeList, onSelectAnime}) {
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