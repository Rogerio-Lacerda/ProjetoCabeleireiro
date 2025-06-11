import React from 'react';
import Header from '../layout/Header';
import styles from '../css/pages/Agendados.module.css';
import { UserContext } from '../UserContext';
import Button from '../components/Button';

const Agendados = () => {
  const { user } = React.useContext(UserContext);
  const [agendamentos, setAgendamentos] = React.useState([]);
  const [agendamentosAtualizados, setAgendamentosAtualizados] = React.useState(
    [],
  );
  const [deleteMessage, setDeleteMessage] = React.useState('');
  const [error, setError] = React.useState('');
  const [isModal, setIsModal] = React.useState(false);
  const [barbeiros, setBarbeiros] = React.useState([]);
  const [idBarbeiro, setIdBarbeiro] = React.useState('0');

  const [idAgendamento, setIdAgendamento] = React.useState(0);
  const [mutation, setMutation] = React.useState(true);

  const [datas, setDatas] = React.useState([]);
  const [idData, setIdData] = React.useState(0);

  const [servicos, setServicos] = React.useState([]);
  const [agendamentosComServico, setAgendamentosComServico] =
    React.useState('');
  const [servicoId, setServicoId] = React.useState(2);

  const horas = [
    '09:00',
    '10:00',
    '11:00',
    '12:00',
    '13:00',
    '14:00',
    '15:00',
    '16:00',
    '17:00',
    '18:00',
  ];
  const [idHoras, setIdHoras] = React.useState(0);

  const [, setSucess] = React.useState('');

  React.useEffect(() => {
    const hoje = new Date();
    const proximasDatas = [];

    for (let i = 0; i < 5; i++) {
      const data = new Date();
      data.setDate(hoje.getDate() + i);

      const dia = String(data.getDate()).padStart(2, '0');
      const mes = String(data.getMonth() + 1).padStart(2, '0');
      const ano = data.getFullYear();

      proximasDatas.push(`${dia}/${mes}/${ano}`);
    }

    setDatas(proximasDatas);
  }, []);

  const handleClick = async () => {
    setError('');
    setSucess('');
    if (idBarbeiro === '0') {
      setError('Selecione um Barbeiro!');
      return;
    }
    const client_id = Number(user.id);
    const barber_id = Number(idBarbeiro);
    const service_id = Number(servicoId);
    const inicio_agend = horas[idHoras];
    const dataOriginal = datas[idData];
    const [dia, mes, ano] = dataOriginal.split('/');

    const data_agend = `${ano}-${mes}-${dia}`;

    const form = {
      client_id,
      barber_id,
      service_id,
      data_agend,
      inicio_agend,
    };

    try {
      setError('');
      setSucess('');
      const response = await fetch(
        `http://127.0.0.1:8888/api/agendamento/${idAgendamento}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(form),
        },
      );

      const data = await response.json();

      if (response.ok) {
        setMutation(!mutation);
        alert(data.message);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Erro na requisição:', error);
    }

    console.log(form);
  };

  React.useEffect(() => {
    const barberFetch = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8888/api/barbeiros', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();

        if (response.ok) {
          console.log('certo', data.message);
          setBarbeiros(data.message);
        } else {
          console.log('errado', data);
          setBarbeiros([]);
        }
      } catch (error) {
        console.error('Error ao fazer requisição', error);
        setBarbeiros([]);
      }
    };

    barberFetch();
  }, []);

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
  }, [user, mutation]);

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

  React.useEffect(() => {
    if (servicos.length > 0 && agendamentosAtualizados.length > 0) {
      const agendamentosComServico = agendamentosAtualizados.map(
        (agendamento) => {
          const servico = servicos.find((s) => s.id === agendamento.service_id);
          return {
            ...agendamento,
            servico: servico || {},
          };
        },
      );
      setAgendamentosComServico(agendamentosComServico);
    } else {
      setAgendamentosComServico([]);
    }
  }, [servicos, agendamentosAtualizados]);

  return (
    <>
      <Header />
      <section className={styles.agendados}>
        {deleteMessage ? (
          <p className={styles.deleteMessage}>{deleteMessage}</p>
        ) : null}
        {error ? <p className={styles.error}>{error}</p> : null}

        <h2 className={styles.title}>Meus agendamentos</h2>

        {agendamentosComServico.length > 0 ? (
          <ul className={styles.content}>
            {agendamentosComServico.map(
              ({
                id,
                data_agend,
                inicio_agend,
                fim_agend,
                nome_barbeiro,

                servico,
              }) => {
                console.log('eu quero', servico);
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
                      <div className={styles.divider}></div>
                      <div className={styles.servicos}>
                        <p>
                          Serviço: <span>{servico.nome}</span>
                        </p>
                        <p>
                          Duração: <span>{servico.duracao} minutos</span>
                        </p>
                        <p>
                          Preço:{' '}
                          <span>
                            {servico.preco.toLocaleString('pt-BR', {
                              style: 'currency',
                              currency: 'BRL',
                            })}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className={styles.buttons}>
                      <button
                        className={styles.buttonEditar}
                        onClick={() => {
                          setIsModal(true);
                          setIdAgendamento(id);
                        }}
                      >
                        Editar
                      </button>
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
      {isModal ? (
        <section className={styles.containerModal}>
          <div className={styles.contentModal}>
            <button className={styles.closed} onClick={() => setIsModal(false)}>
              X
            </button>

            <div className={styles.servicosEditar}>
              <h2>Escolher serviço</h2>
              <div className={styles.servicosEditarContainer}>
                {servicos && servicos.length > 0
                  ? servicos.map((item) => {
                      return (
                        <>
                          <div
                            className={styles.servicosEditarContent}
                            key={item.id}
                          >
                            <div
                              className={styles.servicosEditarContentHorario}
                            >
                              <h2>{item.nome}</h2>
                              <p>{item.duracao} minutos</p>
                            </div>
                            <div className={styles.servicosEditarContentbutton}>
                              <p>
                                {item.preco.toLocaleString('pt-BR', {
                                  style: 'currency',
                                  currency: 'BRL',
                                })}
                              </p>
                              <button onClick={() => setServicoId(item.id)}>
                                Selecionar
                              </button>
                            </div>
                          </div>
                        </>
                      );
                    })
                  : null}
              </div>
            </div>
            <div className={styles.barbeiros}>
              <h2>Barbeiros</h2>
              <ul>
                {barbeiros.length > 0
                  ? barbeiros.map(({ id, nome, especialidade }) => {
                      return (
                        <li
                          key={`${nome}${id}`}
                          onClick={() => setIdBarbeiro(id)}
                          className={
                            idBarbeiro === id ? styles.barbeiroSelected : ''
                          }
                        >
                          {nome} - <span>{especialidade}</span>
                        </li>
                      );
                    })
                  : null}
              </ul>
            </div>
            <div className={styles.datasReagendar}>
              <div className={styles.datasContent}>
                <h2>Datas disponiveis</h2>

                <ul>
                  {datas.map((data, index) => {
                    if (index === 0) {
                      return null;
                    }
                    return (
                      <li
                        key={index}
                        onClick={() => setIdData(index)}
                        className={idData === index ? styles.dataSelected : ''}
                      >
                        {data}
                      </li>
                    );
                  })}
                </ul>

                <div className={styles.horas}>
                  {horas.map((hora, index) => {
                    return (
                      <p
                        key={hora}
                        onClick={() => setIdHoras(index)}
                        className={
                          index === idHoras ? styles.horasSelected : ''
                        }
                      >
                        {hora}
                      </p>
                    );
                  })}
                </div>
              </div>

              <div className={styles.buttonReagendar}>
                <Button texto="Reagendar" onClick={handleClick} />
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
};

export default Agendados;
