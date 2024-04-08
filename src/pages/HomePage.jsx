import { useState, useEffect, lazy, Suspense } from 'react';
import Loader from '../components/Loader/Loader';
import { fetchTrending } from '../service/api';

const MovieList = lazy(() => import('../components/MovieList/MovieList'));
const ErrorMessage = lazy(() =>
  import('../components/ErrorMessage/ErrorMessage')
);

const HomePage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const getMovies = async () => {
        const movies = await fetchTrending();
        setMovies(movies);
      };
      getMovies();
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return (
    <Suspense fallback={<Loader />}>
      {error && <ErrorMessage error={error} />}
      {Array.isArray(movies) && movies.length && <MovieList movies={movies} />}
    </Suspense>
  );
};

export default HomePage;
