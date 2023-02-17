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
              onChange={(e) => setLocal(e.target.value)}
              placeholder="Local"
            />
          </label>
          <label>
            Data:
            <input
              type="text"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              placeholder="YYYY-MM-DD"
            />
          </label>

          <label>
            Cidade:
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Cidade"
            />
          </label>
          <label>
            Estado:
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="Estado"
            />
          </label>
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
