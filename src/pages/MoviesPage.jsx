import { useEffect, useState } from 'react';
import { fetchMovieByKeyword } from '../service/api';
import MovieList from '../components/MovieList/MovieList';

const MoviesPage = () => {
  const [keyword, setKeyword] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = (e) => {};

  useEffect(() => {
    if (!keyword) return;
    try {
      const search = async () => {
        const result = await fetchMovieByKeyword(keyword);
        setResult(result);
      };
      search();
    } catch (error) {
      console.log('error', error.message);
    }
  }, [keyword]);
  return (
    <>
      <form></form>
      <MovieList movies={result} />
    </>
  );
};

export default MoviesPage;
