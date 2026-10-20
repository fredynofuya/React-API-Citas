import React, { useEffect, useState } from 'react';
import { editarMedico, listaEspecialidades, listaConsultorios } from '../../services/MedicosService';
import '../Paciente/NuevoPacienteStyles.css';

const EditMedicoModal = ({ medico, onClose, onGuardado }) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [form, setForm] = useState({
    nombre: medico.nombreMedico || "",
    email: medico.emailMedico || "",
    id_especialidad: medico.id_especialidad || "",
    id_consultorio: medico.id_consultorio || "",
    registro_profesional: medico.registro_profesional || ""
  });
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    listaEspecialidades().then(res => setEspecialidades(res.data)).catch(err => console.error(err));
    listaConsultorios().then(res => setConsultorios(res.data)).catch(err => console.error(err));
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: null });
  };

  const validar = () => {
    const err = {};
    if (!form.nombre.trim()) err.nombre = "El nombre es obligatorio";
    if (!form.email.trim()) err.email = "El correo es obligatorio";
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Correo inválido";
    if (!form.id_especialidad) err.id_especialidad = "Selecciona una especialidad";
    if (!form.id_consultorio) err.id_consultorio = "Selecciona un consultorio";
    if (!form.registro_profesional.trim()) err.registro_profesional = "El registro profesional es obligatorio";
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleGuardar = async () => {
    if (!validar()) return;
    setGuardando(true);
    setMensaje(null);
    try {
      await editarMedico(medico.id, {
        ...form,
        id_especialidad: Number(form.id_especialidad),
        id_consultorio: Number(form.id_consultorio),
      });
      onGuardado?.();
      onClose();
    } catch (error) {
      console.error('Error editando médico:', error);
      if (error.response?.status === 409) {
        setErrores({ email: 'Ya existe otro usuario con este correo' });
      } else {
        setMensaje({ tipo: 'error', texto: 'No se pudo guardar los cambios. Intenta de nuevo.' });
      }
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal fade show d-block paciente-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content paciente-modal-content">

          <div className="modal-header paciente-modal-header">
            <h5 className="modal-title">Editar médico</h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <div className="modal-body paciente-modal-body">
            {mensaje && <div className={`alerta-paciente ${mensaje.tipo}`}>{mensaje.texto}</div>}

            <div className="paciente-row">
              <div className="input-group-paciente">
                <label>Nombre completo *</label>
                <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
                {errores.nombre && <span className="error-text">{errores.nombre}</span>}
              </div>
              <div className="input-group-paciente">
                <label>Correo *</label>
                <input type="email" name="email" value={form.email} onChange={handleChange} />
                {errores.email && <span className="error-text">{errores.email}</span>}
              </div>
            </div>

            <div className="paciente-row">
              <div className="input-group-paciente">
                <label>Especialidad *</label>
                <select name="id_especialidad" value={form.id_especialidad} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {especialidades.map((e) => <option key={e.id} value={e.id}>{e.nombre}</option>)}
                </select>
                {errores.id_especialidad && <span className="error-text">{errores.id_especialidad}</span>}
              </div>
              <div className="input-group-paciente">
                <label>Consultorio *</label>
                <select name="id_consultorio" value={form.id_consultorio} onChange={handleChange}>
                  <option value="">Seleccionar</option>
                  {consultorios.map((c) => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                </select>
                {errores.id_consultorio && <span className="error-text">{errores.id_consultorio}</span>}
              </div>
            </div>

            <div className="input-group-paciente">
              <label>Registro profesional *</label>
              <input type="text" name="registro_profesional" value={form.registro_profesional} onChange={handleChange} />
              {errores.registro_profesional && <span className="error-text">{errores.registro_profesional}</span>}
            </div>
          </div>

          <div className="modal-footer paciente-modal-footer">
            <button type="button" className="btn-paciente-cancelar" onClick={onClose} disabled={guardando}>Cancelar</button>
            <button type="button" className="btn-paciente-guardar" disabled={guardando} onClick={handleGuardar}>
              {guardando ? 'Guardando...' : 'Guardar cambios'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditMedicoModal;