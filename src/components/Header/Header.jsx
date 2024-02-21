import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from "./Header.module.css";

const Sidebar = () => {
  return (
    <div className = {styles.header}>
        <h2>SECRET ZOO</h2>
      <nav>
    
       <ul className={styles.itemList}>
          <li className={styles.item}>
             <NavLink
                to="/"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Home
              </NavLink>
          </li>
          <li className={styles.item}>
             <NavLink
                to="/favourites"
                className={({ isActive }) => (isActive ? styles.active : styles.inactive)}
              >
                Favourites
              </NavLink>
          </li>
       </ul>
      </nav>
    </div>
  );
}

export default Sidebar;