import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  const location = useLocation();
  return (
    <ul className={css.movieList}>
      {movies.map(({ id, title, poster_path }) => (
        <li key={id} className={css.movieListItem}>
          <Link
            className={css.movieLink}
            to={`/movies/${id}`}
            state={{ from: location }}>
            <img
              className={css.moviePoster}
              src={poster_path ? poster_path : defaultImg}
              alt={title}
            />
            <p className={css.movieTitle}>{title}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
