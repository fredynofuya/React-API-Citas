import React, { useState } from 'react';
import { cambiarPassword } from '../../services/AuthService';
import { useAuth } from '../../context/AuthContext';
import { mensajeError } from '../../utils/mensajeError';
import '../Paciente/NuevoPacienteStyles.css';

const CambiarPasswordModal = ({ onClose }) => {
  const { actualizarSesion } = useAuth();
  const [form, setForm] = useState({ actual: '', nueva: '', confirmar: '' });
  const [errores, setErrores] = useState({});
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrores({ ...errores, [e.target.name]: null });
  };

  const validar = () => {
    const err = {};
    if (!form.actual) err.actual = 'Ingresa tu contraseña actual';
    if (form.nueva.length < 8) err.nueva = 'Mínimo 8 caracteres';
    else if (form.nueva === form.actual) err.nueva = 'Debe ser distinta de la actual';
    if (form.confirmar !== form.nueva) err.confirmar = 'Las contraseñas no coinciden';
    setErrores(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validar()) return;

    setGuardando(true);
    setMensaje(null);
    try {
      const res = await cambiarPassword(form.actual, form.nueva);
      actualizarSesion(res.data); // token nuevo: esta sesión continúa, las demás se cierran
      setMensaje({ tipo: 'exito', texto: 'Contraseña actualizada. Se cerraron tus otras sesiones.' });
      setTimeout(onClose, 1800);
    } catch (err) {
      console.error('Error cambiando la contraseña:', err);
      setMensaje({ tipo: 'error', texto: mensajeError(err, 'No se pudo cambiar la contraseña. Intenta de nuevo.') });
    } finally {
      setGuardando(false);
    }
  };

  const guardado = mensaje?.tipo === 'exito';

  return (
    <div className="modal fade show d-block paciente-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content paciente-modal-content">

          <div className="modal-header paciente-modal-header">
            <h5 className="modal-title">Cambiar contraseña</h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="modal-body paciente-modal-body">
              {mensaje && <div className={`alerta-paciente ${mensaje.tipo}`}>{mensaje.texto}</div>}

              <div className="input-group-paciente" style={{ marginBottom: 16 }}>
                <label>Contraseña actual *</label>
                <input type="password" name="actual" value={form.actual} onChange={handleChange} autoComplete="current-password" />
                {errores.actual && <span className="error-text">{errores.actual}</span>}
              </div>

              <div className="paciente-row">
                <div className="input-group-paciente">
                  <label>Nueva contraseña *</label>
                  <input type="password" name="nueva" value={form.nueva} onChange={handleChange} autoComplete="new-password" />
                  {errores.nueva && <span className="error-text">{errores.nueva}</span>}
                </div>
                <div className="input-group-paciente">
                  <label>Confirmar nueva *</label>
                  <input type="password" name="confirmar" value={form.confirmar} onChange={handleChange} autoComplete="new-password" />
                  {errores.confirmar && <span className="error-text">{errores.confirmar}</span>}
                </div>
              </div>
            </div>

            <div className="modal-footer paciente-modal-footer">
              <button type="button" className="btn-paciente-cancelar" onClick={onClose} disabled={guardando}>Cancelar</button>
              <button type="submit" className="btn-paciente-guardar" disabled={guardando || guardado}>
                {guardando ? 'Guardando...' : 'Cambiar contraseña'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
};

export default CambiarPasswordModal;