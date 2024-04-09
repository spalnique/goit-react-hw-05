import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../service/api';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';
import css from './MovieCast.module.css';

const MovieCast = () => {
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const castRef = useRef();

  useEffect(() => {
    try {
      const getCast = async () => {
        const cast = await fetchMovieCast(id);
        setCast(cast);
      };
      setError(false);
      setLoading(true);
      getCast();
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
    const tID = setTimeout(() => {
      window.scrollTo({
        top: castRef.current.offsetTop - 130,
        behavior: 'smooth',
      });
      clearTimeout(tID);
    }, 500);
  }, [id]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {cast && (
        <ul className={css.castListWrapper} ref={castRef}>
          {cast.map(({ name, character, image }) => {
            return (
              <li key={name}>
                <ul className={css.infoList}>
                  <li className={css.infoImageWrapper}>
                    <img
                      className={css.infoImage}
                      src={image}
                      alt={name}
                      width="200px"
                      height="300px"
                    />
                  </li>
                  <li className={css.infoName}>
                    <p>{name}</p>
                  </li>
                  <li>
                    <p>as {character}</p>
                  </li>
                </ul>
              </li>
            );
          })}
        </ul>
      )}
      {cast && !cast.length && <p>No information about cast</p>}
    </>
  );
};

export default MovieCast;
