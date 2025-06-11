import React from 'react';
import styles from '../css/pages/ExcluirServicos.module.css';
import Header from '../layout/Header';

const ExcluirServico = () => {
  const [servicos, setServicos] = React.useState([]);
  const [isMutation, setIsMutation] = React.useState(true);

  React.useEffect(() => {
    const servicosFetch = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8888/api/servicos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (response.ok) {
          console.log('certo', data);
          setServicos(data);
        } else {
          console.log('errado', data);
          setServicos([]);
        }
      } catch (error) {
        console.error('Error ao fazer requisição', error);
        setServicos([]);
      }
    };
    servicosFetch();
  }, [isMutation]);

  const handleClick = async (id) => {
    try {
      const response = await fetch(`http://127.0.0.1:8888/api/servicos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (response.ok) {
        console.log('certo', data);
        setIsMutation(!isMutation);
      } else {
        console.log('errado', data);
      }
    } catch (error) {
      console.error('Error ao fazer requisição', error);
    }
  };

  return (
    <>
      <Header />
      <section className={styles.servicos}>
        <h1 className={styles.title}>Serviços</h1>

        <div className={styles.container}>
          {servicos && servicos.length > 0
            ? servicos.map((item) => {
                return (
                  <>
                    <div className={styles.content} key={item.id}>
                      <div className={styles.contentHorario}>
                        <h2>{item.nome}</h2>
                        <p>{item.duracao} minutos</p>
                      </div>
                      <div className={styles.contentButton}>
                        <p>
                          {item.preco.toLocaleString('pt-BR', {
                            style: 'currency',
                            currency: 'BRL',
                          })}
                        </p>
                        <button
                          onClick={() => handleClick(item.id)}
                          className={styles.btnExcluir}
                        >
                          Excluir
                        </button>
                      </div>
                    </div>
                  </>
                );
              })
            : null}
        </div>
      </section>
    </>
  );
};

export default ExcluirServico;
