import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/SolicitudCitaStyles.css';
import { crearCita } from '../services/CitasService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser, faEnvelope, faIdCard, faPhone, faHospital,
  faFileAlt, faPaperPlane, faCheckCircle, faTimesCircle,
  faCalendarCheck, faClock, faUserMd, faShieldAlt,
} from '@fortawesome/free-solid-svg-icons';

/* ─── beneficios del panel lateral ───────────────────── */
const beneficios = [
  { icon: faCalendarCheck, titulo: 'Confirmación rápida',  desc: 'Recibes respuesta en menos de 24 horas hábiles.' },
  { icon: faUserMd,        titulo: 'Especialistas listos', desc: 'Más de 50 profesionales en diversas especialidades.' },
  { icon: faClock,         titulo: 'Horarios flexibles',   desc: 'Atención de lunes a viernes, 7:00 AM – 6:00 PM.' },
  { icon: faShieldAlt,     titulo: 'Datos seguros',        desc: 'Tu información está protegida bajo nuestra política de privacidad.' },
];

/* ─── componente ─────────────────────────────────────── */
const SolicitudCita = () => {
  useEffect(() => {
    document.title = 'Solicitar Cita | MedSoftIA';
  }, []);

  const [form, setForm] = useState({
    nombre: '',
    correo: '',
    tipoDocumento: '',
    documento: '',
    telefono: '',
    eps: '',
    motivo: '',
    aceptaNotificaciones: false,
  });

  const [enviando, setEnviando]           = useState(false);
  const [mensajeEstado, setMensajeEstado] = useState(null);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensajeEstado(null);

    const cita = {
      nombre:                form.nombre,
      email:                 form.correo,
      tipo_documento:        form.tipoDocumento,
      documento:             form.documento,
      telefono:              form.telefono,
      eps:                   form.eps,
      motivo:                form.motivo,
      acepta_notificaciones: form.aceptaNotificaciones,
    };

    crearCita(cita)
      .then(() => {
        setMensajeEstado({ tipo: 'exito', texto: 'Tu solicitud fue enviada correctamente. Nos pondremos en contacto pronto.' });
        setForm({ nombre: '', correo: '', tipoDocumento: '', documento: '', telefono: '', eps: '', motivo: '', aceptaNotificaciones: false });
      })
      .catch((error) => {
        console.error('Error creando la cita:', error);
        setMensajeEstado({ tipo: 'error', texto: 'No se pudo enviar la solicitud. Intenta de nuevo más tarde.' });
      })
      .finally(() => setEnviando(false));
  };

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════ */}
      <section className="sol-hero" aria-label="Solicitar cita">
        <div className="sol-hero-overlay" />
        <div className="sol-hero-content">
          <span className="sol-hero-label">Agenda en minutos</span>
          <h1 className="sol-hero-title">Solicitar Cita Médica</h1>
          <p className="sol-hero-subtitle">
            Completa el formulario y uno de nuestros agentes te confirmará
            la cita en menos de 24 horas hábiles.
          </p>
        </div>
        <div className="sol-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f0f4f4" />
          </svg>
        </div>
      </section>

      {/* ═══ CUERPO PRINCIPAL ════════════════════════════ */}
      <section className="sol-main" aria-label="Formulario de solicitud">
        <div className="sol-layout">

          {/* ── Formulario ───────────────────────────── */}
          <div className="sol-form-panel">
            <span className="sol-section-label">Tus datos</span>
            <h2 className="sol-panel-title">Completa la solicitud</h2>

            {/* mensaje de estado */}
            {mensajeEstado && (
              <div className={`sol-alert sol-alert--${mensajeEstado.tipo}`} role="alert">
                <FontAwesomeIcon icon={mensajeEstado.tipo === 'exito' ? faCheckCircle : faTimesCircle} />
                <span>{mensajeEstado.texto}</span>
              </div>
            )}

            <form className="sol-form" onSubmit={handleSubmit} noValidate>

              {/* fila 1 */}
              <div className="sol-row">
                <div className="sol-field">
                  <label htmlFor="nombre">
                    <FontAwesomeIcon icon={faUser} /> Nombre completo
                  </label>
                  <input
                    id="nombre" name="nombre" type="text"
                    placeholder="Juan Pérez"
                    value={form.nombre} onChange={handleChange} required
                  />
                </div>
                <div className="sol-field">
                  <label htmlFor="correo">
                    <FontAwesomeIcon icon={faEnvelope} /> Correo electrónico
                  </label>
                  <input
                    id="correo" name="correo" type="email"
                    placeholder="correo@ejemplo.com"
                    value={form.correo} onChange={handleChange} required
                  />
                </div>
              </div>

              {/* fila 2 */}
              <div className="sol-row">
                <div className="sol-field">
                  <label htmlFor="tipoDocumento">
                    <FontAwesomeIcon icon={faIdCard} /> Tipo de documento
                  </label>
                  <select
                    id="tipoDocumento" name="tipoDocumento"
                    value={form.tipoDocumento} onChange={handleChange} required
                  >
                    <option value="">Seleccionar…</option>
                    <option value="CC">Cédula de ciudadanía</option>
                    <option value="TI">Tarjeta de identidad</option>
                    <option value="PASAPORTE">Pasaporte</option>
                  </select>
                </div>
                <div className="sol-field">
                  <label htmlFor="documento">
                    <FontAwesomeIcon icon={faIdCard} /> Número de documento
                  </label>
                  <input
                    id="documento" name="documento" type="text"
                    placeholder="1234567890"
                    value={form.documento} onChange={handleChange} required
                  />
                </div>
              </div>

              {/* fila 3 */}
              <div className="sol-row">
                <div className="sol-field">
                  <label htmlFor="telefono">
                    <FontAwesomeIcon icon={faPhone} /> Teléfono
                  </label>
                  <input
                    id="telefono" name="telefono" type="text"
                    placeholder="+57 300 000 0000"
                    value={form.telefono} onChange={handleChange} required
                  />
                </div>
                <div className="sol-field">
                  <label htmlFor="eps">
                    <FontAwesomeIcon icon={faHospital} /> EPS
                  </label>
                  <select
                    id="eps" name="eps"
                    value={form.eps} onChange={handleChange} required
                  >
                    <option value="">Seleccionar…</option>
                    <option value="SURA">Sura</option>
                    <option value="SANITAS">Sanitas</option>
                    <option value="SAVIASALUD">Savia Salud</option>
                  </select>
                </div>
              </div>

              {/* motivo */}
              <div className="sol-field">
                <label htmlFor="motivo">
                  <FontAwesomeIcon icon={faFileAlt} /> Motivo de la consulta
                </label>
                <textarea
                  id="motivo" name="motivo" rows="4"
                  placeholder="Describe brevemente el motivo de tu consulta…"
                  value={form.motivo} onChange={handleChange} required
                />
              </div>

              {/* consentimiento */}
              <label className="sol-consent">
                <input
                  type="checkbox"
                  name="aceptaNotificaciones"
                  checked={form.aceptaNotificaciones}
                  onChange={handleChange}
                  required
                />
                <span>
                  Autorizo a MedSoftIA el tratamiento de mis datos personales, incluidos los datos de salud
                  asociados a mi solicitud, para gestionar mi cita y enviarme notificaciones sobre ella al
                  correo que registré. Puedo revocar esta autorización comunicándome al (604) 444 9768.
                </span>
              </label>

              <button className="sol-submit-btn" type="submit" disabled={enviando}>
                {enviando ? (
                  <>⏳ Enviando solicitud…</>
                ) : (
                  <><FontAwesomeIcon icon={faPaperPlane} /> Enviar solicitud</>
                )}
              </button>
            </form>
          </div>

          {/* ── Panel lateral de beneficios ───────────── */}
          <aside className="sol-side-panel" aria-label="Beneficios del servicio">
            <div className="sol-side-inner">
              <span className="sol-section-label">¿Por qué elegirnos?</span>
              <h2 className="sol-panel-title">Así funciona</h2>
              <p className="sol-side-desc">
                Agendar con MedSoftIA es simple, rápido y seguro.
              </p>

              <ul className="sol-benefits-list">
                {beneficios.map((b, i) => (
                  <li className="sol-benefit-item" key={i}>
                    <div className="sol-benefit-icon">
                      <FontAwesomeIcon icon={b.icon} />
                    </div>
                    <div>
                      <strong>{b.titulo}</strong>
                      <p>{b.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>

              <div className="sol-side-cta">
                <p>¿Tienes dudas antes de agendar?</p>
                <Link to="/contacto" className="sol-side-link">
                  Contáctanos →
                </Link>
              </div>
            </div>
          </aside>

        </div>
      </section>
    </main>
  );
};

export default SolicitudCita;
