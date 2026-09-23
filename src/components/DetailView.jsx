import "./DetailView.css"

function DetailView({anime, onBack}) {
  return (
    <div className="detail-view">
      <p>Title: {anime.attributes.titles.en || anime.attributes.titles.en_jp}</p>
      <p>Synopsis: {anime.attributes.synopsis}</p>
      <p>Episodes: {anime.attributes.episodeCount}</p>
      <img src={anime.attributes.posterImage.medium} alt={anime.attributes.canonicalTitle} />
      <p>Rating: {anime.attributes.averageRating}</p>
      <p>{anime.attributes.status}</p>
      <p>Start date: {anime.attributes.startDate}</p>
      <button onClick={onBack}>BACK</button>
    </div>
  );
}

export default DetailView;