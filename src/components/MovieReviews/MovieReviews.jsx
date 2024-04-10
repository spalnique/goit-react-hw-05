import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { fetchMovieReviews } from '../../service/api';
import css from './MovieReviews.module.css';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import Loader from '../Loader/Loader';

const MovieReviews = () => {
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState(null);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const reviewsRef = useRef();

  useEffect(() => {
    
    const getReviews = async () => {
      try {
        setError(null);
        setLoading(true);
        const reviews = await fetchMovieReviews(id);
        setReviews(reviews);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    getReviews();
    const tID = setTimeout(() => {
      window.scrollTo({
        top: reviewsRef.current.offsetTop - 130,
        behavior: 'smooth',
      });
      clearTimeout(tID);
    }, 500);
  }, [id]);

  return (
    <>
      {loading && <Loader />}
      {error && <ErrorMessage error={error} />}
      {reviews && (
        <ul className={css.reviewListWrapper} ref={reviewsRef}>
          {reviews.map(({ author, content }) => (
            <li className={css.reviewItem} key={author}>
              <p className={css.reviewAuthor}>Author: {author}</p>
              <p className={css.reviewText}>{content}</p>
            </li>
          ))}
        </ul>
      )}
      {reviews && !reviews.length && <p>No reviews has been posted so far</p>}
    </>
  );
};

export default MovieReviews;
