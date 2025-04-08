import React from 'react';
import styles from '../css/Header.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const loggout = () => {
    setUser({ isLogin: false, nome: '', id: '0' });
    navigate('/');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.titulo}>Robson Cabeleiros</h1>
      <div className={styles.content}>
        <NavLink to="/" end>
          Home
        </NavLink>
        {user && user.isLogin ? (
          <NavLink to="agendamento">Agendamento</NavLink>
        ) : (
          <NavLink to="login">Login</NavLink>
        )}

        {user && user.isLogin ? (
          <div className={styles.user}>
            {user.nome}
            <nav className={styles.nav}>
              <div className={styles.arrow}></div>
              <ul>
                <li onClick={loggout}>
                  Sair <span>→</span>
                </li>
              </ul>
            </nav>
          </div>
        ) : (
          <NavLink to="cadastro-cliente" end>
            Cadastro
          </NavLink>
        )}

        {/* <div className={styles.cadastro}>
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
        </div> */}
      </div>
    </header>
  );
};

export default Header;
