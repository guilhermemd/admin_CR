import { useState } from "react";
import axios from "axios";
// import Loader from "../loader";

import "./updateItemForm.css";
const UpdateItemForm = ({ item, setUpdateTimer, refreshPage }) => {
  const endpoint = "https://server-schedule.vercel.app/schedule";

  const [date, setDate] = useState(item.date.slice(0, 10));
  const [local, setLocal] = useState(item.local);
  const [city, setCity] = useState(item.city);
  const [state, setState] = useState(item.state);
  const [address, setAddress] = useState(item.address);
  const [hour, setHour] = useState(item.hour);
  const [mapsInfo, setMapsInfo] = useState(item.mapsInfo);
  const handleUpdate = async (id, data) => {
    try {
      const response = await axios.patch(`${endpoint}/${id}`, data);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdate(item._id, {
      date,
      local,
      city,
      state,
      address,
      hour,
      mapsInfo,
    });
    //GAMBIARRA

    setUpdateTimer(true);

    setTimeout(function () {
      setUpdateTimer(false);
      refreshPage();
    }, 3000);
  };

  return (
    <div className="updateItemForm">
      <form className="updateItemForm__form" onSubmit={handleSubmit}>
        <div className="updateItemForm__input__wrapper">
          <label>
            Nome do local:
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
              placeholder="Data"
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
            Estado:
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
              placeholder="Horário"
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
        </div>
        <button className="updateItemForm__submit" type="submit">
          Atualizar
          {/* {updateTimer ? <Loader /> : "Enviar"} */}
        </button>
      </form>
    </div>
  );
};

export default UpdateItemForm;
