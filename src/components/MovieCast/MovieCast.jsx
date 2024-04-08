import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../service/api';

const ErrorMessage = lazy(() => import('../ErrorMessage/ErrorMessage'));

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      const getCast = async () => {
        const cast = await fetchMovieCast(id);
        setCast(cast);
      };
      setError(false);
      getCast();
    } catch (error) {
      setError(error.message);
    }
  }, [id]);

  return (
    <>
      <Suspense>{error && <ErrorMessage error={error} />}</Suspense>
      {cast && (
        <ul>
          {cast.map(({ name, character, image }) => (
            <li key={name}>
              <ul>
                <li>
                  <img src={image} alt={name} />
                </li>
                <li>
                  <p>{name}</p>
                </li>
                <li>
                  <p>{character}</p>
                </li>
              </ul>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
