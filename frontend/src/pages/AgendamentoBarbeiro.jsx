import React, { useState } from 'react';
import Header from '../layout/Header';
import { UserContext } from '../UserContext';
import styles from '../css/pages/AgendamentoBarbeiro.module.css';

const AgendamentoBarbeiro = () => {
  const { user } = React.useContext(UserContext);
  const [agendados, setAgendados] = useState([]);
  const [deleteMessage, setDeleteMessage] = React.useState('');
  const [error, setError] = React.useState('');

  React.useEffect(() => {
    const listagem = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8888/api/agendamento/barbeiro/${user.id}`,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const data = await response.json();

        if (response.ok) {
          const agendamentos = data.agendamentos;
          const clientes = await Promise.all(
            agendamentos.map(async (item) => {
              const user = await fetch(
                `http://127.0.0.1:8888/api/clientes/${item.client_id}`,
                {
                  method: 'GET',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                },
              );

              const userData = await user.json();
              console.log(userData);

              return {
                id: item.id,
                cliente: userData.informacoes_cliente.nome,
                data: item.data_agend,
                horaInicio: item.inicio_agend,
                horaFim: item.fim_agend,
              };
            }),
          );

          console.log(clientes);
          setAgendados(clientes);
        } else {
          console.log('errado', data);
          setAgendados([]);
        }
      } catch (error) {
        console.error('Error ao fazer requisição', error);
        setAgendados([]);
      }
    };
    listagem();
  }, []);

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
        const novoAgendados = agendados.filter((obj) => obj.id !== id);
        setAgendados(novoAgendados);
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
      <div className={styles.agendamentoBarbeiro}>
        <h2 className={styles.title}>Meus agendamentos</h2>
        {agendados.length == 0 ? (
          <p className={styles.error}>Sem agendamentos!</p>
        ) : (
          <ul className={styles.content}>
            {agendados.map((agendamento, key) => {
              return (
                <li key={key}>
                  <div className={styles.informacoes}>
                    <div className={styles.datas}>
                      <p>
                        Data: <span>{formatarData(agendamento.data)}</span>
                      </p>
                      <p>
                        Início: <span>{agendamento.horaInicio}</span>
                      </p>
                      <p>
                        Fim: <span>{agendamento.horaFim}</span>
                      </p>
                    </div>
                    <div className={styles.divider}></div>
                    <div className={styles.barbeiro}>
                      <p>
                        Cliente: <span>{agendamento.cliente}</span>
                      </p>
                    </div>
                  </div>
                  <div className={styles.buttons}>
                    <button
                      className={styles.buttonExcluir}
                      onClick={() => excluirAgendamento(agendamento.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
};

export default AgendamentoBarbeiro;
