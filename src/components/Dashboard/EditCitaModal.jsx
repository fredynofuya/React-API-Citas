import React, { useEffect, useState } from 'react';
import { listaMedicos, obtenerDisponibilidad, editarCita } from '../../services/CitasService';
import './EditCitaStyles.css';
import { HORARIOS, formatearHora12} from '../../utils/horarios';


const EditCitaModal = ({ cita, onClose, onGuardado }) => {
  const [medicos, setMedicos] = useState([]);
  const [idMedico, setIdMedico] = useState(cita.id_medico || "");
  const [fecha, setFecha] = useState(cita.fecha || "");
  const [hora, setHora] = useState(cita.hora ? cita.hora.substring(0, 5) : "");
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    listaMedicos()
      .then(res => setMedicos(res.data))
      .catch(err => console.error('Error cargando médicos:', err));
  }, []);

  useEffect(() => {
    if (idMedico && fecha) {
      obtenerDisponibilidad(idMedico, fecha)
        .then(res => setHorasOcupadas(res.data.map(h => h.substring(0, 5))))
        .catch(err => {
          console.error('Error cargando disponibilidad:', err);
          setHorasOcupadas([]);
        });
    } else {
      setHorasOcupadas([]);
    }
  }, [idMedico, fecha]);

  const handleGuardar = () => {
    if (!idMedico || !fecha || !hora) {
      setError('Selecciona médico, fecha y hora antes de guardar.');
      return;
    }

    setGuardando(true);
    setError(null);

    editarCita(cita.id, {
      id_medico: idMedico,
      fecha: fecha,
      hora: `${hora}:00`,
      estado: 'CONFIRMADA'
    })
      .then(() => {
        onGuardado();
        onClose();
      })
      .catch((err) => {
        if (err.response && err.response.status === 409) {
          setError('El médico ya tiene una cita asignada en esa fecha y hora.');
        } else {
          setError('No se pudo guardar la cita. Intenta de nuevo.');
        }
        console.error('Error guardando cita:', err);
      })
      .finally(() => setGuardando(false));
  };

  return (
    <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content cita-modal-content">

          <div className="modal-header cita-modal-header">
            <h5 className="modal-title">Editar cita</h5>
            <button className="btn-close" onClick={onClose}></button>
          </div>

          <div className="modal-body cita-modal-body">

            <div className="edit-cita-info-row">
              <div>
                <strong>ID Cita</strong>
                <p>{cita.id}</p>
              </div>
              <div>
                <strong>Paciente</strong>
                <p>{cita.nombre}</p>
              </div>
              <div>
                <strong>Contacto</strong>
                <p>{cita.telefono}</p>
              </div>
            </div>

            {error && <p className="edit-cita-error">{error}</p>}

            <div className="edit-cita-step">
              <label>1. Elige el médico:</label>
              <select
                className="form-select"
                value={idMedico}
                onChange={(e) => { setIdMedico(e.target.value); setHora(""); }}
              >
                <option value="">Seleccionar médico</option>
                {medicos.map((m) => (
                  <option key={m.id} value={m.id}>
                    {(m.nombreMedico || `Médico #${m.id}`)}
                    {m.nombreConsultorio ? ` - ${m.nombreConsultorio}` : ''}
                  </option>
                ))}
              </select>
            </div>

            <div className="edit-cita-step">
              <label>2. Elige fecha y hora:</label>
              <input
                type="date"
                className="form-control"
                value={fecha}
                onChange={(e) => { setFecha(e.target.value); setHora(""); }}
              />

              {idMedico && fecha && (
                <div className="edit-cita-horarios">
                  {HORARIOS.map((h) => {
                    const ocupado = horasOcupadas.includes(h);
                    const seleccionado = hora === h;
                    return (
                      <button
                        type="button"
                        key={h}
                        disabled={ocupado}
                        className={
                          `horario-btn ${ocupado ? 'ocupado' : ''} ${seleccionado ? 'seleccionado' : ''}`
                        }
                        onClick={() => setHora(h)}
                      >
                        {formatearHora12(h)}
                      </button>
                    );
                  })}
                </div>
              )}
              
            </div>

          </div>

          {/* <div className="modal-footer cita-modal-footer"> 
            <button className="btn btn-cita-cancelar" onClick={onClose} disabled={guardando}>
              Cancelar
            </button>
            <button className="btn btn-cita-guardar" onClick={handleGuardar} disabled={guardando}>
              {guardando ? 'Guardando...' : 'Guardar'}
            </button>
          </div> */}
          <div className="modal-footer paciente-modal-footer">
            <button type="button" className="btn-paciente-cancelar" onClick={onClose} disabled={guardando}>
              Cancelar
            </button>
            <button type="button" className="btn-paciente-guardar" disabled={guardando} onClick={handleGuardar}>
              {guardando ? 'Guardando...' : 'Confirmar cita'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EditCitaModal;