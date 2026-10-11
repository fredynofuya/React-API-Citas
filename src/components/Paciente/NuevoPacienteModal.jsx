import React, { useState } from 'react';
import { crearPaciente, getPacienteByDocumento } from '../../services/PacientesService';
import './NuevoPacienteStyles.css';

const FORM_INICIAL = {
  nombre: "", email: "", tipo_documento: "",
  documento: "", telefono: "", eps: ""
};

const NuevoPacienteModal = ({ show, onClose, onCreated }) => {
  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  if (!show) return null;

  // El componente sigue montado aunque esté oculto, así que todo el estado
  // se limpia al cerrar; si no, la próxima apertura hereda el estado anterior.
  const cerrar = () => {
    setForm(FORM_INICIAL);
    setErrores({});
    setMensaje(null);
    setEnviando(false);
    onClose();
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: null });
  };

  const validar = () => {
    const err = {};
    if (!form.nombre.trim()) err.nombre = "El nombre es obligatorio";
    if (!form.email.trim()) err.email = "El correo es obligatorio";
    if (!form.tipo_documento) err.tipo_documento = "Selecciona un tipo de documento";
    if (!form.documento.trim()) err.documento = "El documento es obligatorio";
    if (!form.telefono.trim()) err.telefono = "El teléfono es obligatorio";
    if (!form.eps) err.eps = "Selecciona una EPS";
    if (form.email && !/\S+@\S+\.\S+/.test(form.email)) err.email = "Correo inválido";
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setEnviando(true);
    setMensaje(null);
    try {
      const documento = form.documento.trim();

      // Validación preventiva de documento duplicado
      const existente = await getPacienteByDocumento(documento).catch(() => null);
      if (existente?.data?.id) {
        setErrores({ documento: "Ya existe un paciente con este documento" });
        return; // el finally restablece "enviando"
      }

      const response = await crearPaciente({
        ...form,
        nombre: form.nombre.trim(),
        documento,
      });
      setMensaje({ tipo: 'exito', texto: 'Paciente creado correctamente' });
      onCreated?.(response.data);
      setTimeout(cerrar, 1200);
    } catch (error) {
      console.error('Error creando paciente:', error);
      if (error.response?.status === 409) {
        setErrores({ documento: 'Ya existe un paciente con este documento' });
      } else if (error.response?.status === 403) {
        setMensaje({ tipo: 'error', texto: 'No tienes permisos para crear pacientes.' });
      } else {
        setMensaje({ tipo: 'error', texto: 'No se pudo crear el paciente. Intenta de nuevo.' });
      }
    } finally {
      setEnviando(false);
    }
  };

  const guardado = mensaje?.tipo === 'exito';

  return (
    <div className="modal fade show d-block paciente-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content paciente-modal-content">

          <div className="modal-header paciente-modal-header">
            <h5 className="modal-title">Nuevo Paciente</h5>
            <button className="btn-close btn-close-white" onClick={cerrar}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body paciente-modal-body">

              {mensaje && (
                <div className={`alerta-paciente ${mensaje.tipo}`}>{mensaje.texto}</div>
              )}

              <div className="paciente-row">
                <div className="input-group-paciente">
                  <label>Nombre completo*</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
                  {errores.nombre && <span className="error-text">{errores.nombre}</span>}
                </div>
                <div className="input-group-paciente">
                  <label>Correo electrónico*</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} />
                  {errores.email && <span className="error-text">{errores.email}</span>}
                </div>
              </div>

              <div className="paciente-row">
                <div className="input-group-paciente">
                  <label>Tipo de documento*</label>
                  <select name="tipo_documento" value={form.tipo_documento} onChange={handleChange}>
                    <option value="">Seleccionar Tipo de Documento</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="PASAPORTE">Pasaporte</option>
                  </select>
                  {errores.tipo_documento && <span className="error-text">{errores.tipo_documento}</span>}
                </div>
                <div className="input-group-paciente">
                  <label>Número de documento*</label>
                  <input type="text" name="documento" value={form.documento} onChange={handleChange} />
                  {errores.documento && <span className="error-text">{errores.documento}</span>}
                </div>
              </div>

              <div className="paciente-row">
                <div className="input-group-paciente">
                  <label>Teléfono*</label>
                  <input type="text" name="telefono" value={form.telefono} onChange={handleChange} />
                  {errores.telefono && <span className="error-text">{errores.telefono}</span>}
                </div>
                <div className="input-group-paciente">
                  <label>EPS*</label>
                  <select name="eps" value={form.eps} onChange={handleChange}>
                    <option value="">Seleccionar EPS</option>
                    <option value="SURA">Sura</option>
                    <option value="SANITAS">Sanitas</option>
                    <option value="SAVIASALUD">Savia Salud</option>
                  </select>
                  {errores.eps && <span className="error-text">{errores.eps}</span>}
                </div>
              </div>

            </div>

            <div className="modal-footer paciente-modal-footer">
              <button type="button" className="btn-paciente-cancelar" onClick={cerrar}>Cancelar</button>
              <button type="submit" className="btn-paciente-guardar" disabled={enviando || guardado}>
                {enviando ? 'Guardando...' : 'Guardar paciente'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default NuevoPacienteModal;