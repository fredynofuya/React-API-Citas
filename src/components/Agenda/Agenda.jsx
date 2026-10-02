// import React, { useEffect, useState } from 'react';
// import './AgendaStyles.css';
// import { listaCitasConfirmada, listaCitas, editarCita } from '../../services/CitasService';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import IconButton from '@mui/material/IconButton';

// import UndoIcon from '@mui/icons-material/Undo';
// import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircle';

// const Agenda = () => {
//     const [citas, setCitas] = useState([]);
//     const [filtro, setFiltro] = useState('CONFIRMADA'); // 'CONFIRMADA' | 'ATENDIDA' | 'TODAS'
//     const [citaSeleccionada, setCitaSeleccionada] = useState(null);
//     const [accion, setAccion] = useState(null); // 'atendida' | 'revertir' | null
//     const [procesando, setProcesando] = useState(false);

//     const cargar = () => {
//         const peticion = filtro === 'TODAS'
//             ? listaCitas()
//             : listaCitasConfirmada(filtro);

//         peticion
//             .then(response => setCitas(response.data))
//             .catch(error => console.error('Error fetching data:', error));
//     };

//     useEffect(() => {
//         document.title = 'Agenda';
//         cargar();
//     }, [filtro]);

//     const abrirConfirmacion = (cita, tipo) => {
//         setCitaSeleccionada(cita);
//         setAccion(tipo); // 'atendida' o 'revertir'
//     };

//     const confirmarCambioEstado = () => {
//         const nuevoEstado = accion === 'atendida' ? 'ATENDIDA' : 'CONFIRMADA';
//         setProcesando(true);
//         editarCita(citaSeleccionada.id, { estado: nuevoEstado })
//             .then(() => {
//                 cargar();
//                 setAccion(null);
//                 setCitaSeleccionada(null);
//             })
//             .catch(err => console.error('Error actualizando estado de la cita:', err))
//             .finally(() => setProcesando(false));
//     };

//     return (
//         <div className="home">
//             <div className="TitleList table-responsive-custom">
//                 <h1 className='text-left'>Agenda</h1>

//                 <div className="agenda-filtros">
//                     <button className={`filtro-btn ${filtro === 'CONFIRMADA' ? 'activo' : ''}`} onClick={() => setFiltro('CONFIRMADA')}>
//                         Confirmadas
//                     </button>
//                     <button className={`filtro-btn ${filtro === 'ATENDIDA' ? 'activo' : ''}`} onClick={() => setFiltro('ATENDIDA')}>
//                         Atendidas
//                     </button>
//                     <button className={`filtro-btn ${filtro === 'TODAS' ? 'activo' : ''}`} onClick={() => setFiltro('TODAS')}>
//                         Todas
//                     </button>
//                 </div>

//                 {citas.length === 0 && <p>No hay citas en este filtro.</p>}

//                 {citas.length > 0 && (
//                     <table className="table table-striped table-bordered">
//                         <thead className="Thead">
//                             <tr>
//                                 <th>Documento</th>
//                                 <th>Nombre Completo</th>
//                                 <th>Fecha</th>
//                                 <th>Hora</th>
//                                 <th>Médico</th>
//                                 <th>Estado</th>
//                                 <th>Acción</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             {citas.map((cita) => (
//                                 <tr key={cita.id}>
//                                     <td>{cita.documento}</td>
//                                     <td>{cita.nombre}</td>
//                                     <td>{cita.fecha}</td>
//                                     <td>{cita.hora}</td>
//                                     <td>{cita.nombreMedico || `#${cita.id_medico}`}</td>
//                                     <td>{cita.estado}</td>
//                                     <td>
//                                         {cita.estado === 'CONFIRMADA' && (
//                                             <IconButton
//                                                 color="success"
//                                                 size="small"
//                                                 title="Marcar atendida"
//                                                 aria-label="Marcar cita como atendida"
//                                                 onClick={() => abrirConfirmacion(cita, 'atendida')}
//                                             >
//                                                 <CheckCircleOutlineIcon />
//                                             </IconButton>
//                                         )}
//                                         {cita.estado === 'ATENDIDA' && (
//                                             <IconButton
//                                                 color="warning"
//                                                 size="small"
//                                                 title="Revertir a confirmada"
//                                                 aria-label="Revertir cita a confirmada"
//                                                 onClick={() => abrirConfirmacion(cita, 'revertir')}
//                                             >
//                                                 <UndoIcon />
//                                             </IconButton>
//                                         )}
//                                     </td>
//                                 </tr>
//                             ))}
//                         </tbody>
//                     </table>
//                 )}

//                 {accion && citaSeleccionada && (
//                     <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
//                         <div className="modal-dialog modal-dialog-centered">
//                             <div className="modal-content cita-modal-content">
//                                 <div className="modal-header cita-modal-header">
//                                     <h5 className="modal-title">
//                                         {accion === 'atendida' ? 'Marcar cita como atendida' : 'Revertir a confirmada'}
//                                     </h5>
//                                     <button className="btn-close" onClick={() => setAccion(null)}></button>
//                                 </div>
//                                 <div className="modal-body cita-modal-body">
//                                     <p>
//                                         {accion === 'atendida'
//                                             ? <>Confirmas que el paciente <strong>{citaSeleccionada.nombre}</strong> ya fue atendido en la cita del <strong>{citaSeleccionada.fecha} · {citaSeleccionada.hora?.substring(0,5)}</strong>?</>
//                                             : <>¿Devolver la cita de <strong>{citaSeleccionada.nombre}</strong> ({citaSeleccionada.fecha} · {citaSeleccionada.hora?.substring(0,5)}) a estado confirmada?</>
//                                         }
//                                     </p>
//                                 </div>
//                                 <div className="modal-footer cita-modal-footer">
//                                     <button className="btn-cita-cancelar" onClick={() => setAccion(null)} disabled={procesando}>
//                                         Cancelar
//                                     </button>
//                                     <button className="btn-cita-guardar" onClick={confirmarCambioEstado} disabled={procesando}>
//                                         {procesando ? 'Guardando...' : 'Confirmar'}
//                                     </button>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Agenda;

import React, { useEffect, useMemo, useState } from 'react';
// import '../Dashboard/DashboardStyles.css';
import '../Dashboard/EditCitaStyles.css';
import './AgendaStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton, Tooltip } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircle';
import UndoIcon from '@mui/icons-material/Undo';
import { listaCitasConfirmada, listaCitas, editarCita } from '../../services/CitasService';

/* ---------- Helpers (mismos que Dashboard.jsx; si aparece una tercera
   tabla con este patrón, vale la pena moverlos a src/utils/) ---------- */
const normalizar = (v) =>
    String(v ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();

const nombreMedico = (c) =>
    c.nombreMedico || (c.id_medico ? `Médico #${c.id_medico}` : ' ');

const formatFecha = (f) => {
    if (!f) return ' ';
    const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(f);
    return m ? `${m[3]}/${m[2]}/${m[1]}` : f;
};
const formatHora = (h) => (h ? String(h).substring(0, 5) : ' ');

const claseEstado = (estado) => {
    const e = normalizar(estado);
    if (e.includes('cancel') || e.includes('rechaz')) return 'is-cancelled';
    if (e.includes('complet') || e.includes('atendid') || e.includes('realiz')) return 'is-done';
    if (e.includes('confirm') || e.includes('agend')) return 'is-confirmed';
    if (e.includes('pend')) return 'is-pending';
    return 'is-neutral';
};

const paginasVisibles = (actual, total) => {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    const nums = [...new Set([1, total, actual - 1, actual, actual + 1])]
        .filter((n) => n >= 1 && n <= total)
        .sort((a, b) => a - b);
    const out = [];
    nums.forEach((n, i) => {
        if (i > 0 && n - nums[i - 1] > 1) out.push(`gap-${n}`);
        out.push(n);
    });
    return out;
};

const FILTROS = [
    { key: 'CONFIRMADA', label: 'Confirmadas' },
    { key: 'ATENDIDA', label: 'Atendidas' },
    { key: 'TODAS', label: 'Todas' },
];
const PAGE_SIZES = [5, 10, 25, 50];

const Agenda = () => {
    const [citas, setCitas] = useState([]);
    const [filtro, setFiltro] = useState('CONFIRMADA');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);

    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [accion, setAccion] = useState(null); // 'atendida' | 'revertir' | null
    const [procesando, setProcesando] = useState(false);

    const cargar = () => {
        setCargando(true);
        setError(null);
        const peticion = filtro === 'TODAS' ? listaCitas() : listaCitasConfirmada(filtro);
        peticion
            .then((response) => setCitas(response.data))
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError('No se pudo cargar la agenda. Revisa tu conexión e inténtalo de nuevo.');
            })
            .finally(() => setCargando(false));
    };

    useEffect(() => {
        document.title = 'Agenda';
        cargar();
        setPagina(1);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filtro]);

    const filtradas = useMemo(() => {
        const q = normalizar(busqueda.trim());
        if (!q) return citas;
        return citas.filter((c) => {
            const texto = [c.documento, c.nombre, nombreMedico(c), c.nombreConsultorio, c.estado].join(' ');
            return normalizar(texto).includes(q);
        });
    }, [citas, busqueda]);

    const totalPaginas = Math.max(1, Math.ceil(filtradas.length / porPagina));
    const paginaActual = Math.min(pagina, totalPaginas);
    const inicio = (paginaActual - 1) * porPagina;
    const visibles = filtradas.slice(inicio, inicio + porPagina);

    const abrirConfirmacion = (cita, tipo) => {
        setCitaSeleccionada(cita);
        setAccion(tipo);
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
            .catch((err) => console.error('Error actualizando estado de la cita:', err))
            .finally(() => setProcesando(false));
    };

    return (
        <div className="cd">
            <header className="cd-header">
                <div>
                    <h1 className="cd-title">Agenda</h1>
                    <p className="cd-subtitle">
                        {cargando ? 'Cargando…' : `${filtradas.length} ${filtradas.length === 1 ? 'cita' : 'citas'} en este filtro`}
                    </p>
                </div>
            </header>

            <section className="cd-card">
                <div className="cd-toolbar">
                    <div className="cd-search">
                        <SearchIcon />
                        <input
                            type="search"
                            value={busqueda}
                            onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                            placeholder="Buscar por paciente, documento, médico…"
                            aria-label="Buscar en la agenda"
                        />
                    </div>
                    <div className="cd-chips" role="group" aria-label="Filtrar por estado">
                        {FILTROS.map((f) => (
                            <button
                                key={f.key}
                                className={`cd-chip ${filtro === f.key ? 'active' : ''}`}
                                onClick={() => setFiltro(f.key)}
                            >
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="cd-scroll">
                    <table className="cd-table">
                        <thead>
                            <tr>
                                <th>Documento</th>
                                <th>Paciente</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Consultorio</th>
                                <th>Médico</th>
                                <th>Estado</th>
                                <th className="cd-col-actions">Acción</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cargando && (
                                <tr><td colSpan={8} className="cd-state">Cargando agenda…</td></tr>
                            )}

                            {!cargando && error && (
                                <tr>
                                    <td colSpan={8} className="cd-state">
                                        <p>{error}</p>
                                        <button className="cd-link" onClick={cargar}>Reintentar</button>
                                    </td>
                                </tr>
                            )}

                            {!cargando && !error && visibles.length === 0 && (
                                <tr><td colSpan={8} className="cd-state"><p>No hay citas en este filtro.</p></td></tr>
                            )}

                            {!cargando && !error && visibles.map((cita) => (
                                <tr key={cita.id}>
                                    <td>{cita.documento}</td>
                                    <td className="cd-strong">{cita.nombre}</td>
                                    <td className="cd-nowrap">{formatFecha(cita.fecha)}</td>
                                    <td className="cd-nowrap">{formatHora(cita.hora)}</td>
                                    <td>
                                        {cita.nombreConsultorio || ''}
                                        {cita.ubicacionConsultorio && (
                                            <div className="cd-sub">{cita.ubicacionConsultorio}</div>
                                        )}
                                    </td>
                                    <td>{nombreMedico(cita)}</td>
                                    <td>
                                        <span className={`cd-badge ${claseEstado(cita.estado)}`}>
                                            {cita.estado}
                                        </span>
                                    </td>
                                    <td className="cd-col-actions">
                                        <div className="cd-actions">
                                            {cita.estado === 'CONFIRMADA' && (
                                                <Tooltip title="Marcar atendida">
                                                    <IconButton size="small" color="success" aria-label="Marcar cita como atendida" onClick={() => abrirConfirmacion(cita, 'atendida')}>
                                                        <CheckCircleOutlineIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                            {cita.estado === 'ATENDIDA' && (
                                                <Tooltip title="Revertir a confirmada">
                                                    <IconButton size="small" color="warning" aria-label="Revertir cita a confirmada" onClick={() => abrirConfirmacion(cita, 'revertir')}>
                                                        <UndoIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {!cargando && !error && filtradas.length > 0 && (
                    <footer className="cd-footer">
                        <div className="cd-footer-left">
                            <span>
                                Mostrando {inicio + 1}–{Math.min(inicio + porPagina, filtradas.length)} de {filtradas.length}
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
                                    <button
                                        key={p}
                                        className={p === paginaActual ? 'active' : ''}
                                        aria-current={p === paginaActual ? 'page' : undefined}
                                        onClick={() => setPagina(p)}
                                    >
                                        {p}
                                    </button>
                                )
                            )}
                            <button disabled={paginaActual === totalPaginas} onClick={() => setPagina(paginaActual + 1)} aria-label="Página siguiente">›</button>
                        </nav>
                    </footer>
                )}
            </section>

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
                                        ? <>Confirmas que el paciente <strong>{citaSeleccionada.nombre}</strong> ya fue atendido en la cita del <strong>{formatFecha(citaSeleccionada.fecha)} · {formatHora(citaSeleccionada.hora)}</strong>?</>
                                        : <>¿Devolver la cita de <strong>{citaSeleccionada.nombre}</strong> ({formatFecha(citaSeleccionada.fecha)} · {formatHora(citaSeleccionada.hora)}) a estado confirmada?</>
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
    );
};

export default Agenda;
