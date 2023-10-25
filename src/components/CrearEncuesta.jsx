import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import encuestas from '../data/encuestas.json';

const CrearEncuesta = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const [numOpciones, setNumOpciones] = useState(0);
  const [pregunta, setPregunta] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [titulo, setTitulo] = useState('');
  const [opciones, setOpciones] = useState([]);

  const onSubmit = (data) => {
    data.pregunta = pregunta;
    data.numOpciones = numOpciones;
    data.descripcion = descripcion;
    data.titulo = titulo;
    data.opciones = opciones;

    const newEncuestaId = encuestas.length + 1;
    data.id = newEncuestaId;

    
    encuestas.push(data);

    
    fetch('../data/encuestas.json', {
      method: 'PUT',
      body: JSON.stringify(encuestas),
    });

    navigate('/');
  };

  const handleNumOpcionesChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setNumOpciones(isNaN(newValue) ? 0 : newValue);
    setOpciones([]);
  };

  const handlePreguntaChange = (e) => {
    setPregunta(e.target.value);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleTituloChange = (e) => {
    setTitulo(e.target.value);
  };

  const handleOpcionesChange = (e, i) => {
    const newOpciones = [...opciones];
    newOpciones[i] = e.target.value;
    setOpciones(newOpciones);
  };

  const renderOpcionesCampos = () => {
    const opcionesCampos = [];
    for (let i = 0; i < numOpciones; i++) {
      opcionesCampos.push(
        <div key={i}>
          <label>{`Opción ${i + 1}:`}</label>
          <input
            type="text"
            id={`opciones[${i}]`}
            name={`opciones[${i}]`}
            onChange={(e) => handleOpcionesChange(e, i)}
          />
          {errors.opciones && errors.opciones[i] && <p>{errors.opciones[i].message}</p>}
        </div>
      );
    }
    return opcionesCampos;
  };

  return (
    <div>
      <h1>Crear Nueva Encuesta</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Título:</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          {...register("titulo", {
            required: 'El título es obligatorio',
            maxLength: { value: 50, message: 'El título debe tener menos de 50 caracteres' }
          })}
          onChange={handleTituloChange}
        />
        {errors.titulo && <p>{errors.titulo.message}</p>}

        <label>Descripción:</label>
        <textarea
          id="descripcion"
          name="descripcion"
          onChange={handleDescripcionChange}
        />
        {errors.descripcion && <p>{errors.descripcion.message}</p>}

        <label>Pregunta:</label>
        <input
          type="text"
          id="pregunta"
          name="pregunta"
          onChange={handlePreguntaChange}
        />
        
        <label>Cantidad de opciones que tendrá la pregunta:</label>
        <input
          type="number"
          id="numOpciones"
          name="numOpciones"
          value={numOpciones}
          onChange={handleNumOpcionesChange}
        />

        {renderOpcionesCampos()}

        <button type="submit">Guardar Encuesta</button>
      </form>
    </div>
  );
};

export default CrearEncuesta;
