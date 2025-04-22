import React from "react";
import styles from "../css/pages/Agendamento.module.css";
import Button from "../components/Button";
import { UserContext } from "../UserContext";
import Header from "../layout/Header";

const Agendamento = () => {
  const [barbeiros, setBarbeiros] = React.useState([]);
  const [idBarbeiro, setIdBarbeiro] = React.useState("0");

  const [datas, setDatas] = React.useState([]);
  const [idData, setIdData] = React.useState(0);

  const horas = [
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
  ];
  const [idHoras, setIdHoras] = React.useState(0);

  const [sucess, setSucess] = React.useState("");
  const [error, setError] = React.useState("");

  const { user } = React.useContext(UserContext);

  React.useEffect(() => {
    const hoje = new Date();
    const proximasDatas = [];

    for (let i = 0; i < 5; i++) {
      const data = new Date();
      data.setDate(hoje.getDate() + i);

      const dia = String(data.getDate()).padStart(2, "0");
      const mes = String(data.getMonth() + 1).padStart(2, "0");
      const ano = data.getFullYear();

      proximasDatas.push(`${dia}/${mes}/${ano}`);
    }

    setDatas(proximasDatas);
  }, []);

  React.useEffect(() => {
    const barberFetch = async () => {
      try {
        const response = await fetch("http://127.0.0.1:8888/api/barbeiros", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        const data = await response.json();

        if (response.ok) {
          console.log("certo", data.message);
          setBarbeiros(data.message);
        } else {
          console.log("errado", data);
          setBarbeiros([]);
        }
      } catch (error) {
        console.error("Error ao fazer requisição", error);
        setBarbeiros([]);
      }
    };

    barberFetch();
  }, []);

  const handleClick = async () => {
    setError("");
    setSucess("");
    if (idBarbeiro === "0") {
      setError("Selecione um Barbeiro!");
      return;
    }
    const client_id = Number(user.id);
    const barber_id = Number(idBarbeiro);
    const service_id = 1;
    const inicio_agend = horas[idHoras];
    const dataOriginal = datas[idData];
    const [dia, mes, ano] = dataOriginal.split("/");

    const data_agend = `${ano}-${mes}-${dia}`;

    const form = {
      client_id,
      barber_id,
      service_id,
      data_agend,
      inicio_agend,
    };

    try {
      setError("");
      setSucess("");
      const response = await fetch(
        "http://127.0.0.1:8888/api/agendamento/cadastro",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(form),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setError("");
        setSucess(data.message);
      } else {
        setSucess("");
        setError(data.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }

    console.log(form);
  };

  return (
    <>
    <Header/>
      <div className={styles.agendamento}>
        <h2 className={styles.title}>Agendamento</h2>
        <section className={styles.content}>
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
                          idBarbeiro === id ? styles.barbeiroSelected : ""
                        }
                      >
                        {nome} - <span>{especialidade}</span>
                      </li>
                    );
                  })
                : null}
            </ul>
          </div>
          <div className={styles.datas}>
            <div className={styles.datasContent}>
              <h2>Datas disponiveis</h2>

              <ul>
                {datas.map((data, index) => (
                  <li
                    key={index}
                    onClick={() => setIdData(index)}
                    className={idData === index ? styles.dataSelected : ""}
                  >
                    {data}
                  </li>
                ))}
              </ul>

              <div className={styles.horas}>
                {horas.map((hora, index) => {
                  return (
                    <p
                      key={hora}
                      onClick={() => setIdHoras(index)}
                      className={index === idHoras ? styles.horasSelected : ""}
                    >
                      {hora}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className={styles.button}>
              <Button texto="Agendar" onClick={handleClick} />
            </div>
          </div>
        </section>
        {sucess ? <p className={styles.sucess}>{sucess}</p> : null}
        {error ? <p className={styles.error}>{error}</p> : null}
      </div>
    </>
  );
};

export default Agendamento;
