import React from 'react';
import Header from '../layout/Header';
import styles from '../css/pages/CadastroBarbeiros.module.css';
import Button from '../components/Button';
import Input from '../components/Input';
import { useNavigate } from 'react-router-dom';
import Error from '../components/Error';
import { UserContext } from '../UserContext';

const CadastroBarbeiros = () => {
  const [form, setForm] = React.useState({
    nome: '',
    email: '',
    celular: '',
    senha: '',
    especialidade: '',
    data_nascimento: '',
  });
  const [error, setError] = React.useState('');
  const [sucess, setSucess] = React.useState('');
  const navigate = useNavigate();
  const { user } = React.useContext(UserContext);

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSucess('');

    try {
      const response = await fetch(
        `http://127.0.0.1:8888/api/barbeiro/cadastro/${user.id}`,
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
        console.log('Barbeiro cadastrado com sucesso:', data);

        setError('');
        setSucess('Barbeiro cadastrado com sucesso!');
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
      <Header />
      <div className={styles.cadastro}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <h2>Cadastro Barbeiros</h2>
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
          <Input
            id="especialidade"
            label="Especialidade"
            value={form.especialidade}
            onChange={handleChange}
            type="text"
            required
          />
          <Input
            id="data_nascimento"
            label="Data de nascimento"
            value={form.data_nascimento}
            onChange={handleChange}
            type="date"
            required
          />

          {error ? (
            <div className={styles.error}>
              <h3>Erro ao cadastrar barbeiro</h3>
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
        </form>
      </div>
    </>
  );
};

export default CadastroBarbeiros;
