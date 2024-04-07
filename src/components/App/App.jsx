import { Route, Routes } from 'react-router-dom';
import Header from '../Header/Header';
import { fetchTrending } from '../../service/api';
import { useEffect, useState, lazy } from 'react';

const HomePage = lazy(() => import('../../pages/HomePage'));

const App = () => {
  const [movies, setMovies] = useState(null);

  useEffect(() => {
    try {
      const getMovies = async () => {
        const movieList = await fetchTrending();
        setMovies(movieList);
      };
      getMovies();
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route
            path="/"
            element={
              Array.isArray(movies) &&
              movies.length && <HomePage movies={movies} />
            }
          />
          <Route path="/movies" element={<p>movies</p>} />
          <Route
            path="*"
            element={
              <div
                style={{
                  width: '100vw',
                  height: '100vh',
                  backgroundColor: 'red',
                }}></div>
            }
          />
        </Routes>
      </main>
    </>
  );
};

export default App;
