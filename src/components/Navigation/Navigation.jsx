import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import style from './Navigation.module.css';

const Navigation = () => {
  const setClassName = ({ isActive }) =>
    clsx(style.navLinkItem, isActive && style.activeLink);

  return (
    <header>
      <nav className={style.navList}>
        <NavLink to="/" className={setClassName}>
          home
        </NavLink>
        <NavLink to="/movies" className={setClassName}>
          movies
        </NavLink>
      </nav>
    </header>
  );
};

export default Navigation;
