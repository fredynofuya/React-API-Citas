import React, { useState, useEffect } from "react";
import '../styles/SolicitudCitaStyles.css';
import { crearCita } from '../services/CitasService';

const SolicitudCita = () => {

  useEffect(() => {
    document.title = 'Solicitud';
  }, []);

  const [form, setForm] = useState({
    nombre: "",
    correo: "",
    tipoDocumento: "CC",
    documento: "",
    telefono: "",
    eps: "",
    mensaje: ""
  });

  const [enviando, setEnviando] = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensajeEstado(null);

    const cita = {
      nombre: form.nombre,
      email: form.correo,
      tipo_documento: form.tipoDocumento,
      documento: form.documento,
      telefono: form.telefono,
      eps: form.eps,
      mensaje: form.mensaje
    };

    crearCita(cita)
      .then(() => {
        setMensajeEstado({ tipo: 'exito', texto: 'Tu solicitud fue enviada correctamente. Nos pondremos en contacto pronto.' });
        setForm({ nombre: "", correo: "", tipoDocumento: "CC", documento: "", telefono: "", eps: "", mensaje: "" });
      })
      .catch((error) => {
        console.error('Error creando la cita:', error);
        setMensajeEstado({ tipo: 'error', texto: 'No se pudo enviar la solicitud. Intenta de nuevo.' });
      })
      .finally(() => setEnviando(false));
  };

  return (
    <div className="solicitud-wrapper">
      <h1>Agenda tu Cita</h1> <br />
      <p>Déjanos tus datos y un agente se pondrá en contacto contigo en las próximas 24 horas</p>

      {mensajeEstado && (
        <p style={{ textAlign: 'center', color: mensajeEstado.tipo === 'exito' ? 'green' : 'red' }}>
          {mensajeEstado.texto}
        </p>
      )}

      <form className="form" onSubmit={handleSubmit}>
        <div className="row">
          <div className="input-group">
            <input type="text" name="nombre" placeholder="Nombre *" value={form.nombre} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <input type="email" name="correo" placeholder="Correo Electrónico *" value={form.correo} onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <select name="tipoDocumento" value={form.tipoDocumento} onChange={handleChange}>
              <option value="CC">Cédula de ciudadanía</option>
              <option value="TI">Tarjeta de identidad</option>
              <option value="PASAPORTE">Pasaporte</option>
            </select>
          </div>
          <div className="input-group">
            <input type="text" name="documento" placeholder="Documento *" value={form.documento} onChange={handleChange} required />
          </div>
        </div>

        <div className="row">
          <div className="input-group">
            <input type="text" name="telefono" placeholder="Teléfono *" value={form.telefono} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <select name="eps" value={form.eps} onChange={handleChange} required>
              <option value="">Seleccionar EPS *</option>
              <option value="SURA">Sura</option>
              <option value="SANITAS">Sanitas</option>
              <option value="SAVIASALUD">Savia Salud</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <textarea name="mensaje" placeholder="Mensaje *" value={form.mensaje} onChange={handleChange}></textarea>
        </div>

        {/* Sección de subida de documentos removida por decisión del proyecto — se agregará más adelante */}

        <button className="btn-sol" type="submit" disabled={enviando}>
          {enviando ? 'Enviando...' : 'Enviar solicitud'}
        </button>
      </form>
    </div>
  );
};

export default SolicitudCita;