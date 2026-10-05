import React, { useEffect, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../styles/AdminTableStyles.css';
import './PacienteStyles.css';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { listaPacientes, eliminarPaciente } from '../../services/PacientesService';
import NuevoPacienteModal from './NuevoPacienteModal';
import { normalizar, paginasVisibles } from '../../utils/tablaHelpers';
import EditPacienteModal from './EditPacienteModal';
import '../Dashboard/EditCitaStyles.css'

const PAGE_SIZES = [5, 10, 25, 50];

const epsClase = (eps) => {
    switch (eps) {
        case 'SURA': return 'eps-badge sura';
        case 'SANITAS': return 'eps-badge sanitas';
        case 'SAVIASALUD': return 'eps-badge savia';
        default: return 'eps-badge';
    }
};

const Pacientes = () => {
    const [pacientes, setPacientes] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);
    const [showModal, setShowModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [pacienteSeleccionado, setPacienteSeleccionado] = useState(null);
    const [eliminando, setEliminando] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const cargar = () => {
        setCargando(true);
        setError(null);
        listaPacientes()
            .then(res => setPacientes(res.data))
            .catch(err => {
                console.error('Error cargando pacientes:', err);
                setError('No se pudieron cargar los pacientes. Revisa tu conexión e inténtalo de nuevo.');
            })
            .finally(() => setCargando(false));
    };

    useEffect(() => {
        document.title = 'Pacientes';
        cargar();
    }, []);

    const filtrados = useMemo(() => {
        const q = normalizar(busqueda.trim());
        if (!q) return pacientes;
        return pacientes.filter((p) => {
            const texto = [p.documento, p.nombre, p.email, p.telefono, p.eps].join(' ');
            return normalizar(texto).includes(q);
        });
    }, [pacientes, busqueda]);

    const abrirModalEditar = (paciente) => {
        setPacienteSeleccionado(paciente);
        setShowEditModal(true);
    };

     const abrirModalEliminar = (paciente) => {
        setPacienteSeleccionado(paciente);
        setShowDeleteModal(true);
    };

     const confirmarEliminar = () => {
            setEliminando(true);
            eliminarPaciente(pacienteSeleccionado.id)
                .then(() => {
                    setPacientes((prev) => prev.filter((p) => p.id !== pacienteSeleccionado.id));
                    setShowDeleteModal(false);
                })
                .catch((err) => console.error('Error deleting data:', err))
                .finally(() => setEliminando(false));
        };

    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
    const paginaActual = Math.min(pagina, totalPaginas);
    const inicio = (paginaActual - 1) * porPagina;
    const visibles = filtrados.slice(inicio, inicio + porPagina);

    return (
        <div className="cd">
            <header className="cd-header">
                <div>
                    <h1 className="cd-title">Pacientes</h1>
                    <p className="cd-subtitle">
                        {cargando ? 'Cargando…' : `${pacientes.length} ${pacientes.length === 1 ? 'paciente registrado' : 'pacientes registrados'}`}
                    </p>
                </div>
                <button className="btn-paciente-guardar" onClick={() => setShowModal(true)}>
                    + Nuevo paciente
                </button>
            </header>

            <section className="cd-card">
                <div className="cd-toolbar">
                    <div className="cd-search">
                        <SearchIcon />
                        <input
                            type="search"
                            value={busqueda}
                            onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                            placeholder="Buscar por documento, nombre, correo…"
                            aria-label="Buscar pacientes"
                        />
                    </div>
                </div>

                <div className="cd-scroll">
                    <table className="cd-table">
                        <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Teléfono</th>
                                <th>EPS</th>
                                <th className="cd-col-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cargando && (
                                <tr><td colSpan={5} className="cd-state">Cargando pacientes…</td></tr>
                            )}

                            {!cargando && error && (
                                <tr>
                                    <td colSpan={5} className="cd-state">
                                        <p>{error}</p>
                                        <button className="cd-link" onClick={cargar}>Reintentar</button>
                                    </td>
                                </tr>
                            )}

                            {!cargando && !error && visibles.length === 0 && (
                                <tr>
                                    <td colSpan={5} className="cd-state">
                                        <p>{busqueda ? 'Ningún paciente coincide con tu búsqueda.' : 'Aún no hay pacientes. Crea el primero con «Nuevo paciente».'}</p>
                                    </td>
                                </tr>
                            )}

                            {!cargando && !error && visibles.map((paciente) => (
                                <tr key={paciente.id}>
                                    <td>{paciente.documento}</td>
                                    <td className="cd-strong">{paciente.nombre}</td>
                                    <td>{paciente.email || ' '}</td>
                                    <td>{paciente.telefono || ' '}</td>
                                    <td><span className={epsClase(paciente.eps)}>{paciente.eps || '—'}</span></td>
                                    <td className="cd-col-actions">
                                            <div className="cd-actions">
                                                <Tooltip title="Editar paciente">
                                                    <IconButton size="small" color="success" aria-label="Editar cita" onClick={() => abrirModalEditar(paciente)}> 
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                
                                                <Tooltip title="Eliminar paciente">
                                                    <IconButton size="small" color="error" aria-label="Eliminar paciente" onClick={() => abrirModalEliminar(paciente)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                
                                            </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!cargando && !error && filtrados.length > 0 && (
                    <footer className="cd-footer">
                        <div className="cd-footer-left">
                            <span>
                                Mostrando {inicio + 1}–{Math.min(inicio + porPagina, filtrados.length)} de {filtrados.length}
                            </span>
                            <label>
                                Filas por página
                                <select
                                    value={porPagina}
                                    onChange={(e) => { setPorPagina(Number(e.target.value)); setPagina(1); }}
                                >
                                    {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </label>
                        </div>
                        <nav className="cd-pager" aria-label="Paginación">
                            <button disabled={paginaActual === 1} onClick={() => setPagina(paginaActual - 1)} aria-label="Página anterior">‹</button>
                            {paginasVisibles(paginaActual, totalPaginas).map((p) =>
                                typeof p === 'string' ? (
                                    <span key={p} className="cd-gap">…</span>
                                ) : (
                                    <button key={p} className={p === paginaActual ? 'active' : ''} aria-current={p === paginaActual ? 'page' : undefined} onClick={() => setPagina(p)}>
                                        {p}
                                    </button>
                                )
                            )}
                            <button disabled={paginaActual === totalPaginas} onClick={() => setPagina(paginaActual + 1)} aria-label="Página siguiente">›</button>
                        </nav>
                    </footer>
                )}
            </section>
            {showDeleteModal && (
                    <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content cita-modal-content">
                                <div className="modal-header cita-modal-header danger">
                                    <h5 className="modal-title">Eliminar paciente</h5>
                                    <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                                </div>

                                <div className="modal-body cita-modal-body">
                                    <div className="delete-cita-icon">🚨</div>
                                    <p className="delete-cita-texto">
                                        Esta acción es permanente y no se puede deshacer.
                                        ¿Seguro que deseas eliminar este paciente?
                                    </p>
                                    <div className="delete-cita-resumen">
                                        <div><span>Paciente</span><strong>{pacienteSeleccionado?.nombre}</strong></div>
                                        <div><span>Documento</span><strong>{pacienteSeleccionado?.documento}</strong></div>
                            
                                    </div>
                                </div>

                                <div className="modal-footer cita-modal-footer">
                                    <button className="btn-cita-cancelar" onClick={() => setShowDeleteModal(false)} disabled={eliminando}>
                                        Cancelar
                                    </button>
                                    <button className="btn-cita-eliminar" onClick={confirmarEliminar} disabled={eliminando}>
                                        {eliminando ? 'Eliminando…' : 'Sí, eliminar'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
                
                {showEditModal && pacienteSeleccionado && (
                   <EditPacienteModal
                    paciente={pacienteSeleccionado}
                    onClose={() => setShowEditModal(false)}
                    onGuardado={cargar}
                    />
                )}

            <NuevoPacienteModal
                show={showModal}
                onClose={() => setShowModal(false)}
                onCreated={cargar}
            />
        </div>
    );
};

export default Pacientes;