import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import '../styles/SignInStyles.css';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { rutaInicial } from '../utils/permisos';
import RecuperarPasswordModal from '../components/Auth/RecuperarPasswordModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock, faArrowRight } from '@fortawesome/free-solid-svg-icons';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => { document.title = 'Iniciar sesión | MedSoftIA'; }, []);

  const [form, setForm]                     = useState({ email: '', password: '' });
  const [error, setError]                   = useState(null);
  const [enviando, setEnviando]             = useState(false);
  const [mostrarRecuperar, setMostrarRecuperar] = useState(false);
  const [showPassword, setShowPassword]     = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      const datos = await login(form.email, form.password);
      navigate(rutaInicial(datos.rol));
    } catch (err) {
      console.error('Error iniciando sesión:', err);
      setError(
        err.response?.status === 401
          ? 'Correo o contraseña incorrectos.'
          : 'No se pudo iniciar sesión. Intenta de nuevo.'
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="si-wrapper">

      {/* ── Panel izquierdo: branding ───────────────── */}
      <div className="si-brand-panel" aria-hidden="true">
        <div className="si-brand-overlay" />
        <div className="si-brand-content">
          {/* logo + nombre */}
          <div className="si-brand-header">
            <div className="si-brand-logo">
              <img src={logo} alt="MedSoftIA" />
            </div>
            <div className="si-brand-name">
              <span className="si-brand-white">Med</span>
              <span className="si-brand-accent">Soft</span>
              <span className="si-brand-white">IA</span>
            </div>
          </div>
          <p className="si-brand-tagline">
            Plataforma integral de gestión médica.<br />
            Conectando pacientes y profesionales.
          </p>

          <ul className="si-brand-features">
            <li>✓ Agenda citas en minutos</li>
            <li>✓ Accede a tu historial médico</li>
            <li>✓ Más de 50 especialistas disponibles</li>
            <li>✓ Datos seguros y cifrados</li>
          </ul>
        </div>
        <div className="si-brand-back">
          <Link to="/home" className="si-back-link">
            ← Volver al sitio
          </Link>
        </div>
      </div>

      {/* ── Panel derecho: formulario ───────────────── */}
      <div className="si-form-panel">
        <div className="si-form-inner">

          {/* Logo visible solo en mobile */}
          <div className="si-mobile-logo" aria-hidden="true">
            <img src={logo} alt="MedSoftIA" />
            <span className="si-mobile-brand">
              <span className="si-brand-white-m">Med</span>
              <span className="si-brand-accent-m">Soft</span>
              <span className="si-brand-white-m">IA</span>
            </span>
          </div>

          <h1 className="si-title">Bienvenido de nuevo</h1>
          <p className="si-subtitle">Ingresa tus credenciales para continuar</p>

          {error && (
            <div className="si-alert si-alert--error" role="alert">
              <span>⚠️</span> {error}
            </div>
          )}

          <form className="si-form" onSubmit={handleSubmit} noValidate>
            <div className="si-field">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Correo electrónico
              </label>
              <input
                id="email" name="email" type="email"
                placeholder="correo@ejemplo.com"
                value={form.email} onChange={handleChange} required
                autoComplete="email"
              />
            </div>

            <div className="si-field">
              <div className="si-label-row">
                <label htmlFor="password">
                  <FontAwesomeIcon icon={faLock} /> Contraseña
                </label>
                <button
                  type="button"
                  className="si-toggle-pass"
                  onClick={() => setShowPassword(v => !v)}
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
                >
                  {showPassword ? 'Ocultar' : 'Mostrar'}
                </button>
              </div>
              <input
                id="password" name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={form.password} onChange={handleChange} required
                autoComplete="current-password"
              />
            </div>

            <button className="si-submit-btn" type="submit" disabled={enviando}>
              {enviando ? (
                <>⏳ Ingresando…</>
              ) : (
                <>Ingresar <FontAwesomeIcon icon={faArrowRight} /></>
              )}
            </button>
          </form>

          <div className="si-extra">
            <button
              type="button"
              className="si-forgot-btn"
              onClick={() => setMostrarRecuperar(true)}
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <p className="si-back-mobile">
            <Link to="/home">← Volver al sitio</Link>
          </p>
        </div>
      </div>

      {mostrarRecuperar && (
        <RecuperarPasswordModal onClose={() => setMostrarRecuperar(false)} />
      )}
    </div>
  );
};

export default SignIn;
