import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={css.mainWrapper}>
      <h1 className={css.title}>404.</h1>
      <Link to="/" className={css.homeButton}>
        Go back to homepage
      </Link>
    </div>
  );
};

export default NotFoundPage;
