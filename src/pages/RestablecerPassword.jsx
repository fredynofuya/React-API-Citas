import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import '../styles/RestablecerPasswordStyles.css';
import logo from '../assets/logo-login.png';
import { validarTokenRecuperacion, restablecerPassword } from '../services/AuthService';
import { mensajeError } from '../utils/mensajeError';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const RestablecerPassword = () => {
  const [params]   = useSearchParams();
  const token      = params.get('token');
  const navigate   = useNavigate();

  const [estado, setEstado]     = useState('validando'); // validando | invalido | formulario | exito
  const [form, setForm]         = useState({ nueva: '', confirmar: '' });
  const [error, setError]       = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [showNueva, setShowNueva]         = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);

  useEffect(() => {
    document.title = 'Restablecer contraseña | MedSoftIA';
    if (!token) { setEstado('invalido'); return; }
    validarTokenRecuperacion(token)
      .then(() => setEstado('formulario'))
      .catch(() => setEstado('invalido'));
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.nueva.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return; }
    if (form.nueva !== form.confirmar) { setError('Las contraseñas no coinciden.'); return; }

    setEnviando(true);
    setError(null);
    try {
      await restablecerPassword(token, form.nueva);
      setEstado('exito');
    } catch (err) {
      console.error('Error restableciendo la contraseña:', err);
      setError(mensajeError(err, 'No se pudo cambiar la contraseña. Intenta de nuevo.'));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="rp-wrapper">
      <div className="rp-card">

        {/* ── Cabecera ─────────────────────────────── */}
        <div className="rp-header">
          <div className="rp-logo-wrap">
            <img src={logo} alt="MedSoftIA" />
          </div>
          <div className="rp-brand">
            <span className="rp-brand-primary">Med</span>
            <span className="rp-brand-accent">Soft</span>
            <span className="rp-brand-primary">IA</span>
          </div>
        </div>

        {/* ── Estado: validando ────────────────────── */}
        {estado === 'validando' && (
          <div className="rp-loading">
            <div className="rp-spinner" role="status" aria-label="Validando enlace" />
            <p>Validando enlace…</p>
          </div>
        )}

        {/* ── Estado: inválido ─────────────────────── */}
        {estado === 'invalido' && (
          <>
            <span className="rp-estado-icon" aria-hidden="true">⚠️</span>
            <h1 className="rp-estado-title">Enlace inválido o expirado</h1>
            <p className="rp-estado-desc">
              El enlace de recuperación no es válido o ya venció.<br />
              Solicita uno nuevo desde la pantalla de inicio de sesión.
            </p>
            <button className="rp-btn" onClick={() => navigate('/signin')}>
              Ir a iniciar sesión <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </>
        )}

        {/* ── Estado: formulario ───────────────────── */}
        {estado === 'formulario' && (
          <>
            <h1 className="rp-form-title">Crea tu nueva contraseña</h1>
            <p className="rp-form-subtitle">
              Elige una contraseña segura de al menos 8 caracteres.
            </p>

            {error && (
              <div className="rp-alert rp-alert--error" role="alert">
                ⚠️ {error}
              </div>
            )}

            <form className="rp-form" onSubmit={handleSubmit} noValidate>
              <div className="rp-field">
                <div className="rp-field-header">
                  <label htmlFor="nueva">
                    <FontAwesomeIcon icon={faLock} /> Nueva contraseña
                  </label>
                  <button
                    type="button" className="rp-toggle-pass"
                    onClick={() => setShowNueva(v => !v)}
                  >
                    {showNueva ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <input
                  id="nueva" name="nueva"
                  type={showNueva ? 'text' : 'password'}
                  placeholder="Mínimo 8 caracteres"
                  value={form.nueva} onChange={handleChange}
                  autoComplete="new-password" required
                />
                <p className="rp-hint">Mínimo 8 caracteres</p>
              </div>

              <div className="rp-field">
                <div className="rp-field-header">
                  <label htmlFor="confirmar">
                    <FontAwesomeIcon icon={faLock} /> Confirmar contraseña
                  </label>
                  <button
                    type="button" className="rp-toggle-pass"
                    onClick={() => setShowConfirmar(v => !v)}
                  >
                    {showConfirmar ? 'Ocultar' : 'Mostrar'}
                  </button>
                </div>
                <input
                  id="confirmar" name="confirmar"
                  type={showConfirmar ? 'text' : 'password'}
                  placeholder="Repite la contraseña"
                  value={form.confirmar} onChange={handleChange}
                  autoComplete="new-password" required
                />
              </div>

              <button className="rp-btn" type="submit" disabled={enviando}>
                {enviando ? '⏳ Guardando…' : <>Guardar contraseña <FontAwesomeIcon icon={faArrowRight} /></>}
              </button>
            </form>
          </>
        )}

        {/* ── Estado: éxito ────────────────────────── */}
        {estado === 'exito' && (
          <>
            <div className="rp-exito-circle" aria-hidden="true">✓</div>
            <h1 className="rp-estado-title">¡Contraseña actualizada!</h1>
            <p className="rp-estado-desc">
              Tu contraseña fue cambiada correctamente.<br />
              Ya puedes iniciar sesión con tu nueva contraseña.
            </p>
            <button className="rp-btn" onClick={() => navigate('/signin')}>
              Iniciar sesión <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </>
        )}

        {/* ── Footer de la card ────────────────────── */}
        {estado !== 'validando' && (
          <div className="rp-card-footer">
            <Link to="/signin" className="rp-back-link">← Volver a iniciar sesión</Link>
          </div>
        )}

      </div>
    </div>
  );
};

export default RestablecerPassword;
