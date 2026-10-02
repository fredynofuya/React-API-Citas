import React, { useEffect, useState } from 'react';
import './AgendaStyles.css';
import { listaCitasConfirmada, listaCitas, editarCita } from '../../services/CitasService';
import 'bootstrap/dist/css/bootstrap.min.css';
import IconButton from '@mui/material/IconButton';

import UndoIcon from '@mui/icons-material/Undo';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircle';

const Agenda = () => {
    const [citas, setCitas] = useState([]);
    const [filtro, setFiltro] = useState('CONFIRMADA'); // 'CONFIRMADA' | 'ATENDIDA' | 'TODAS'
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [accion, setAccion] = useState(null); // 'atendida' | 'revertir' | null
    const [procesando, setProcesando] = useState(false);

    const cargar = () => {
        const peticion = filtro === 'TODAS'
            ? listaCitas()
            : listaCitasConfirmada(filtro);

        peticion
            .then(response => setCitas(response.data))
            .catch(error => console.error('Error fetching data:', error));
    };

    useEffect(() => {
        document.title = 'Agenda';
        cargar();
    }, [filtro]);

    const abrirConfirmacion = (cita, tipo) => {
        setCitaSeleccionada(cita);
        setAccion(tipo); // 'atendida' o 'revertir'
    };

    const confirmarCambioEstado = () => {
        const nuevoEstado = accion === 'atendida' ? 'ATENDIDA' : 'CONFIRMADA';
        setProcesando(true);
        editarCita(citaSeleccionada.id, { estado: nuevoEstado })
            .then(() => {
                cargar();
                setAccion(null);
                setCitaSeleccionada(null);
            })
            .catch(err => console.error('Error actualizando estado de la cita:', err))
            .finally(() => setProcesando(false));
    };

    return (
        <div className="home">
            <div className="TitleList table-responsive-custom">
                <h1 className='text-left'>Agenda</h1>

                <div className="agenda-filtros">
                    <button className={`filtro-btn ${filtro === 'CONFIRMADA' ? 'activo' : ''}`} onClick={() => setFiltro('CONFIRMADA')}>
                        Confirmadas
                    </button>
                    <button className={`filtro-btn ${filtro === 'ATENDIDA' ? 'activo' : ''}`} onClick={() => setFiltro('ATENDIDA')}>
                        Atendidas
                    </button>
                    <button className={`filtro-btn ${filtro === 'TODAS' ? 'activo' : ''}`} onClick={() => setFiltro('TODAS')}>
                        Todas
                    </button>
                </div>

                {citas.length === 0 && <p>No hay citas en este filtro.</p>}

                {citas.length > 0 && (
                    <table className="table table-striped table-bordered">
                        <thead className="Thead">
                            <tr>
                                <th>Documento</th>
                                <th>Nombre Completo</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Médico</th>
                                <th>Estado</th>
                                <th>Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.documento}</td>
                                    <td>{cita.nombre}</td>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.nombreMedico || `#${cita.id_medico}`}</td>
                                    <td>{cita.estado}</td>
                                    <td>
                                        {cita.estado === 'CONFIRMADA' && (
                                            <IconButton
                                                color="success"
                                                size="small"
                                                title="Marcar atendida"
                                                aria-label="Marcar cita como atendida"
                                                onClick={() => abrirConfirmacion(cita, 'atendida')}
                                            >
                                                <CheckCircleOutlineIcon />
                                            </IconButton>
                                        )}
                                        {cita.estado === 'ATENDIDA' && (
                                            <IconButton
                                                color="warning"
                                                size="small"
                                                title="Revertir a confirmada"
                                                aria-label="Revertir cita a confirmada"
                                                onClick={() => abrirConfirmacion(cita, 'revertir')}
                                            >
                                                <UndoIcon />
                                            </IconButton>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                {accion && citaSeleccionada && (
                    <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content cita-modal-content">
                                <div className="modal-header cita-modal-header">
                                    <h5 className="modal-title">
                                        {accion === 'atendida' ? 'Marcar cita como atendida' : 'Revertir a confirmada'}
                                    </h5>
                                    <button className="btn-close" onClick={() => setAccion(null)}></button>
                                </div>
                                <div className="modal-body cita-modal-body">
                                    <p>
                                        {accion === 'atendida'
                                            ? <>Confirmas que el paciente <strong>{citaSeleccionada.nombre}</strong> ya fue atendido en la cita del <strong>{citaSeleccionada.fecha} · {citaSeleccionada.hora?.substring(0,5)}</strong>?</>
                                            : <>¿Devolver la cita de <strong>{citaSeleccionada.nombre}</strong> ({citaSeleccionada.fecha} · {citaSeleccionada.hora?.substring(0,5)}) a estado confirmada?</>
                                        }
                                    </p>
                                </div>
                                <div className="modal-footer cita-modal-footer">
                                    <button className="btn-cita-cancelar" onClick={() => setAccion(null)} disabled={procesando}>
                                        Cancelar
                                    </button>
                                    <button className="btn-cita-guardar" onClick={confirmarCambioEstado} disabled={procesando}>
                                        {procesando ? 'Guardando...' : 'Confirmar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Agenda;