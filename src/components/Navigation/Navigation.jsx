import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import css from './Navigation.module.css';

const Navigation = () => {
  const setClassName = ({ isActive }) =>
    clsx(css.navLinkItem, isActive && css.activeLink);

  return (
    <nav className={css.navList}>
      <NavLink to="/" className={setClassName}>
        home
      </NavLink>
      <NavLink to="/movies" className={setClassName}>
        movies
      </NavLink>
    </nav>
  );
};

export default Navigation;
