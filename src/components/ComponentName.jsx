import axios from "axios";
import { useEffect, useState } from "react";

import UpdateItemForm from "../components/updateItemForm";
import Forms from "../components/forms";
import Loader from "./loader";

import "./componentName.css";

const endpoint = "https://server-schedule.vercel.app/schedule";
// const api = axios.create({
//   baseURL: "https://server-schedule.vercel.app",
// });

// api.get(endpoint);

const ComponentName = (props) => {
  const [a, setA] = useState([]);
  const [active, setActive] = useState(false);
  const [indexActive, setIndexActive] = useState(null);
  const [updateTimer, setUpdateTimer] = useState(false);

  const handleUpdateArea = (boolean, index) => {
    setActive(boolean);
    setIndexActive(index);
  };
  console.log({ a });
  useEffect(() => {
    axios.get(endpoint).then((response) => setA(response.data));
  }, []);

  function refreshPage() {
    window.location.reload(false);
  }

  //Deletar datas
  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`${endpoint}/${id}`);
      console.log(response.data.message);
    } catch (error) {
      console.error(error);
    }

    setUpdateTimer(true);

    setTimeout(function () {
      setUpdateTimer(false);
      refreshPage();
    }, 3000);
  };

  return (
    <div className="admin">
      {updateTimer ? (
        <Loader />
      ) : (
        <>
          <Forms refreshPage={refreshPage} setUpdateTimer={setUpdateTimer} />
          <div className="admin__wrapper">
            <h3>Lista de informaçoes de show:</h3>
            {a.map((item, index) => (
              <div key={`form-${index}`} className="admin__infos">
                <div className="admin__infos__wrapper">
                  <span className="admin__infos__key">Local: </span>
                  <span key={`local-${index}`}>{item.local}</span>
                </div>
                <div className="admin__infos__wrapper">
                  <span className="admin__infos__key">Data: </span>
                  <span key={index}>{item.dateBr}</span>
                </div>
                <div className="admin__infos__wrapper">
                  <span className="admin__infos__key">Cidade: </span>
                  <span key={index}>{item.city}</span>
                </div>
                <div className="admin__infos__wrapper">
                  <span className="admin__infos__key">Estado: </span>
                  <span key={index}>{item.state}</span>
                </div>
                <div className="admin__infos__wrapper">
                  <span className="admin__infos__key">Horário: </span>
                  <span key={index}>{item.hour}</span>
                </div>
                <div className="admin__infos__wrapper">
                  <span className="admin__infos__key">Google Maps: </span>
                  <span key={index}>{item.mapsInfo}</span>
                </div>
                <div className="admin__infos__btns">
                  <button
                    key={`btn-${index}`}
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                  <button onClick={() => handleUpdateArea(!active, index)}>
                    {active && index === indexActive ? "Fechar" : "Atualizar"}
                  </button>
                </div>
                {active && index === indexActive ? (
                  <UpdateItemForm
                    setUpdateTimer={setUpdateTimer}
                    updateTimer={updateTimer}
                    item={item}
                  />
                ) : null}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ComponentName;
