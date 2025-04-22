import React from 'react';
import Header from '../layout/Header';
import styles from '../css/pages/CadastroClientes.module.css';
import Input from '../components/Input';
import Button from '../components/Button';
import Error from '../components/Error';
import { useNavigate } from 'react-router-dom';

const CadastroClientes = () => {
  const [form, setForm] = React.useState({
    nome: '',
    email: '',
    celular: '',
    senha: '',
  });
  const [error, setError] = React.useState('');
  const [sucess, setSucess] = React.useState('');
  const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  const login = () => {
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSucess('');

    try {
      const response = await fetch(
        'http://127.0.0.1:8888/api/clientes/cadastro',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Cliente cadastrado com sucesso:', data);

        setError('');
        setSucess('Cliente cadastrado com sucesso!');
        setTimeout(() => {
          navigate('/');
        }, 2000);
      } else {
        console.error('Erro no cadastro:', data);

        setSucess('');
        if (data.message === 'Email já cadastrado.') {
          setError([data.message]);
        } else {
          setError(
            Object.entries(data.errors).map(
              ([chave, valor]) => `${chave}: ${valor}`,
            ),
          );
        }
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };

  return (
    <>
      <div className={styles.cadastro}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Cadastro Clientes</h2>
          <Input
            id="nome"
            label="Nome"
            value={form.nome}
            onChange={handleChange}
            type="name"
            required
          />
          <Input
            id="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            type="email"
            required
          />
          <Input
            id="celular"
            label="Celular"
            value={form.celular}
            onChange={handleChange}
            type="tel"
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
              <h3>Erro ao cadastrar cliente</h3>
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

          <Button texto="Cadastrar" className={styles.button} />

          <p>Já possui uma conta? <a onClick={login} style={{ cursor: 'pointer', color: '#b51f21' }}>
          Logar</a></p>
        </form>
      </div>
    </>
  );
};

export default CadastroClientes;
