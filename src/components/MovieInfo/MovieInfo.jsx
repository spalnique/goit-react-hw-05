import css from './MovieInfo.module.css';

const MovieInfo = ({
  movie: { title, poster_path, overview, genres, runtime, release_date },
}) => {
  const getReleaseYear = () => {
    const date = new Date(release_date);
    const year = date.getFullYear();
    return year;
  };

  return (
    <div className={css.movieWrapper}>
      <img
        className={css.movieImage}
        src={poster_path}
        alt={title}
        width="350px"
      />
      <ul className={css.detailsList}>
        <li className={css.movieTitle}>
          <p>{title}</p>
        </li>
        <li className={css.detailsItem}>
          <p className={css.detailTitle}>Overview</p>
          <p className={css.detailText}>{overview}</p>
        </li>
        <li className={css.detailsItem}>
          <p className={css.detailTitle}>Genres</p>
          <p className={css.detailText}>
            {genres.map((x) => x.name).join(', ')}
          </p>
        </li>
        <li className={css.detailsItem}>
          <p className={css.detailTitle}>Runtime</p>
          <p className={css.detailText}>{`${runtime} minutes`}</p>
        </li>
        <li className={css.detailsItem}>
          <p className={css.detailTitle}>Released</p>
          <p className={css.detailText}>{getReleaseYear()}</p>
        </li>
      </ul>
    </div>
  );
};

export default MovieInfo;
