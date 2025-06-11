import React from 'react';
import styles from '../css/pages/CadastrarServicos.module.css';
import Header from '../layout/Header';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const CadastrarServicos = () => {
  const [form, setForm] = React.useState({
    nome: '',
    duracao_minutos: '',
    preco: '',
  });
  const [error, setError] = React.useState('');
  const [sucess, setSucess] = React.useState('');

  const handleChange = ({ target }) => {
    const { id, value } = target;
    setForm({ ...form, [id]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSucess('');

    const formAtual = {
      nome: form.nome,
      descricao: form.nome,
      duracao_minutos: Number(form.duracao_minutos),
      preco: Number(form.preco),
    };

    try {
      const response = await fetch(
        `http://127.0.0.1:8888/api/servicos/cadastro`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formAtual),
        },
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Serviço cadastrado com sucesso:', data);

        setError('');
        setSucess('Serviço cadastrado com sucesso!');
        setTimeout(() => {
          setSucess('');
        }, 2000);
      } else {
        console.error('Erro no cadastro:', data);

        setSucess('');
        setError('Error ao cadastrar o serviço');
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }
  };
  return (
    <>
      <Header />
      <section className={styles.cadastro}>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.excluirServico}>
            <h2>Cadastro Serviços</h2>
            <Link to="/excluir-servicos">Serviços</Link>
          </div>
          <Input
            id="nome"
            label="Nome"
            value={form.nome}
            onChange={handleChange}
            type="text"
            required
          />
          <Input
            id="duracao_minutos"
            label="Duração minutos"
            value={form.duracao_minutos}
            onChange={handleChange}
            type="number"
            required
          />
          <Input
            id="preco"
            label="Preço"
            value={form.preco}
            onChange={handleChange}
            type="number"
            required
          />
          {error ? (
            <div className={styles.error}>
              <h3>{error}</h3>
            </div>
          ) : null}
          {sucess ? (
            <div className={styles.sucess}>
              <h3>{sucess}</h3>
            </div>
          ) : null}

          <Button texto="Cadastrar" className={styles.button} />
        </form>
      </section>
    </>
  );
};

export default CadastrarServicos;
