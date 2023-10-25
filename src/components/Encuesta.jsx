import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import encuestas from '../data/encuestas.json'; // Asegúrate de tener la ubicación correcta del archivo JSON

const Encuesta = ({ responderEncuesta }) => {
  const { id } = useParams();
  const encuesta = encuestas.find((enc) => enc.id === parseInt(id));

  const [respuestas, setRespuestas] = useState({});

  const handleRespuestaChange = (e) => {
    const preguntaId = e.target.name;
    const respuesta = e.target.value;

    setRespuestas((prevRespuestas) => ({
      ...prevRespuestas,
      [preguntaId]: respuesta,
    }));
  };

  const handleSubmitRespuestas = (e) => {
    e.preventDefault();
    responderEncuesta(id, respuestas);
  };

  return (
    <div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>{encuesta.titulo}</h2>
          <p>{encuesta.descripcion}</p>
          <br />
        </div>
      </div>
      <div className="encuesta-item-container">
        <div className="encuesta-item">
          <h2>Preguntas</h2>
          <form onSubmit={handleSubmitRespuestas}>
            {encuesta.preguntas.map((pregunta) => (
              <div key={pregunta.id}>
                <p>{pregunta.pregunta}</p>
                <ul>
                  {pregunta.opciones.map((opcion) => (
                    <li key={opcion.id}>
                      <label>
                        <input
                          type="radio"
                          name={pregunta.id}
                          value={opcion.texto}
                          onChange={handleRespuestaChange}
                        />
                        {opcion.texto}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <button type="submit">Enviar Respuestas</button>
          </form>
          <br />
        </div>
      </div>
      <Link to="/">Volver</Link>
    </div>
  );
};

export default Encuesta;
