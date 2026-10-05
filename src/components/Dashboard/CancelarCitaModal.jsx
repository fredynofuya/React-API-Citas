import React, { useState } from 'react';
import { editarCita } from '../../services/CitasService';
import './EditCitaStyles.css';

const CancelarCitaModal = ({ cita, onClose, onCancelada }) => {
  const [motivo, setMotivo] = useState('');
  const [error, setError] = useState(null);
  const [guardando, setGuardando] = useState(false);

  const handleCancelar = () => {
    if (!motivo.trim()) {
      setError('Indica el motivo de la cancelación.');
      return;
    }
    setGuardando(true);
    setError(null);

    editarCita(cita.id, {
      estado: 'CANCELADA',
      observaciones: motivo.trim()
    })
      .then(() => {
        onCancelada?.();
        onClose();
      })
      .catch((err) => {
        console.error('Error cancelando cita:', err);
        setError('No se pudo cancelar la cita. Intenta de nuevo.');
      })
      .finally(() => setGuardando(false));
  };

  return (
    <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cita-modal-content">

          <div className="modal-header cita-modal-header warning">
            <h5 className="modal-title">Cancelar cita</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body cita-modal-body">
            {error && <div className="edit-cita-error">{error}</div>}

            <div className="delete-cita-icon">⚠️</div> 
                <p className="delete-cita-texto">
                    ¿Seguro que deseas cancelar esta cita?
                </p>
            <div className="cancelar-cita-resumen" style={{ marginBottom: 18 }}>
              <div><span>Paciente</span><strong>{cita.nombre}</strong></div>
              <div><span>Documento</span><strong>{cita.documento}</strong></div>
              <div>
                <span>Fecha y hora</span>
                <strong>
                  {cita.fecha ? `${cita.fecha} · ${cita.hora?.substring(0, 5) ?? ''}` : 'Sin asignar'}
                </strong>
              </div>
              <div><span>Médico</span><strong>{cita.nombreMedico || (cita.id_medico ? `#${cita.id_medico}` : 'Sin asignar')}</strong></div>
            </div>

            <div className="edit-cita-step">
              <label>Motivo de la cancelación *</label>
              <textarea
                className="form-control"
                rows="3"
                placeholder="Ej: El paciente no puede asistir / El médico tuvo una emergencia"
                value={motivo}
                onChange={(e) => { setMotivo(e.target.value); setError(null); }}
              />
            </div>
          </div>

          <div className="modal-footer cita-modal-footer">
            <button className="btn-cita-cancelar" onClick={onClose} disabled={guardando}>
              Volver
            </button>
            <button className="btn-cita-cancelar-c" onClick={handleCancelar} disabled={guardando}>
              {guardando ? 'Cancelando...' : 'Sí, cancelar'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CancelarCitaModal;