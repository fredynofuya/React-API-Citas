import React, { useState } from 'react';
import { crearUsuario, editarUsuario } from '../../services/UsuariosService';
import '../Paciente/NuevoPacienteStyles.css';

const UsuarioFormModal = ({ usuario, onClose, onGuardado }) => {
  const editando = !!usuario;
  const [form, setForm] = useState({
    nombre: usuario?.nombre || '',
    email: usuario?.email || '',
    password: '',
  });
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: null });
  };

  const validar = () => {
    const err = {};
    if (!form.nombre.trim()) err.nombre = 'El nombre es obligatorio';
    if (!form.email.trim()) err.email = 'El correo es obligatorio';
    else if (!/\S+@\S+\.\S+/.test(form.email)) err.email = 'Correo inválido';
    if (!editando && form.password.length < 8) err.password = 'Mínimo 8 caracteres';
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setGuardando(true);
    setMensaje(null);
    try {
      const datos = { nombre: form.nombre.trim(), email: form.email.trim() };
      if (editando) await editarUsuario(usuario.id, datos);
      else await crearUsuario({ ...datos, password: form.password });

      onGuardado?.();
      onClose();
    } catch (error) {
      console.error('Error guardando usuario:', error);
      const status = error.response?.status;
      if (status === 409) setErrores({ email: 'Ya existe un usuario con este correo' });
      else if (status === 403) setMensaje({ tipo: 'error', texto: 'No tienes permisos para gestionar usuarios.' });
      else setMensaje({ tipo: 'error', texto: 'No se pudo guardar el usuario. Intenta de nuevo.' });
    } finally {
      setGuardando(false);
    }
  };

  return (
    <div className="modal fade show d-block paciente-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content paciente-modal-content">

          <div className="modal-header paciente-modal-header">
            <h5 className="modal-title">{editando ? 'Editar usuario' : 'Nuevo usuario'}</h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body paciente-modal-body">
              {mensaje && <div className={`alerta-paciente ${mensaje.tipo}`}>{mensaje.texto}</div>}

              {!editando && (
                <p style={{ fontSize: 13, color: '#6b7a7a', marginBottom: 16 }}>
                  Se crea como <strong>Administrador</strong>: puede gestionar citas, pacientes y médicos, pero no usuarios.
                </p>
              )}

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

              {!editando && (
                <div className="input-group-paciente">
                  <label>Contraseña temporal *</label>
                  <input type="password" name="password" value={form.password} onChange={handleChange} autoComplete="new-password" />
                  {errores.password && <span className="error-text">{errores.password}</span>}
                </div>
              )}
            </div>

            <div className="modal-footer paciente-modal-footer">
              <button type="button" className="btn-paciente-cancelar" onClick={onClose} disabled={guardando}>Cancelar</button>
              <button type="submit" className="btn-paciente-guardar" disabled={guardando}>
                {guardando ? 'Guardando...' : (editando ? 'Guardar cambios' : 'Guardar usuario')}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default UsuarioFormModal;