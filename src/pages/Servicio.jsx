import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/ServicioStyles.css';

/* ─── datos ──────────────────────────────────────────── */
const servicios = [
  {
    titulo: 'Consulta Médica Especializada',
    descripcion:
      'Atención integral por especialistas altamente calificados en múltiples áreas de la medicina.',
    img: 'https://paraleloestudio.com/wp-content/uploads/asistente-medico-ayudando-al-paciente-ejercicios-fisioterapia-scaled.jpg',
    
    tag: 'Presencial',
  },
  {
    titulo: 'Laboratorio Clínico y Diagnóstico',
    descripcion:
      'Exámenes diagnósticos con tecnología de alta precisión y resultados en tiempo récord.',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
    
    tag: 'Presencial',
  },
  {
    titulo: 'Toma de Muestras a Domicilio',
    descripcion:
      'Servicio ágil y seguro para toma de muestras médicas sin salir de casa.',
    img: 'https://dd8u8m75fccea.cloudfront.net/v3/assets/bltd488044897c9abc0/bltdfa4856fee244014/62bca5d79a55544ea3af76fa/cli%CC%81nicas_cerca_de_mi_2_.jpeg?auto=webp&format=jpg&quality=80&disable=upscale&width=518&height=300&crop=518%3A300%2Csmart',
    
    tag: 'Domicilio',
  },
  {
    titulo: 'Atención Domiciliaria Integral',
    descripcion:
      'Servicios médicos completos en la comodidad y seguridad de tu hogar.',
    img: 'https://consultorsalud.com/wp-content/uploads/2025/07/Colombia-no-puede-reformar-su-sistema-de-salud-sin-priorizar-la-atencion-domiciliaria.jpg',
    icon: '🚑',
    tag: 'Domicilio',
  },
  {
    titulo: 'Programas de Prevención',
    descripcion:
      'Planes estructurados enfocados en la promoción de la salud y prevención de enfermedades.',
    img: 'https://www.ipsvitalcare.com/wp-content/uploads/Medicina-General.jpg',
    
    tag: 'Preventivo',
  },
  {
    titulo: 'Orientación y Atención al Usuario',
    descripcion:
      'Acompañamiento personalizado para guiarte en cada paso de tu proceso de salud.',
    img: 'https://img.magnific.com/foto-gratis/asistente-medico-mostrando-medicion-prueba-niveles-glucosa_482257-132036.jpg?semt=ais_hybrid&w=740&q=80',
    
    tag: 'Orientación',
  },
];

const pasos = [
  {
    numero: '01',
    titulo: 'Solicita tu cita',
    descripcion: 'Elige el servicio y el especialista que necesitas desde nuestra plataforma.',
  },
  {
    numero: '02',
    titulo: 'Confirmación inmediata',
    descripcion: 'Recibirás una confirmación con todos los detalles de tu cita.',
  },
  {
    numero: '03',
    titulo: 'Asiste o recíbenos',
    descripcion: 'Preséntate en nuestras instalaciones o recibe atención en tu domicilio.',
  },
  {
    numero: '04',
    titulo: 'Seguimiento continuo',
    descripcion: 'Tu historial y resultados siempre disponibles en tu perfil.',
  },
];

/* ─── componente ─────────────────────────────────────── */
const Servicios = () => {
  useEffect(() => {
    document.title = 'Servicios | MedSoftIA';
  }, []);

  return (
    <main>
      {/* ═══ HERO ════════════════════════════════════════ */}
      <section className="srv-hero" aria-label="Encabezado servicios">
        <div className="srv-hero-overlay" />
        <div className="srv-hero-content">
          <span className="srv-hero-label">Lo que ofrecemos</span>
          <h1 className="srv-hero-title">Nuestros Servicios</h1>
          <p className="srv-hero-subtitle">
            Soluciones integrales en salud con calidad, tecnología y un equipo
            comprometido con tu bienestar.
          </p>
        </div>
        <div className="srv-hero-wave">
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#f0f4f4" />
          </svg>
        </div>
      </section>

      {/* ═══ GRID DE SERVICIOS ═══════════════════════════ */}
      <section className="srv-grid-section" aria-label="Catálogo de servicios">
        <div className="srv-section-header">
          <span className="section-label-srv">Catálogo completo</span>
          <h2>¿En qué podemos ayudarte?</h2>
          <p>Cada servicio está diseñado para brindarte la mejor atención posible.</p>
        </div>

        <div className="srv-grid">
          {servicios.map((srv, i) => (
            <article className="srv-card" key={i}>
              <div className="srv-card-img-wrap">
                <img src={srv.img} alt={srv.titulo} />
                <span className="srv-card-tag">{srv.tag}</span>
                
              </div>
              <div className="srv-card-body">
                <h3>{srv.titulo}</h3>
                <p>{srv.descripcion}</p>
                <Link to="/solicitudcita" className="srv-card-link">
                  Solicitar →
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ CÓMO FUNCIONA ═══════════════════════════════ */}
      <section className="srv-process-section" aria-label="Cómo funciona">
        <div className="srv-section-header">
          <span className="section-label-srv">Simple y rápido</span>
          <h2>¿Cómo funciona?</h2>
          <p>En 4 pasos tienes acceso a la mejor atención médica.</p>
        </div>

        <div className="srv-process-grid">
          {pasos.map((paso, i) => (
            <div className="srv-process-step" key={i}>
              <div className="srv-process-number">{paso.numero}</div>
              <div className="srv-process-connector" aria-hidden="true" />
              <h3>{paso.titulo}</h3>
              <p>{paso.descripcion}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ CTA FINAL ═══════════════════════════════════ */}
      <section className="srv-cta-section" aria-label="Llamada a la acción">
        <div className="srv-cta-inner">
          <h2>¿Necesitas atención médica hoy?</h2>
          <p>
            Agenda tu cita en minutos. Nuestros especialistas están listos
            para atenderte.
          </p>
          <Link to="/solicitudcita" className="srv-cta-btn">
            Solicitar cita ahora
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Servicios;
