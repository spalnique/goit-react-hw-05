import { Suspense, lazy, useEffect, useState } from 'react';
import {
  Link,
  NavLink,
  Outlet,
  useLocation,
  useParams,
} from 'react-router-dom';
import clsx from 'clsx';

import Loader from '../components/Loader/Loader';
import { fetchMovieById } from '../service/api';

import style from './MovieDetailsPage.module.css';

const ErrorMessage = lazy(() =>
  import('../components/ErrorMessage/ErrorMessage')
);

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const location = useLocation();

  const setClassName = ({ isActive }) =>
    clsx(style.navLinkItem, isActive && style.activeLink);

  useEffect(() => {
    try {
      const getDetails = async () => {
        const movie = await fetchMovieById(id);
        setMovie(movie);
      };
      setError(null);
      getDetails();
    } catch (error) {
      setError(error.message);
    }
  }, [id]);

  return (
    <>
      <Link to={location.state?.from ?? '/'}>Back to results</Link>
      <Suspense fallback={<Loader />}>
        {error && <ErrorMessage error={error} />}
        {movie && (
          <img src={movie.poster_path} alt={movie.title} width="200px" />
        )}
        <NavLink
          to="cast"
          state={{ from: location.state?.from ?? '/' }}
          className={setClassName}>
          Cast
        </NavLink>
        <NavLink
          to="reviews"
          state={{ from: location.state?.from ?? '/' }}
          className={setClassName}>
          Reviews
        </NavLink>
        <Outlet />
      </Suspense>
    </>
  );
};

export default MovieDetailsPage;
