import React from 'react';
import styles from '../css/pages/Servicos.module.css';
import Header from '../layout/Header';
import Button from '../components/Button';
import { useNavigate } from 'react-router-dom';

const Servicos = () => {
  const [servicos, setServicos] = React.useState([]);
  const navigate = useNavigate();

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
  }, []);

  const handleClick = (id) => {
    navigate(`/agendamento/${id}`);
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
                        <Button
                          texto="Agendar"
                          onClick={() => handleClick(item.id)}
                        />
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

export default Servicos;
