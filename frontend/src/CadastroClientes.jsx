import React from 'react';
import Header from './Header';
import styles from './css/CadastroClientes.module.css';
import Input from './Input';
import Button from './Button';

const CadastroClientes = () => {
  const [form, setForm] = React.useState({
    nome: '',
    email: '',
    telefone: '',
    senha: '',
  });

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
    console.log(value);
  };

  return (
    <>
      <Header />
      <div className={styles.cadastro}>
        <form className={styles.form}>
          <h2>Cadastro Clientes</h2>
          <Input
            id="nome"
            label="Nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
          <Input
            id="email"
            label="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            id="telefone"
            label="Telefone"
            value={form.telefone}
            onChange={handleChange}
            required
          />
          <Input
            id="senha"
            label="Senha"
            value={form.senha}
            onChange={handleChange}
            required
          />
          <Button texto="Cadastrar" className={styles.button} />
        </form>
      </div>
    </>
  );
};

export default CadastroClientes;
