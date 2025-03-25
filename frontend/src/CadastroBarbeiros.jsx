import React from 'react';
import Header from './Header';
import styles from './css/CadastroBarbeiros.module.css';
import Button from './Button';
import Input from './Input';

const CadastroBarbeiros = () => {
  const [form, setForm] = React.useState({
    nome: '',
    email: '',
    celular: '',
    senha: '',
    especialidade: '',
    data_nascimento: '',
  });
  // const [error, setError] = React.useState('');
  // const [sucess, setSucess] = React.useState('');
  // const navigate = useNavigate();

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = () => {};

  return (
    <>
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
            value={form.especialidade}
            onChange={handleChange}
            type="date"
            required
          />

          <Button texto="Cadastrar" className={styles.button} />
        </form>
      </div>
    </>
  );
};

export default CadastroBarbeiros;
