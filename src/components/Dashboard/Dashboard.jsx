import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './DashboardStyles.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import CancelIcon from '@mui/icons-material/Cancel';
import { listaCitas, deleteCita } from '../../services/CitasService';
import EditCitaModal from './EditCitaModal';
import NuevaCitaModal from './NuevaCitaModal';
import CancelarCitaModal from './CancelarCitaModal';

/* ---------- Configuración ---------- */
const COLUMNS = [
    { key: 'id', label: 'Id' },
    { key: 'documento', label: 'Documento' },
    { key: 'nombre', label: 'Paciente' },
    { key: 'mensaje', label: 'Mensaje' },
    { key: 'fecha', label: 'Fecha' },
    { key: 'hora', label: 'Hora' },
    { key: 'consultorio', label: 'Ubicación' },
    { key: 'medico', label: 'Médico' },
    { key: 'observaciones', label: 'Observaciones' },
    { key: 'estado', label: 'Estado' },
];
const PAGE_SIZES = [5, 10, 25, 50];
const SIN_ESTADO = 'Sin estado';

/* ---------- Helpers ---------- */
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

const valorOrden = (c, key) => {
    switch (key) {
        case 'id': return Number(c.id) || 0;
        case 'fecha': return `${c.fecha ?? ''} ${c.hora ?? ''}`;
        case 'consultorio': return normalizar(c.nombreConsultorio);
        case 'medico': return normalizar(nombreMedico(c));
        default: return normalizar(c[key]);
    }
};
const comparar = (a, b) =>
    typeof a === 'number' ? a - b : a.localeCompare(b, 'es', { numeric: true });

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

/* ---------- Componente ---------- */
const Dashboard = () => {
    const [citas, setCitas] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);

    const [busqueda, setBusqueda] = useState('');
    const [filtroEstado, setFiltroEstado] = useState('todos');
    const [orden, setOrden] = useState({ key: null, dir: 'asc' });
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showNuevaCita, setShowNuevaCita] = useState(false);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);
    const [eliminando, setEliminando] = useState(false);
    const [showCancelModal, setShowCancelModal] = useState(false);
    const [citaCancelar, setCitaCancelar] = useState(null);

    const cargarCitas = useCallback((silencioso = false) => {
        if (!silencioso) setCargando(true);
        setError(null);
        return listaCitas()
            .then((response) => setCitas(response.data))
            .catch((err) => {
                console.error('Error fetching data:', err);
                setError('No se pudieron cargar las citas. Revisa tu conexión e inténtalo de nuevo.');
            })
            .finally(() => setCargando(false));
    }, []);

    useEffect(() => {
        document.title = 'Dashboard';
        cargarCitas();
    }, [cargarCitas]);

    /* --- Datos derivados --- */
    const conteoEstados = useMemo(
        () =>
            citas.reduce((acc, c) => {
                const e = c.estado || SIN_ESTADO;
                acc[e] = (acc[e] || 0) + 1;
                return acc;
            }, {}),
        [citas]
    );

    const filtradas = useMemo(() => {
        const q = normalizar(busqueda.trim());
        let lista = citas.filter((c) => {
            if (filtroEstado !== 'todos' && (c.estado || SIN_ESTADO) !== filtroEstado) return false;
            if (!q) return true;
            const texto = [
                c.id, c.documento, c.nombre, c.mensaje, c.fecha, c.hora,
                c.nombreConsultorio, c.ubicacionConsultorio, nombreMedico(c),
                c.observaciones, c.estado,
            ].join(' ');
            return normalizar(texto).includes(q);
        });
        if (orden.key) {
            const f = orden.dir === 'asc' ? 1 : -1;
            lista = [...lista].sort(
                (a, b) => f * comparar(valorOrden(a, orden.key), valorOrden(b, orden.key))
            );
        }
        return lista;
    }, [citas, busqueda, filtroEstado, orden]);

    const totalPaginas = Math.max(1, Math.ceil(filtradas.length / porPagina));
    const paginaActual = Math.min(pagina, totalPaginas);
    const inicio = (paginaActual - 1) * porPagina;
    const visibles = filtradas.slice(inicio, inicio + porPagina);
    const hayFiltros = busqueda.trim() !== '' || filtroEstado !== 'todos';

    /* --- Acciones --- */
    const cambiarOrden = (key) =>
        setOrden((prev) => {
            if (prev.key !== key) return { key, dir: 'asc' };
            if (prev.dir === 'asc') return { key, dir: 'desc' };
            return { key: null, dir: 'asc' };
        });

    const limpiarFiltros = () => {
        setBusqueda('');
        setFiltroEstado('todos');
        setPagina(1);
    };

    const abrirModalEliminar = (cita) => {
        setCitaSeleccionada(cita);
        setShowDeleteModal(true);
    };
    const abrirModalEditar = (cita) => {
        setCitaSeleccionada(cita);
        setShowEditModal(true);
    };
    const abrirModalCancelar = (cita) => {
        setCitaCancelar(cita);
        setShowCancelModal(true);
    };

    const confirmarEliminar = () => {
        setEliminando(true);
        deleteCita(citaSeleccionada.id)
            .then(() => {
                setCitas((prev) => prev.filter((c) => c.id !== citaSeleccionada.id));
                setShowDeleteModal(false);
            })
            .catch((err) => console.error('Error deleting data:', err))
            .finally(() => setEliminando(false));
    };

    const ariaSort = (key) =>
        orden.key !== key ? 'none' : orden.dir === 'asc' ? 'ascending' : 'descending';

    /* --- Render --- */
    return (
        <div className="home">
            <div className="cd">
                <header className="cd-header">
                    <div>
                        <h1 className="cd-title">Citas</h1>
                        <p className="cd-subtitle">
                            {cargando ? 'Cargando…' : `${citas.length} ${citas.length === 1 ? 'cita registrada' : 'citas registradas'}`}
                        </p>
                    </div>
                    <button className="btn-paciente-guardar" onClick={() => setShowNuevaCita(true)}>
                        + Nueva cita
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
                                placeholder="Buscar por paciente, documento, médico…"
                                aria-label="Buscar citas"
                            />
                        </div>
                        <div className="cd-chips" role="group" aria-label="Filtrar por estado">
                            <button
                                className={`cd-chip ${filtroEstado === 'todos' ? 'active' : ''}`}
                                onClick={() => { setFiltroEstado('todos'); setPagina(1); }}
                            >
                                Todas <span>{citas.length}</span>
                            </button>
                            {Object.entries(conteoEstados).map(([estado, n]) => (
                                <button
                                    key={estado}
                                    className={`cd-chip ${filtroEstado === estado ? 'active' : ''}`}
                                    onClick={() => { setFiltroEstado(estado); setPagina(1); }}
                                >
                                    {estado} <span>{n}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="cd-scroll">
                        <table className="cd-table">
                            <thead>
                                <tr>
                                    {COLUMNS.map((col) => (
                                        <th key={col.key} aria-sort={ariaSort(col.key)}>
                                            <button className="cd-sort" onClick={() => cambiarOrden(col.key)}>
                                                {col.label}
                                                <span className={`cd-arrow ${orden.key === col.key ? orden.dir : ''}`} aria-hidden="true" />
                                            </button>
                                        </th>
                                    ))}
                                    <th className="cd-col-actions">Acciones</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cargando && (
                                    <tr><td colSpan={COLUMNS.length + 1} className="cd-state">Cargando citas…</td></tr>
                                )}

                                {!cargando && error && (
                                    <tr>
                                        <td colSpan={COLUMNS.length + 1} className="cd-state">
                                            <p>{error}</p>
                                            <button className="cd-link" onClick={() => cargarCitas()}>Reintentar</button>
                                        </td>
                                    </tr>
                                )}

                                {!cargando && !error && visibles.length === 0 && (
                                    <tr>
                                        <td colSpan={COLUMNS.length + 1} className="cd-state">
                                            {hayFiltros ? (
                                                <>
                                                    <p>Ninguna cita coincide con tu búsqueda.</p>
                                                    <button className="cd-link" onClick={limpiarFiltros}>Limpiar filtros</button>
                                                </>
                                            ) : (
                                                <p>Aún no hay citas. Crea la primera con «Nueva cita».</p>
                                            )}
                                        </td>
                                    </tr>
                                )}

                                {!cargando && !error && visibles.map((cita) => (
                                    <tr key={cita.id}>
                                        <td className="cd-num">{cita.id}</td>
                                        <td>{cita.documento}</td>
                                        <td className="cd-strong">{cita.nombre}</td>
                                        <td><div className="cd-msg" title={cita.mensaje}>{cita.mensaje || ' '}</div></td>
                                        <td className="cd-nowrap">{formatFecha(cita.fecha)}</td>
                                        <td className="cd-nowrap">{formatHora(cita.hora)}</td>
                                        <td>
                                            {cita.nombreConsultorio || ''}
                                            {cita.ubicacionConsultorio && (
                                                <div className="cd-sub">{cita.ubicacionConsultorio}</div>
                                            )}
                                        </td>
                                        <td>{nombreMedico(cita)}</td>
                                        <td><div className="cd-msg" title={cita.observaciones}>{cita.observaciones || ' '}</div></td>
                                        <td>
                                            <span className={`cd-badge ${claseEstado(cita.estado)}`}>
                                                {cita.estado || SIN_ESTADO}
                                            </span>
                                        </td>
                                        <td className="cd-col-actions">
                                            <div className="cd-actions">
                                                <Tooltip title="Editar cita">
                                                    <IconButton size="small" color="success" aria-label="Editar cita" onClick={() => abrirModalEditar(cita)}>
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                
                                                <Tooltip title="Eliminar cita">
                                                    <IconButton size="small" color="error" aria-label="Eliminar cita" onClick={() => abrirModalEliminar(cita)}>
                                                        <DeleteIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                {(cita.estado === 'SOLICITADA' || cita.estado === 'CONFIRMADA') && (
                                                    <Tooltip title="Cancelar cita">
                                                        <IconButton size="small" color="warning" aria-label="Cancelar cita" onClick={() => abrirModalCancelar(cita)}>
                                                            <CancelIcon fontSize="small" />
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

                {showDeleteModal && (
                    <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                            <div className="modal-content cita-modal-content">
                                <div className="modal-header cita-modal-header danger">
                                    <h5 className="modal-title">Eliminar cita</h5>
                                    <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                                </div>

                                <div className="modal-body cita-modal-body">
                                    <div className="delete-cita-icon">⚠️</div>
                                    <p className="delete-cita-texto">
                                        Esta acción es permanente y no se puede deshacer.
                                        ¿Seguro que deseas eliminar esta cita?
                                    </p>
                                    <div className="delete-cita-resumen">
                                        <div><span>Paciente</span><strong>{citaSeleccionada?.nombre}</strong></div>
                                        <div><span>Documento</span><strong>{citaSeleccionada?.documento}</strong></div>
                                        <div>
                                            <span>Fecha y hora</span>
                                            <strong>
                                                {citaSeleccionada?.fecha
                                                    ? `${formatFecha(citaSeleccionada.fecha)} · ${formatHora(citaSeleccionada.hora)}`
                                                    : 'Sin asignar'}
                                            </strong>
                                        </div>
                                        <div>
                                            <span>Médico</span>
                                            <strong>{citaSeleccionada ? nombreMedico(citaSeleccionada) : ''}</strong>
                                        </div>
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

                {showEditModal && citaSeleccionada && (
                    <EditCitaModal
                        cita={citaSeleccionada}
                        onClose={() => setShowEditModal(false)}
                        onGuardado={() => cargarCitas(true)}
                    />
                )}

                {showNuevaCita && (
                    <NuevaCitaModal
                        show={showNuevaCita}
                        onClose={() => setShowNuevaCita(false)}
                        onCreated={() => cargarCitas(true)}
                    />
                )}

                {showCancelModal && citaCancelar && (
                    <CancelarCitaModal
                        cita={citaCancelar}
                        onClose={() => setShowCancelModal(false)}
                        onCancelada={() => cargarCitas(true)}
                    />
                )}
            </div>
        </div>
    );
};

export default Dashboard; 
