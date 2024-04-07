import { Route, Routes } from 'react-router-dom';
import { fetchTrending } from '../../service/api';
import { useEffect, useState, lazy, Suspense } from 'react';
import Loader from '../Loader/Loader';

const Navigation = lazy(() => import('../Navigation/Navigation'));
const HomePage = lazy(() => import('../../pages/HomePage'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage'));
const MovieDetailsPage = lazy(() => import('../../pages/MovieDetailsPage'));
const MovieCast = lazy(() => import('../MovieCast/MovieCast'));
const MovieReviews = lazy(() => import('../MovieReviews/MovieReviews'));
const NotFoundPage = lazy(() => import('../../pages/NotFoundPage'));

const App = () => {
  const [movies, setMovies] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      const getMovies = async () => {
        const movieList = await fetchTrending();
        setMovies(movieList);
      };
      getMovies();
    } catch (error) {
      setError(error.message);
    }
  }, []);

  return (
    <>
      <header>
        <Suspense fallback={<Loader />}>
          <Navigation />
        </Suspense>
      </header>
      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path="/"
              element={
                Array.isArray(movies) &&
                movies.length && <HomePage movies={movies} />
              }
            />
            <Route path="/movies" element={<MoviesPage />} />
            <Route path="/movies/:id/*" element={<MovieDetailsPage />}>
              <Route path="cast" element={<MovieCast />} />
              <Route path="reviews" element={<MovieReviews />} />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>
    </>
  );
};

export default App;
