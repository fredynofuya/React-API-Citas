import React, { useState } from 'react';
import { cambiarEstadoMedico } from '../../services/MedicosService';
import '../Paciente/NuevoPacienteStyles.css';
import '../Paciente/PacienteStyles.css';

const CambiarEstadoMedicoModal = ({ medico, onClose, onCambiado }) => {
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);
  const activar = !medico.activoMedico;

  const confirmar = () => {
    setGuardando(true);
    setError(null);

    cambiarEstadoMedico(medico.id, activar)
      .then(() => {
        onCambiado?.();
        onClose();
      })
      .catch((err) => {
        console.error('Error cambiando estado del médico:', err);
        if (err.response?.status === 403) {
          setError('No tienes permisos para realizar esta acción.');
        } else if (!err.response) {
          // Sin respuesta del servidor: caído, o petición bloqueada por CORS.
          setError('No se pudo comunicar con el servidor. Revisa que esté activo.');
        } else {
          setError('No se pudo cambiar el estado del médico. Intenta de nuevo.');
        }
      })
      .finally(() => setGuardando(false));
  };

  return (
    <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cita-modal-content">
          <div className={`modal-header cita-modal-header ${activar ? '' : 'danger'}`}>
            <h5 className="modal-title">{activar ? 'Activar médico' : 'Desactivar médico'}</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>
          <div className="modal-body cita-modal-body">
            {error && <div className="alerta-paciente error">{error}</div>}
            <p>
              {activar
                ? <>¿Reactivar a <strong>{medico.nombreMedico}</strong>? Podrá volver a iniciar sesión.</>
                : <>¿Desactivar a <strong>{medico.nombreMedico}</strong>? No podrá iniciar sesión hasta que lo reactives. Su historial de citas no se modifica.</>
              }
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

export default CambiarEstadoMedicoModal;