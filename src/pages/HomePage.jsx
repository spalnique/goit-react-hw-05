import { useState, useEffect } from 'react';
import { fetchTrending } from '../service/api';
import MovieList from '../components/MovieList/MovieList';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import Loader from '../components/Loader/Loader';

const HomePage = () => {
  const [loading, setLoading] = useState(false);

  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const getMovies = async () => {
        const movies = await fetchTrending();
        setMovies(movies);
      };
      setLoading(true);
      getMovies();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {movies && movies.length && <MovieList movies={movies} />}
    </>
  );
};

export default HomePage;
