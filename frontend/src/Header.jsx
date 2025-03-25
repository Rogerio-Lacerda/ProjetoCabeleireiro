import React from 'react';
import styles from './css/Header.module.css';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.titulo}>Robson Cabeleiros</h1>
      <div className={styles.content}>
        <NavLink to="/" end>
          Home
        </NavLink>
        <div className={styles.cadastro}>
          Cadastro
          <nav className={styles.nav}>
            <div className={styles.arrow}></div>
            <ul>
              <li>
                <NavLink to="cadastro-cliente" end>
                  Clientes
                  <span>→</span>
                </NavLink>
              </li>
              <div className={styles.divider}></div>
              <li>
                <NavLink to="cadastro-barbeiro">
                  Barbeiros <span>→</span>
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
