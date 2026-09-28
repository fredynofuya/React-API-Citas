import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPacienteByDocumento } from '../../services/PacientesService';
import { listaMedicos, obtenerDisponibilidad, crearCita } from '../../services/CitasService';
import { HORARIOS, formatearHora12, hoyLocal } from '../../utils/horarios';
import './DashboardStyles.css';
import '../Paciente/NuevoPacienteStyles.css';
import './EditCitaStyles.css';

const NuevaCitaModal = ({ show, onClose, onCreated }) => {
  const [documento, setDocumento] = useState('');
  const [buscando, setBuscando] = useState(false);
  const [paciente, setPaciente] = useState(null);
  const [estadoBusqueda, setEstadoBusqueda] = useState(null); // null | 'noexiste' | 'error'

  const [medicos, setMedicos] = useState([]);
  const [idMedico, setIdMedico] = useState('');
  const [fecha, setFecha] = useState('');
  const [hora, setHora] = useState('');
  const [horasOcupadas, setHorasOcupadas] = useState([]);
  const [motivo, setMotivo] = useState('');

  const [guardando, setGuardando] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!show) return;
    listaMedicos()
      .then(res => setMedicos(res.data))
      .catch(err => console.error('Error cargando médicos:', err));
  }, [show]);

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

  if (!show) return null;

  const cerrar = () => {
    setDocumento(''); setPaciente(null); setEstadoBusqueda(null);
    setIdMedico(''); setFecha(''); setHora(''); setMotivo('');
    setError(null);
    onClose();
  };

  const handleDocumentoChange = (e) => {
    setDocumento(e.target.value);
    setPaciente(null);          // evita crear la cita a un paciente ya descartado
    setEstadoBusqueda(null);
  };

  const buscarPaciente = async (e) => {
    e.preventDefault();
    const doc = documento.trim();
    if (!doc) return;

    setBuscando(true);
    setPaciente(null);
    setEstadoBusqueda(null);
    try {
      const res = await getPacienteByDocumento(doc);
      // Cuando no existe, el backend responde vacío/null (Optional.empty)
      if (res.data && res.data.id) setPaciente(res.data);
      else setEstadoBusqueda('noexiste');
    } catch (err) {
      console.error('Error buscando paciente:', err);
      setEstadoBusqueda('error');
    } finally {
      setBuscando(false);
    }
  };

  const puedeConfirmar = paciente && idMedico && fecha && hora && !guardando;

  const handleConfirmar = () => {
    if (!puedeConfirmar) return;
    setGuardando(true);
    setError(null);

    crearCita({
      // Datos del paciente ya registrado: POST /cita hace upsert por documento y no los altera
      nombre: paciente.nombre,
      email: paciente.email,
      telefono: paciente.telefono,
      tipo_documento: paciente.tipo_documento,
      documento: paciente.documento,
      eps: paciente.eps,
      // Datos de la cita
      id_medico: Number(idMedico),
      fecha,
      hora: `${hora}:00`,
      mensaje: motivo,
      estado: 'CONFIRMADA'
    })
      .then(() => {
        onCreated?.();
        cerrar();
      })
      .catch((err) => {
        console.error('Error creando cita:', err);
        const status = err.response?.status;
        if (status === 409) {
          setError('El médico ya tiene una cita asignada en esa fecha y hora.');
        } else if (status === 400) {
          setError('Al paciente le falta tipo de documento o EPS. Complétalos en la sección Pacientes.');
        } else {
          setError('No se pudo crear la cita. Intenta de nuevo.');
        }
      })
      .finally(() => setGuardando(false));
  };

  return (
    <div className="modal fade show d-block paciente-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content paciente-modal-content">

          <div className="modal-header paciente-modal-header">
            <div>
              <h5 className="modal-title">Nueva cita</h5>
              <small style={{ opacity: 0.85 }}>Paciente → médico → fecha y hora</small>
            </div>
            <button className="btn-close btn-close-white" onClick={cerrar}></button>
          </div>

          <div className="modal-body paciente-modal-body">

            {error && <div className="alerta-paciente error">{error}</div>}

            {/* PASO 1 */}
            <div className="cita-seccion">
              <h6>1. Buscar paciente por documento</h6>
              <form className="cita-buscar" onSubmit={buscarPaciente}>
                <input
                  type="text"
                  placeholder="Número de documento"
                  value={documento}
                  onChange={handleDocumentoChange}
                />
                <button type="submit" className="btn-buscar" disabled={buscando || !documento.trim()}>
                  {buscando ? 'Buscando...' : 'Buscar'}
                </button>
              </form>

              {paciente && (
                <div className="paciente-encontrado">
                  <div className="nombre">✔ {paciente.nombre}</div>
                  <div><strong>Documento:</strong> {paciente.tipo_documento} {paciente.documento}</div>
                  <div><strong>EPS:</strong> {paciente.eps}</div>
                  <div><strong>Teléfono:</strong> {paciente.telefono || '—'}</div>
                  <div><strong>Correo:</strong> {paciente.email || '—'}</div>
                </div>
              )}

              {estadoBusqueda === 'noexiste' && (
                <div className="paciente-no-encontrado">
                  No existe un paciente con ese documento.{' '}
                  <Link to="/dashboard/pacientes" onClick={cerrar}>Regístralo primero en Pacientes</Link>.
                </div>
              )}
              {estadoBusqueda === 'error' && (
                <div className="paciente-no-encontrado">No se pudo consultar. Verifica que el servidor esté activo.</div>
              )}
            </div>

            {/* PASOS 2 y 3: habilitados solo con paciente encontrado */}
            <fieldset className="cita-fieldset" disabled={!paciente}>
              <div className="cita-seccion">
                <h6>2. Médico, fecha y hora</h6>
                <div className="paciente-row">
                  <div className="input-group-paciente">
                    <label>Médico *</label>
                    <select value={idMedico} onChange={(e) => { setIdMedico(e.target.value); setHora(''); }}>
                      <option value="">Seleccionar médico</option>
                      {medicos.map((m) => (
                        <option key={m.id} value={m.id}>
                          {m.nombreMedico || `Médico #${m.id}`}
                          {m.nombreConsultorio ? ` - ${m.nombreConsultorio}` : ''}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="input-group-paciente">
                    <label>Fecha *</label>
                    <input type="date" min={hoyLocal()} value={fecha}
                      onChange={(e) => { setFecha(e.target.value); setHora(''); }} />
                  </div>
                </div>

                {idMedico && fecha && (
                  <div className="edit-cita-horarios">
                    {HORARIOS.map((h) => {
                      const ocupado = horasOcupadas.includes(h);
                      return (
                        <button
                          type="button"
                          key={h}
                          disabled={ocupado}
                          className={`horario-btn ${ocupado ? 'ocupado' : ''} ${hora === h ? 'seleccionado' : ''}`}
                          onClick={() => setHora(h)}
                        >
                          {formatearHora12(h)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>

              <div className="cita-seccion">
                <h6>3. Motivo de la consulta (opcional)</h6>
                <div className="input-group-paciente">
                  <textarea rows="2" value={motivo} onChange={(e) => setMotivo(e.target.value)} />
                </div>
              </div>
            </fieldset>

          </div>

          <div className="modal-footer paciente-modal-footer">
            <button type="button" className="btn-paciente-cancelar" onClick={cerrar}>Cancelar</button>
            <button type="button" className="btn-paciente-guardar" disabled={!puedeConfirmar} onClick={handleConfirmar}>
              {guardando ? 'Guardando...' : 'Confirmar cita'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default NuevaCitaModal;