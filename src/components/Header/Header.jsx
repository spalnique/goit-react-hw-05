import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import style from './Header.module.css';

const Header = () => {
  const setClassName = ({ isActive }) =>
    clsx(style.navLinkItem, isActive && style.activeLink);

  return (
    <header>
      <nav className={style.navList}>
        <NavLink to="/" className={setClassName}>
          home
        </NavLink>
        <NavLink to="/hello" className={setClassName}>
          hello
        </NavLink>
        <NavLink to="/world" className={setClassName}>
          world
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
