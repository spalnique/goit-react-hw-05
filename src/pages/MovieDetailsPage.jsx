import { Suspense, useEffect, useState } from 'react';
import { Link, Outlet, useParams } from 'react-router-dom';
import { fetchMovieById } from '../service/api';
import Loader from '../components/Loader/Loader';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      const getDetails = async () => {
        const movieID = Number(id);
        const movie = await fetchMovieById(movieID);
        setMovie(movie);
      };
      getDetails();
    } catch (error) {
      console.log('error', error.message);
    }
  }, [id]);
  return (
    <Suspense fallback={<Loader />}>
      {movie && <img src={movie.poster_path} alt={movie.title} width="200px" />}
      <Link to="cast">Cast</Link>
      <Link to="reviews">Reviews</Link>
      <Outlet />
    </Suspense>
  );
};

export default MovieDetailsPage;
