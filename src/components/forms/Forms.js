import { useState } from "react";
import axios from "axios";
import "./Forms.css";

const endpoint = "https://server-schedule.vercel.app/schedule";

const Forms = ({ refreshPage, setUpdateTimer }) => {
  const [date, setDate] = useState("");
  const [local, setLocal] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [address, setAddress] = useState("");
  const [hour, setHour] = useState("");
  const [mapsInfo, setMapsInfo] = useState("");

  const [errorDate, setErrorDate] = useState("");
  const [errorLocal, setErrorLocal] = useState("");
  const [errorCity, setErrorCity] = useState("");
  const [errorState, setErrorState] = useState("");
  const handleCreate = async (data) => {
    try {
      const response = await axios.post(endpoint, data);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
    console.log("criado");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleCreate({ date, local, city, state, address, hour, mapsInfo });

    setUpdateTimer(true);

    setTimeout(function () {
      setUpdateTimer(false);
      refreshPage();
    }, 3000);
  };

  const handleLocal = ({ target }) => {
    if (target.value.length === 0) {
      setErrorLocal("Campo Obrigatório");
    } else {
      setErrorLocal("");
    }
    setLocal(target.value);
  };

  const handleDate = ({ target }) => {
    const regEx = /^\d{4}-\d{2}-\d{2}$/;

    if (!target.value.match(regEx)) {
      setErrorDate("A data deve ser YYYY-MM-DD. Exemplo 2023-12-31");
    } else {
      setErrorDate("");
    }
    setDate(target.value);
  };

  const handleCity = ({ target }) => {
    if (target.value.length === 0) {
      setErrorCity("Campo Obrigatório");
    } else {
      setErrorCity("");
    }
    setCity(target.value);
  };

  const handleState = ({ target }) => {
    if (target.value.length <= 1) {
      setErrorState("Campo com duas letras. Exemplo: RS");
    } else {
      setErrorState("");
    }
    setState(target.value);
  };

  return (
    <div className="forms">
      <div className="forms__wrapper">
        <h3 className="forms__wrapper__title">
          Preencha as informações do local de show:
        </h3>
        <form onSubmit={handleSubmit} className="forms__inputs">
          <label>
            Nome do Local:
            <input
              type="text"
              value={local}
              onChange={(e) => handleLocal(e)}
              placeholder="Local"
            />
          </label>
          {errorLocal && <div style={{ color: "red" }}>{errorLocal}</div>}
          <label>
            Data:
            <input
              type="text"
              value={date}
              onChange={(e) => handleDate(e)}
              placeholder="YYYY-MM-DD"
            />
          </label>
          {errorDate && <div style={{ color: "red" }}>{errorDate}</div>}
          <label>
            Cidade:
            <input
              type="text"
              value={city}
              onChange={(e) => handleCity(e)}
              placeholder="Cidade"
            />
          </label>
          {errorCity && <div style={{ color: "red" }}>{errorCity}</div>}
          <label>
            Estado:
            <input
              type="text"
              value={state}
              onChange={(e) => handleState(e)}
              placeholder="Estado"
            />
          </label>
          {errorState && <div style={{ color: "red" }}>{errorState}</div>}

          <label>
            Endereço:
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Av/Rua..."
            />
          </label>
          <label>
            Horário:
            <input
              type="text"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              placeholder="00h00"
            />
          </label>
          <label>
            Google Maps:
            <input
              type="text"
              value={mapsInfo}
              onChange={(e) => setMapsInfo(e.target.value)}
              placeholder="https://www.google.com.br/maps/"
            />
          </label>
          <button className="forms__infos__btn" type="submit">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forms;
