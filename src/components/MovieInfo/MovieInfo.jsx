import css from './MovieInfo.module.css';

const MovieInfo = ({
  movie: { title, poster_path, overview, genres, runtime, release_date },
}) => {
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  const getReleaseYear = () => {
    const date = new Date(release_date);
    const year = date.getFullYear();
    return year;
  };

  return (
    <div className={css.movieWrapper}>
      <img
        className={css.movieImage}
        src={poster_path ? poster_path : defaultImg}
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
