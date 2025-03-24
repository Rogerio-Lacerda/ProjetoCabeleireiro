import React from 'react';
import Header from './Header';
import styles from './css/CadastroClientes.module.css';
import Input from './Input';
import Button from './Button';

const CadastroClientes = () => {
  const [form, setForm] = React.useState({
    nome: '',
    email: '',
    celular: '',
    senha: '',
  });

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Impede o comportamento padrão do formulário (recarregar a página)

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
        // Aqui você pode exibir uma mensagem de sucesso ou redirecionar o usuário
        console.log('Cliente cadastrado com sucesso:', data);
      } else {
        // Exibe mensagem de erro, caso o cadastro falhe
        console.error('Erro no cadastro:', data);
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
          <Button texto="Cadastrar" className={styles.button} />
        </form>
      </div>
    </>
  );
};

export default CadastroClientes;
