import React, { useEffect, useMemo, useState } from 'react';
import './MedicoStyles.css';
import { IconButton, Tooltip } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import SearchIcon from '@mui/icons-material/Search';
import { listaMedicos } from '../../services/CitasService';
import { normalizar, paginasVisibles } from '../../utils/tablaHelpers';

const PAGE_SIZES = [5, 10, 25, 50];

const Medicos = () => {
    const [medicos, setMedicos] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);

    const cargar = () => {
        setCargando(true);
        setError(null);
        listaMedicos()
            .then(res => setMedicos(res.data))
            .catch(err => {
                console.error('Error cargando médicos:', err);
                setError('No se pudieron cargar los médicos. Revisa tu conexión e inténtalo de nuevo.');
            })
            .finally(() => setCargando(false));
    };

    useEffect(() => {
        document.title = 'Médicos';
        cargar();
    }, []);

    const filtrados = useMemo(() => {
        const q = normalizar(busqueda.trim());
        if (!q) return medicos;
        return medicos.filter((m) => {
            const texto = [m.nombreMedico, m.nombreConsultorio, m.ubicacionConsultorio, m.registro_profesional].join(' ');
            return normalizar(texto).includes(q);
        });
    }, [medicos, busqueda]);

    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
    const paginaActual = Math.min(pagina, totalPaginas);
    const inicio = (paginaActual - 1) * porPagina;
    const visibles = filtrados.slice(inicio, inicio + porPagina);

    return (
        <div className="cd">
            <header className="cd-header">
                <div>
                    <h1 className="cd-title">Médicos</h1>
                    <p className="cd-subtitle">
                        {cargando ? 'Cargando…' : `${medicos.length} ${medicos.length === 1 ? 'médico registrado' : 'médicos registrados'}`}
                    </p>
                </div>
                {/* Deshabilitado a propósito: falta backend para especialidades/usuarios (ver Riesgos) */}
                <button className="btn-paciente-guardar" disabled title="Pendiente: endpoints de especialidad y usuario">
                    + Nuevo médico
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
                            placeholder="Buscar por nombre, consultorio, registro…"
                            aria-label="Buscar médicos"
                        />
                    </div>
                </div>

                <div className="cd-scroll">
                    <table className="cd-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Consultorio</th>
                                <th>Registro profesional</th>
                                <th className="cd-col-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cargando && (
                                <tr><td colSpan={3} className="cd-state">Cargando médicos…</td></tr>
                            )}

                            {!cargando && error && (
                                <tr>
                                    <td colSpan={3} className="cd-state">
                                        <p>{error}</p>
                                        <button className="cd-link" onClick={cargar}>Reintentar</button>
                                    </td>
                                </tr>
                            )}

                            {!cargando && !error && visibles.length === 0 && (
                                <tr>
                                    <td colSpan={3} className="cd-state">
                                        <p>{busqueda ? 'Ningún médico coincide con tu búsqueda.' : 'Aún no hay médicos registrados.'}</p>
                                    </td>
                                </tr>
                            )}

                            {!cargando && !error && visibles.map((m) => (
                                <tr key={m.id}>
                                    <td className="cd-strong">{m.nombreMedico || `Médico #${m.id}`}</td>
                                    <td>
                                        {m.nombreConsultorio || '—'}
                                        {m.ubicacionConsultorio && (
                                            <div className="cd-sub">{m.ubicacionConsultorio}</div>
                                        )}
                                    </td>
                                    <td>{m.registro_profesional || '—'}</td>
                                    <td className="cd-col-actions">
                                            <div className="cd-actions">
                                                <Tooltip title="Editar cita">
                                                    <IconButton size="small" color="success" aria-label="Editar cita" onClick={() =>'' }>
                                                        <EditIcon fontSize="small" />
                                                    </IconButton>
                                                </Tooltip>
                                                
                                                <Tooltip title="Eliminar cita">
                                                    <IconButton size="small" color="error" aria-label="Eliminar cita" onClick={() => ''}>
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
        </div>
    );
};

export default Medicos;