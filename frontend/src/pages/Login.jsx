import React from 'react';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import styles from '../css/pages/Login.module.css';
import { UserContext } from '../UserContext';

const Login = () => {
  const [form, setForm] = React.useState({
    email: '',
    senha: '',
  });

  const [error, setError] = React.useState('');
  const [sucess, setSucess] = React.useState('');
  const navigate = useNavigate();
  const { user, setUser } = React.useContext(UserContext);

  const handleChange = async (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const cadastrar = () => {
    navigate('/cadastro-cliente');
  };
  
  React.useEffect(() => {
    if (user && user.isLogin) {
      navigate('/');
    }
  }, [user, navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setSucess('');

    try {
      const response = await fetch('http://127.0.0.1:8888/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (response.ok) {
        console.log('Seja bem vindo!', data);

        setError('');
        setSucess('Usuário logado com sucesso!');

        const loggedUser = {
          isLogin: true,
          nome: data.message.nome,
          id: data.message.id,
          user: data.user
        };
        setUser(loggedUser);

        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        console.error('Erro no login:', data);

        setSucess('');
        setUser({ isLogin: false, nome: '', id: '0' });

        if (data) {
          setError([data.message]);
        }
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <div className={styles.cadastro}>
        <form className={styles.form} onSubmit={handleLogin}>
          <h2>Login</h2>
          <Input
            id="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />
          <Input
            id="senha"
            label="Senha"
            value={form.senha}
            onChange={handleChange}
            type="password"
            required
          />
          {error ? (
            <div className={styles.error}>
              <h3>Erro ao logar usuário</h3>
              <ul>
                {error.map((item, index) => (
                  <li key={index}>
                    <Error texto={item} />
                  </li>
                ))}
              </ul>
            </div>
          ) : null}
          {sucess ? (
            <div className={styles.sucess}>
              <h3>{sucess}</h3>
            </div>
          ) : null}

          <Button texto="Logar" className={styles.button} />
          
          <p>Não possui uma conta? <a onClick={cadastrar} style={{ cursor: 'pointer', color: '#b51f21' }}>
          Cadastre-se</a></p>
        </form>
      </div>
    </>
  );
};

export default Login;
