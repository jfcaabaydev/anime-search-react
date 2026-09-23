import "./AnimeCard.css";

function AnimeCard({image, title, rating, onClick}) {
  return (
    <div className="anime-card" onClick={onClick}>
      <img src={image} alt={title} />
      <p className="anime-title">{title}</p>
      <p className="anime-rating">{rating}</p>
    </div>
  )
}

export default AnimeCard;