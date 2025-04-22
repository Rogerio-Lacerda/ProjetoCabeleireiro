import React from 'react';
import Header from '../layout/Header';
import styles from '../css/pages/Agendados.module.css';
import { UserContext } from '../UserContext';

const Agendados = () => {
  const { user } = React.useContext(UserContext);
  const [agendamentos, setAgendamentos] = React.useState([]);
  const [agendamentosAtualizados, setAgendamentosAtualizados] = React.useState(
    [],
  );
  const [deleteMessage, setDeleteMessage] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    console.log(agendamentosAtualizados);
  }, [agendamentosAtualizados]);

  React.useEffect(() => {
    if (agendamentos.length > 0) {
      const carregarAgendamentos = async () => {
        const novoAgendamento = await Promise.all(
          agendamentos.map(async (item) => {
            try {
              const response = await fetch(
                `http://127.0.0.1:8888/api/barbeiro/${item.barber_id}`,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              );
              const data = await response.json();

              if (response.ok) {
                return { ...item, nome_barbeiro: data.message.nome };
              } else {
                return item; // ou trata como quiser
              }
            } catch (error) {
              console.error('Erro na requisição:', error);
              return item; // mantém o item mesmo se falhar
            }
          }),
        );

        setAgendamentosAtualizados(novoAgendamento); // ou junta com `prev` se quiser acumular
      };

      carregarAgendamentos();
    }
  }, [agendamentos]);

  React.useEffect(() => {
    if (user && user.isLogin) {
      const agendamentosFetch = async () => {
        try {
          const response = await fetch(
            `http://127.0.0.1:8888/api/agendamento/cliente/${user.id}`,
            {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
              },
            },
          );
          const data = await response.json();

          if (response.ok) {
            console.log('certo', data.agendamentos);
            setAgendamentos(data.agendamentos);
          } else {
            console.log('errado', data);
            setAgendamentos([]);
          }
        } catch (error) {
          console.error('Error ao fazer requisição', error);
          setAgendamentos([]);
        }
      };

      agendamentosFetch();
    }
  }, [user]);

  const excluirAgendamento = async (id) => {
    setError('');
    setDeleteMessage('');
    try {
      const response = await fetch(
        `http://127.0.0.1:8888/api/agendamento/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      const data = await response.json();

      if (response.ok) {
        setDeleteMessage(data.message);

        setTimeout(() => {
          setDeleteMessage('');
        }, 4000);
        const novoAgendamento = agendamentosAtualizados.filter(
          (obj) => obj.id !== id,
        );
        setAgendamentosAtualizados(novoAgendamento);
        setError('');
      } else {
        setDeleteMessage('');
        setError('Error ao deletar agendamento');
        setTimeout(() => {
          setError('');
        }, 4000);
      }
    } catch (error) {
      console.error('Error ao fazer requisição', error);
      setDeleteMessage('');
      setError(`Error: ${error}`);
      setTimeout(() => {
        setError('');
      }, 4000);
    }
  };

  const formatarData = (data) => {
    const partes = data.split('-');

    const formatada = `${partes[2]}/${partes[1]}/${partes[0]}`;

    return formatada;
  };

  return (
    <>
      <Header />
      <section className={styles.agendados}>
        {deleteMessage ? (
          <p className={styles.deleteMessage}>{deleteMessage}</p>
        ) : null}
        {error ? <p className={styles.error}>{error}</p> : null}

        <h2 className={styles.title}>Meus agendamentos</h2>

        {agendamentosAtualizados.length > 0 ? (
          <ul className={styles.content}>
            {agendamentosAtualizados.map(
              ({ id, data_agend, inicio_agend, fim_agend, nome_barbeiro }) => {
                return (
                  <li key={`Agend${id}`}>
                    <div className={styles.informacoes}>
                      <div className={styles.datas}>
                        <p>
                          Data: <span>{formatarData(data_agend)}</span>
                        </p>
                        <p>
                          Início: <span>{inicio_agend}</span>
                        </p>
                        <p>
                          Fim: <span>{fim_agend}</span>
                        </p>
                      </div>
                      <div className={styles.divider}></div>
                      <div className={styles.barbeiro}>
                        <p>
                          Barbeiro: <span>{nome_barbeiro}</span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      {/* <button className={styles.buttonEditar}>Editar </button> */}
                      <button
                        className={styles.buttonExcluir}
                        onClick={() => excluirAgendamento(id)}
                      >
                        Excluir
                      </button>
                    </div>
                  </li>
                );
              },
            )}
          </ul>
        ) : (
          <p className={styles.error}>Nenhum agendamento encontrado</p>
        )}
      </section>
    </>
  );
};

export default Agendados;
