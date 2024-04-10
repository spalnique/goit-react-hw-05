import { Suspense, useEffect, useState, useRef } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import clsx from 'clsx';
import { fetchMovieById } from '../service/api';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import MovieInfo from '../components/MovieInfo/MovieInfo';
import Loader from '../components/Loader/Loader';

import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [loading, setLoading] = useState(false);
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');
  

  const setClassName = ({ isActive }) =>
    clsx(css.navLinkItem, isActive && css.activeLink);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setError(null);
        setLoading(true);
        const movie = await fetchMovieById(id);
        setMovie(movie);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [id]);

  return (
    <div className={css.mainWrapper}>
      <Link to={backLinkRef.current} className={css.goBackLink}>
        Go back
      </Link>

      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {movie && <MovieInfo movie={movie} />}

      <div className={css.buttonsWrapper}>
        <NavLink
          to="cast"
          // state={{ from: location.state?.from ?? '/' }}
          className={setClassName}>
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          // state={{ from: location.state?.from ?? '/' }}
          className={setClassName}>
          Reviews
        </NavLink>
      </div>

      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
