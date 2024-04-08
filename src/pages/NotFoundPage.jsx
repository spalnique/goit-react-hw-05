import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div>
      <h1>404.</h1>
      <Link to="/">Homepage</Link>
    </div>
  );
};

export default NotFoundPage;
