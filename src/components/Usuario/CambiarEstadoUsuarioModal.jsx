import React, { useState } from 'react';
import { cambiarEstadoUsuario } from '../../services/UsuariosService';
import '../Paciente/NuevoPacienteStyles.css';
import '../Paciente/PacienteStyles.css';

const CambiarEstadoUsuarioModal = ({ usuario, onClose, onCambiado }) => {
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const activar = !usuario.activo;

  const confirmar = () => {
    setGuardando(true);
    setError(null);

    cambiarEstadoUsuario(usuario.id, activar)
      .then(() => { onCambiado?.(); onClose(); })
      .catch((err) => {
        console.error('Error cambiando estado del usuario:', err);
        if (err.response?.status === 403) setError('No tienes permisos para realizar esta acción.');
        else if (err.response?.status === 400) setError('No puedes desactivar tu propia cuenta.');
        else if (!err.response) setError('No se pudo comunicar con el servidor. Revisa que esté activo.');
        else setError('No se pudo cambiar el estado del usuario. Intenta de nuevo.');
      })
      .finally(() => setGuardando(false));
  };

  return (
    <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cita-modal-content">
          <div className={`modal-header cita-modal-header ${activar ? '' : 'danger'}`}>
            <h5 className="modal-title">{activar ? 'Activar usuario' : 'Desactivar usuario'}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body cita-modal-body">
            {error && <div className="alerta-paciente error">{error}</div>}
            <p>
              {activar
                ? <>¿Reactivar a <strong>{usuario.nombre}</strong>? Podrá volver a iniciar sesión.</>
                : <>¿Desactivar a <strong>{usuario.nombre}</strong>? Perderá el acceso de inmediato, incluso si tiene la sesión abierta.</>}
            </p>
          </div>
          <div className="modal-footer cita-modal-footer">
            <button className="btn-cita-cancelar" onClick={onClose} disabled={guardando}>Cancelar</button>
            <button className={activar ? 'btn-cita-guardar' : 'btn-cita-eliminar'} onClick={confirmar} disabled={guardando}>
              {guardando ? 'Guardando...' : (activar ? 'Sí, activar' : 'Sí, desactivar')}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CambiarEstadoUsuarioModal;