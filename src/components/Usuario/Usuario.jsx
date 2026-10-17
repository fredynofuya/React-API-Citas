import React, { useEffect, useMemo, useState } from 'react';
import '../../styles/AdminTableStyles.css';
import { IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import ToggleOnIcon from '@mui/icons-material/ToggleOn';
import ToggleOffIcon from '@mui/icons-material/ToggleOff';
import SearchIcon from '@mui/icons-material/Search';
import { listaUsuarios } from '../../services/UsuariosService';
import { normalizar, paginasVisibles } from '../../utils/tablaHelpers';
import { ETIQUETAS_ROL } from '../../utils/permisos';
import { useAuth } from '../../context/AuthContext';
import UsuarioFormModal from './UsuarioFormModal';
import CambiarEstadoUsuarioModal from './CambiarEstadoUsuarioModal';

const PAGE_SIZES = [5, 10, 25, 50];

const Usuarios = () => {
    const { usuario: yo } = useAuth();
    const [usuarios, setUsuarios] = useState([]);
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState(null);
    const [busqueda, setBusqueda] = useState('');
    const [pagina, setPagina] = useState(1);
    const [porPagina, setPorPagina] = useState(10);

    const [formAbierto, setFormAbierto] = useState(false);
    const [usuarioEditar, setUsuarioEditar] = useState(null); // null = crear
    const [usuarioEstado, setUsuarioEstado] = useState(null);

    const cargar = () => {
        setCargando(true);
        setError(null);
        listaUsuarios()
            .then((res) => setUsuarios(res.data))
            .catch((err) => {
                console.error('Error cargando usuarios:', err);
                setError('No se pudieron cargar los usuarios. Revisa tu conexión e inténtalo de nuevo.');
            })
            .finally(() => setCargando(false));
    };

    useEffect(() => {
        document.title = 'Usuarios';
        cargar();
    }, []);

    const filtrados = useMemo(() => {
        const q = normalizar(busqueda.trim());
        if (!q) return usuarios;
        return usuarios.filter((u) =>
            normalizar([u.nombre, u.email, ETIQUETAS_ROL[u.rol]].join(' ')).includes(q)
        );
    }, [usuarios, busqueda]);

    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / porPagina));
    const paginaActual = Math.min(pagina, totalPaginas);
    const inicio = (paginaActual - 1) * porPagina;
    const visibles = filtrados.slice(inicio, inicio + porPagina);

    const abrirCrear = () => { setUsuarioEditar(null); setFormAbierto(true); };
    const abrirEditar = (u) => { setUsuarioEditar(u); setFormAbierto(true); };

    return (
        <div className="cd">
            <header className="cd-header">
                <div>
                    <h1 className="cd-title">Usuarios</h1>
                    <p className="cd-subtitle">
                        {cargando ? 'Cargando…' : `${usuarios.length} ${usuarios.length === 1 ? 'usuario registrado' : 'usuarios registrados'}`}
                    </p>
                </div>
                <button className="btn-paciente-guardar" onClick={abrirCrear}>+ Nuevo usuario</button>
            </header>

            <section className="cd-card">
                <div className="cd-toolbar">
                    <div className="cd-search">
                        <SearchIcon />
                        <input
                            type="search"
                            value={busqueda}
                            onChange={(e) => { setBusqueda(e.target.value); setPagina(1); }}
                            placeholder="Buscar por nombre o correo…"
                            aria-label="Buscar usuarios"
                        />
                    </div>
                </div>

                <div className="cd-scroll">
                    <table className="cd-table">
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Correo</th>
                                <th>Rol</th>
                                <th>Estado</th>
                                <th className="cd-col-actions">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cargando && <tr><td colSpan={5} className="cd-state">Cargando usuarios…</td></tr>}

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
                                        <p>{busqueda ? 'Ningún usuario coincide con tu búsqueda.' : 'Aún no hay usuarios.'}</p>
                                    </td>
                                </tr>
                            )}

                            {!cargando && !error && visibles.map((u) => (
                                <tr key={u.id}>
                                    <td className="cd-strong">
                                        {u.nombre}
                                        {u.id === yo?.id && <span className="cd-sub"> (tú)</span>}
                                    </td>
                                    <td>{u.email}</td>
                                    <td>
                                        <span className={`cd-badge ${u.rol === 'SUPER_ADMIN' ? 'is-done' : 'is-confirmed'}`}>
                                            {ETIQUETAS_ROL[u.rol] || u.rol}
                                        </span>
                                    </td>
                                    <td>
                                        <span className={`cd-badge ${u.activo ? 'is-confirmed' : 'is-neutral'}`}>
                                            {u.activo ? 'Activo' : 'Inactivo'}
                                        </span>
                                    </td>
                                    <td className="cd-col-actions">
                                        <div className="cd-actions">
                                            <Tooltip title="Editar usuario">
                                                <IconButton size="small" color="success" aria-label="Editar usuario" onClick={() => abrirEditar(u)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                            </Tooltip>
                                            {u.id !== yo?.id && (
                                                <Tooltip title={u.activo ? 'Desactivar usuario' : 'Activar usuario'}>
                                                    <IconButton
                                                        size="small"
                                                        color={u.activo ? 'primary' : 'default'}
                                                        aria-label={u.activo ? 'Desactivar usuario' : 'Activar usuario'}
                                                        onClick={() => setUsuarioEstado(u)}
                                                    >
                                                        {u.activo
                                                            ? <ToggleOnIcon fontSize="large" />
                                                            : <ToggleOffIcon fontSize="large" />}
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

                {!cargando && !error && filtrados.length > 0 && (
                    <footer className="cd-footer">
                        <div className="cd-footer-left">
                            <span>Mostrando {inicio + 1}–{Math.min(inicio + porPagina, filtrados.length)} de {filtrados.length}</span>
                            <label>
                                Filas por página
                                <select value={porPagina} onChange={(e) => { setPorPagina(Number(e.target.value)); setPagina(1); }}>
                                    {PAGE_SIZES.map((n) => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </label>
                        </div>
                        <nav className="cd-pager" aria-label="Paginación">
                            <button disabled={paginaActual === 1} onClick={() => setPagina(paginaActual - 1)} aria-label="Página anterior">‹</button>
                            {paginasVisibles(paginaActual, totalPaginas).map((p) =>
                                typeof p === 'string'
                                    ? <span key={p} className="cd-gap">…</span>
                                    : <button key={p} className={p === paginaActual ? 'active' : ''} aria-current={p === paginaActual ? 'page' : undefined} onClick={() => setPagina(p)}>{p}</button>
                            )}
                            <button disabled={paginaActual === totalPaginas} onClick={() => setPagina(paginaActual + 1)} aria-label="Página siguiente">›</button>
                        </nav>
                    </footer>
                )}
            </section>

            {formAbierto && (
                <UsuarioFormModal
                    usuario={usuarioEditar}
                    onClose={() => setFormAbierto(false)}
                    onGuardado={cargar}
                />
            )}

            {usuarioEstado && (
                <CambiarEstadoUsuarioModal
                    usuario={usuarioEstado}
                    onClose={() => setUsuarioEstado(null)}
                    onCambiado={cargar}
                />
            )}
        </div>
    );
};

export default Usuarios;