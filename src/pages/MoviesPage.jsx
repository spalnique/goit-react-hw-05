import { useEffect, useState, lazy, Suspense } from 'react';
import { fetchMovieByKeyword } from '../service/api';
import { useSearchParams } from 'react-router-dom';
import Loader from '../components/Loader/Loader';

const ErrorMessage = lazy(() =>
  import('../components/ErrorMessage/ErrorMessage')
);
const SearchForm = lazy(() => import('../components/SearchForm/SearchForm'));
const MovieList = lazy(() => import('../components/MovieList/MovieList'));

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('keyword');

  useEffect(() => {
    if (!keyword) return;
    try {
      const getMovies = async () => {
        const movies = await fetchMovieByKeyword(keyword);
        setMovies(movies);
      };
      setError(null);
      getMovies();
    } catch (error) {
      setError(error.message);
    }
  }, [keyword]);
  return (
    <>
      <Suspense fallback={<Loader />}>
        <SearchForm onSubmit={(value) => setSearchParams({ keyword: value })} />
        {error && <ErrorMessage error={error} />}
        {movies && <MovieList movies={movies} />}
      </Suspense>
    </>
  );
};

export default MoviesPage;
