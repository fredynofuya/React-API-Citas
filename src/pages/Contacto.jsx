import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ContactoStyles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';
import {
  faPhone,
  faMapMarkerAlt,
  faClock,
  faEnvelope,
  faPaperPlane,
  faUser,
  faCommentAlt,
} from '@fortawesome/free-solid-svg-icons';

/* ─── datos ──────────────────────────────────────────── */
const infoItems = [
  {
    icon: faWhatsapp,
    label: 'WhatsApp',
    value: '+57 300 913 2559',
    href: 'https://wa.me/573009132559',
  },
  {
    icon: faPhone,
    label: 'Teléfono',
    value: '(604) 444 9768',
    href: 'tel:6044449768',
  },
  {
    icon: faEnvelope,
    label: 'Correo',
    value: 'info@medsoftia.com',
    href: 'mailto:info@medsoftia.com',
  },
  {
    icon: faMapMarkerAlt,
    label: 'Dirección',
    value: 'Cra. 48 #34 Sur 10, Zona 2, Envigado, Antioquia',
    href: 'https://maps.google.com/?q=Cra.+48+%2334+Sur+10,+Envigado',
  },
  {
    icon: faClock,
    label: 'Horario',
    value: 'Lunes a Viernes: 7:00 AM – 6:00 PM',
    href: null,
  },
];

/* ─── componente ─────────────────────────────────────── */
const Contacto = () => {
  useEffect(() => {
    document.title = 'Contáctanos | MedSoftIA';
  }, []);

  const [form, setForm] = useState({ nombre: '', email: '', asunto: '', mensaje: '' });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    // lógica de envío real se conecta aquí
    setEnviado(true);
    setTimeout(() => setEnviado(false), 4000);
    setForm({ nombre: '', email: '', asunto: '', mensaje: '' });
  };

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════ */}
      <section className="cto-hero" aria-label="Encabezado contacto">
        <div className="cto-hero-overlay" />
        <div className="cto-hero-content">
          <span className="cto-hero-label">Estamos para ti</span>
          <h1 className="cto-hero-title">Contáctanos</h1>
          <p className="cto-hero-subtitle">
            Resolvemos tus dudas, gestionamos tus citas y te acompañamos en
            cada paso. No dudes en escribirnos.
          </p>
        </div>
        <div className="cto-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f0f4f4" />
          </svg>
        </div>
      </section>

      {/* ═══ CONTENIDO PRINCIPAL ════════════════════════ */}
      <section className="cto-main" aria-label="Información y formulario">
        <div className="cto-grid">

          {/* ── Panel izquierdo: info ─────────────────── */}
          <div className="cto-info-panel">
            <span className="section-label-cto">Encuéntranos</span>
            <h2>Información de contacto</h2>
            <p className="cto-info-desc">
              Elige el canal que más te convenga. Nuestro equipo responde en
              menos de 24 horas hábiles.
            </p>

            <div className="cto-info-grid">
              {infoItems.map((item, i) => (
                <div className="cto-info-item" key={i}>
                  <div className="cto-info-icon">
                    <FontAwesomeIcon icon={item.icon} />
                  </div>
                  <div className="cto-info-text">
                    <span className="cto-info-label">{item.label}</span>
                    {item.href ? (
                      <a
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cto-info-value cto-info-link"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="cto-info-value">{item.value}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* mapa embebido */}
            <div className="cto-map-wrap">
              <iframe
                title="Ubicación MedSoftIA"
                src="https://www.openstreetmap.org/export/embed.html?bbox=-75.590%2C6.160%2C-75.560%2C6.180&layer=mapnik"
                className="cto-map"
                loading="lazy"
              />
            </div>
          </div>

          {/* ── Panel derecho: formulario ─────────────── */}
          <div className="cto-form-panel">
            <span className="section-label-cto">Escríbenos</span>
            <h2>Envíanos un mensaje</h2>
            <p className="cto-form-desc">
              Completa el formulario y nos pondremos en contacto contigo a la brevedad.
            </p>

            {enviado && (
              <div className="cto-success" role="alert">
                ✅ Mensaje enviado correctamente. ¡Te contactaremos pronto!
              </div>
            )}

            <form className="cto-form" onSubmit={handleSubmit} noValidate>
              <div className="cto-form-row">
                <div className="cto-field">
                  <label htmlFor="nombre">
                    <FontAwesomeIcon icon={faUser} /> Nombre completo
                  </label>
                  <input
                    id="nombre"
                    name="nombre"
                    type="text"
                    placeholder="Juan Pérez"
                    value={form.nombre}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="cto-field">
                  <label htmlFor="email">
                    <FontAwesomeIcon icon={faEnvelope} /> Correo electrónico
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="cto-field">
                <label htmlFor="asunto">
                  <FontAwesomeIcon icon={faCommentAlt} /> Asunto
                </label>
                <input
                  id="asunto"
                  name="asunto"
                  type="text"
                  placeholder="¿En qué podemos ayudarte?"
                  value={form.asunto}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="cto-field">
                <label htmlFor="mensaje">Mensaje</label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  rows="5"
                  placeholder="Escribe tu consulta aquí..."
                  value={form.mensaje}
                  onChange={handleChange}
                  required
                />
              </div>

              <button type="submit" className="cto-submit-btn">
                <FontAwesomeIcon icon={faPaperPlane} />
                Enviar mensaje
              </button>
            </form>
          </div>

        </div>
      </section>

      {/* ═══ CTA FINAL ═══════════════════════════════════ */}
      <section className="cto-cta-section" aria-label="Solicitar cita">
        <div className="cto-cta-inner">
          <h2>¿Prefieres agendar directamente?</h2>
          <p>Solicita tu cita en línea y uno de nuestros especialistas te atenderá.</p>
          <Link to="/solicitudcita" className="cto-cta-btn">
            Solicitar cita ahora
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Contacto;
