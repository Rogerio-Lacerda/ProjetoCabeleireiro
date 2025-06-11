import React from 'react';
import styles from '../css/Header.module.css';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';

const Header = () => {
  const { user, setUser } = React.useContext(UserContext);
  const navigate = useNavigate();

  const loggout = () => {
    localStorage.removeItem('user');
    setUser({ isLogin: false, nome: '', id: '0', user: 0 });
    navigate('/login');
  };
  const agendamento = () => {
    if (user.user === 2) {
      navigate('/agendamento-barbeiro');
    } else if (user.user === 1) {
      navigate('/servicos');
    }
  };

  return (
    <header className={styles.header}>
      <h1 className={styles.titulo}>Robson Cabeleireiros</h1>
      <div className={styles.content}>
        <NavLink to="/" end>
          Home
        </NavLink>

        {user.user === 3 ? (
          <>
            <Link to="/cadastro-barbeiro">Cadastrar Barbeiros</Link>
            <Link to="/cadastro-servicos">Cadastrar Serviços</Link>
          </>
        ) : (
          <a onClick={agendamento}>
            {user.user === 2 ? 'Agendamentos' : 'Serviços'}
          </a>
        )}

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
      </div>
    </header>
  );
};

export default Header;
