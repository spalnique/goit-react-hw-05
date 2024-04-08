import { useEffect, useState, lazy, Suspense } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../service/api';

const ErrorMessage = lazy(() => import('../ErrorMessage/ErrorMessage'));

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    try {
      const getReviews = async () => {
        const reviews = await fetchMovieReviews(id);
        setReviews(reviews);
      };
      setError(null);
      getReviews();
    } catch (error) {
      setError(error.message);
    }
  }, [id]);

  return (
    <>
      <Suspense>{error && <ErrorMessage error={error} />}</Suspense>
      {reviews && (
        <ul style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          {reviews.map(({ author, content }) => (
            <li
              key={author}
              style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              <span>Author: {author}</span>
              <span>{content}</span>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieReviews;
