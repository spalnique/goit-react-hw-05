import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../service/api';

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      const getReviews = async () => {
        const movieID = Number(id);
        const reviews = await fetchMovieReviews(movieID);
        setReviews(reviews);
      };
      getReviews();
    } catch (error) {
      console.log('error', error.message);
    }
  }, [id]);
  return (
    <ul style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
      {reviews &&
        reviews.map(({ author, content }) => (
          <li
            key={author}
            style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <span>Author: {author}</span>
            <span>{content}</span>
          </li>
        ))}
    </ul>
  );
};

export default MovieReviews;
