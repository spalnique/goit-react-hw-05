import { useEffect, useState } from 'react';
import { fetchMovieByKeyword } from '../service/api';
import { useSearchParams } from 'react-router-dom';
import ErrorMessage from '../components/ErrorMessage/ErrorMessage';
import MovieList from '../components/MovieList/MovieList';
import SearchForm from '../components/SearchForm/SearchForm';
import Loader from '../components/Loader/Loader';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    if (!keyword) return;
    const getMovies = async () => {
      try {
        setError(null);
        setLoading(true);
        const movies = await fetchMovieByKeyword(keyword);
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    getMovies();
  }, [keyword]);

  return (
    <>
      <SearchForm onSubmit={(value) => setSearchParams({ keyword: value })} />
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {movies && <MovieList movies={movies} />}
      {movies && !movies.length && <p>Nothing found</p>}
    </>
  );
};

export default MoviesPage;
