import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieCast } from '../../service/api';

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      const getCast = async () => {
        const movieID = Number(id);
        const cast = await fetchMovieCast(movieID);
        setCast(cast);
      };
      getCast();
    } catch (error) {
      console.log('error', error.message);
    }
  }, [id]);
  return (
    <ul>
      {cast &&
        cast.map(({ name, character, image }) => (
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
  );
};

export default MovieCast;
