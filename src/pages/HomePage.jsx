import { Link } from 'react-router-dom';

const HomePage = ({ movies }) => {
  return (
    <ul>
      {movies.map(({ id, title }) => {
        return (
          <li key={id}>
            <Link>{title}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default HomePage;
