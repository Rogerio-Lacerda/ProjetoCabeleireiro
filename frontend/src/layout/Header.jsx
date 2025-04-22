import React from 'react';
import styles from '../css/Header.module.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const loggout = () => {
    localStorage.removeItem('user');
    setUser({ isLogin: false, nome: '', id: '0' });
    navigate('/login');
  };
  const agendamento = () => {
    navigate('/agendamento');
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.titulo}>Robson Cabeleireiros</h1>
      <div className={styles.content}>
        <NavLink to="/" end>
          Home
        </NavLink>

        <a onClick={agendamento}>Agendamento</a>

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
