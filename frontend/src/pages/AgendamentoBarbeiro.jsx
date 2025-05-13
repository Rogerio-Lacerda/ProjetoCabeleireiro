import React, { useState } from "react";
import Header from "../layout/Header";
import { UserContext } from "../UserContext";

const AgendamentoBarbeiro = () => {
  const { user, setUser } = React.useContext(UserContext);
  const [agendados, setAgendados] = useState([]);
  const [deleteMessage, setDeleteMessage] = React.useState("");
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    const listagem = async () => {
      try {
        const response = await fetch(
          `http://127.0.0.1:8888/api/agendamento/barbeiro/${user.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        if (response.ok) {
          const agendamentos = data.agendamentos;
          const clientes = await Promise.all(
            agendamentos.map(async (item) => {
              const user = await fetch(
                `http://127.0.0.1:8888/api/clientes/${item.client_id}`,
                {
                  method: "GET",
                  headers: {
                    "Content-Type": "application/json",
                  },
                }
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
            })
          );

          console.log(clientes);
          setAgendados(clientes);
        } else {
          console.log("errado", data);
          setAgendados([]);
        }
      } catch (error) {
        console.error("Error ao fazer requisição", error);
        setAgendados([]);
      }
    };
    listagem();
  }, []);

  const excluirAgendamento = async (id) => {
    setError("");
    setDeleteMessage("");
    try {
      const response = await fetch(
        `http://127.0.0.1:8888/api/agendamento/${id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();

      if (response.ok) {
        setDeleteMessage(data.message);

        setTimeout(() => {
          setDeleteMessage("");
        }, 4000);
        setError("");
      } else {
        setDeleteMessage("");
        setError("Error ao deletar agendamento");
        setTimeout(() => {
          setError("");
        }, 4000);
      }
    } catch (error) {
      console.error("Error ao fazer requisição", error);
      setDeleteMessage("");
      setError(`Error: ${error}`);
      setTimeout(() => {
        setError("");
      }, 4000);
    }
  };

  return (
    <>
      <Header />
      <p>Agendamento barbeiro</p>
      {agendados.length == 0 ? (
        <p>Sem agendamentos!</p>
      ) : (
        agendados.map((agendamento, key) => {
          return (
            <li key={key}>
              <div>
                {agendamento.cliente} - <span>{agendamento.data} </span> -{" "}
                <span>{agendamento.horaInicio} </span>-{" "}
                <span>{agendamento.horaFim} </span>
              </div>
              <button onClick={() => excluirAgendamento(agendamento.id)}>
                Excluir
              </button>
            </li>
          );
        })
      )}
    </>
  );
};

export default AgendamentoBarbeiro;
