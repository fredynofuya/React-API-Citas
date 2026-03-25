import React, { useState } from "react";
import '../styles/SolicitudCitaStyles.css';
import { useEffect } from 'react';

const SolicitudCita = () => {

  useEffect(() => {
          document.title = 'Solicitud';
        }, []);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    tipoDocumento: "Cédula de ciudadanía",
    documento: "",
    telefono: "",
    eps: "",
    mensaje: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="solicitud-wrapper">
      <h1>Agenda tu Cita</h1> <br />
      <p className="subtitle">
        Déjanos tus datos y un agente se pondrá en contacto contigo en las próximas 24 horas
      </p>

      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group">
            <input type="text" name="nombre" placeholder="Nombre *" onChange={handleChange} />
          </div>

          <div className="input-group">
            <input type="email" name="correo" placeholder="Correo Electrónico *" onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <select name="tipoDocumento" onChange={handleChange}>
              <option>Cédula de ciudadanía</option>
              <option>Tarjeta de identidad</option>
              <option>Pasaporte</option>
            </select>
          </div>

          <div className="input-group">
            <input type="text" name="documento" placeholder="Documento *" onChange={handleChange} />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <input type="text" name="telefono" placeholder="Teléfono *" onChange={handleChange} />
          </div>

          <div className="input-group">
            <select name="eps" onChange={handleChange}>
              <option value="">Seleccionar EPS *</option>
              <option>Sura</option>
              <option>Sanitas</option>
              <option>Nueva EPS</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <textarea name="mensaje" placeholder="Mensaje *" onChange={handleChange}></textarea>
        </div>

        <div className="upload-box">
          <p>Sube tus documentos</p>
          <input type="file" multiple />
        </div>

        <button className="btn-sol" type="submit">Enviar solicitud</button>
      </form>
    </div>
  );
};

export default SolicitudCita;