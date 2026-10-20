import React, { useEffect, useState } from 'react';
import { crearMedico, listaEspecialidades, listaConsultorios } from '../../services/MedicosService';
import '../Paciente/NuevoPacienteStyles.css';

const FORM_INICIAL = {
  nombre: "", email: "", password: "",
  id_especialidad: "", id_consultorio: "", registro_profesional: ""
};

const NuevoMedicoModal = ({ show, onClose, onCreated }) => {
  const [especialidades, setEspecialidades] = useState([]);
  const [consultorios, setConsultorios] = useState([]);
  const [form, setForm] = useState(FORM_INICIAL);
  const [errores, setErrores] = useState({});
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  useEffect(() => {
    if (!show) return;
    listaEspecialidades()
      .then(res => setEspecialidades(res.data))
      .catch(err => console.error('Error cargando especialidades:', err));
    listaConsultorios()
      .then(res => setConsultorios(res.data))
      .catch(err => console.error('Error cargando consultorios:', err));
  }, [show]);

  if (!show) return null;

  // El componente sigue montado aunque esté oculto, así que todo el estado
  // se limpia al cerrar; si no, la próxima apertura hereda el anterior.
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
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = "Correo inválido";
    if (!form.password || form.password.length < 8) err.password = "Mínimo 8 caracteres";
    if (!form.id_especialidad) err.id_especialidad = "Selecciona una especialidad";
    if (!form.id_consultorio) err.id_consultorio = "Selecciona un consultorio";
    if (!form.registro_profesional.trim()) err.registro_profesional = "El registro profesional es obligatorio";
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setEnviando(true);
    setMensaje(null);
    try {
      const response = await crearMedico({
        ...form,
        nombre: form.nombre.trim(),
        email: form.email.trim(),
        registro_profesional: form.registro_profesional.trim(),
        id_especialidad: Number(form.id_especialidad),
        id_consultorio: Number(form.id_consultorio),
      });
      setMensaje({ tipo: 'exito', texto: 'Médico creado correctamente' });
      onCreated?.(response.data);
      setTimeout(cerrar, 1200);
    } catch (error) {
      console.error('Error creando médico:', error);
      if (error.response?.status === 409) {
        setErrores({ email: 'Ya existe un usuario con este correo' });
      } else if (error.response?.status === 403) {
        setMensaje({ tipo: 'error', texto: 'No tienes permisos para crear médicos.' });
      } else {
        setMensaje({ tipo: 'error', texto: 'No se pudo crear el médico. Intenta de nuevo.' });
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
            <h5 className="modal-title">Nuevo médico</h5>
            <button className="btn-close btn-close-white" onClick={cerrar}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body paciente-modal-body">

              {mensaje && <div className={`alerta-paciente ${mensaje.tipo}`}>{mensaje.texto}</div>}

              <div className="paciente-row">
                <div className="input-group-paciente">
                  <label>Nombre completo *</label>
                  <input type="text" name="nombre" value={form.nombre} onChange={handleChange} />
                  {errores.nombre && <span className="error-text">{errores.nombre}</span>}
                </div>
                <div className="input-group-paciente">
                  <label>Correo (usuario) *</label>
                  <input type="email" name="email" value={form.email} onChange={handleChange} />
                  {errores.email && <span className="error-text">{errores.email}</span>}
                </div>
              </div>

              <div className="paciente-row">
                <div className="input-group-paciente">
                  <label>Contraseña temporal *</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
                  {errores.password && <span className="error-text">{errores.password}</span>}
                </div>
                <div className="input-group-paciente">
                  <label>Registro profesional *</label>
                  <input type="text" name="registro_profesional" value={form.registro_profesional} onChange={handleChange} />
                  {errores.registro_profesional && <span className="error-text">{errores.registro_profesional}</span>}
                </div>
              </div>

              <div className="paciente-row">
                <div className="input-group-paciente">
                  <label>Especialidad *</label>
                  <select name="id_especialidad" value={form.id_especialidad} onChange={handleChange}>
                    <option value="">Seleccionar</option>
                    {especialidades.map((esp) => (
                      <option key={esp.id} value={esp.id}>{esp.nombre}</option>
                    ))}
                  </select>
                  {errores.id_especialidad && <span className="error-text">{errores.id_especialidad}</span>}
                </div>
                <div className="input-group-paciente">
                  <label>Consultorio *</label>
                  <select name="id_consultorio" value={form.id_consultorio} onChange={handleChange}>
                    <option value="">Seleccionar</option>
                    {consultorios.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.nombre}{c.ubicacion ? ` — ${c.ubicacion}` : ''}
                      </option>
                    ))}
                  </select>
                  {errores.id_consultorio && <span className="error-text">{errores.id_consultorio}</span>}
                </div>
              </div>

            </div>

            <div className="modal-footer paciente-modal-footer">
              <button type="button" className="btn-paciente-cancelar" onClick={cerrar}>Cancelar</button>
              <button type="submit" className="btn-paciente-guardar" disabled={enviando || guardado}>
                {enviando ? 'Guardando...' : 'Guardar médico'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default NuevoMedicoModal;