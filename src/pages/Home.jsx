import '../styles/HomeStyles.css';

import cirugia from '../assets/cirugia.jpg';
import paciente from '../assets/paciente.jpg';
import diagnostico from '../assets/diagnostico.png';
import servicio from '../assets/servicio.jpg';

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { Link } from 'react-router-dom';

/* ─── datos ──────────────────────────────────────────── */
const slides = [
  {
    img: servicio,
    alt: 'Servicio médico de calidad',
    badge: 'Plataforma digital de salud',
    title: 'Agenda tu cita con seguridad',
    cta: 'Solicitar cita',
  },
  {
    img: paciente,
    alt: 'Atención personalizada al paciente',
    badge: 'Atención personalizada',
    title: 'Estamos contigo siempre',
    cta: 'Conoce más',
  },
  {
    img: cirugia,
    alt: 'Tecnología médica avanzada',
    badge: 'Alta tecnología',
    title: 'Innovación que cuida tu salud',
    cta: 'Nuestros servicios',
  },
  {
    img: diagnostico,
    alt: 'Diagnóstico profesional',
    badge: 'Especialistas certificados',
    title: 'Especialistas en tu bienestar',
    cta: 'Ver especialidades',
  },
];

const stats = [
  { value: '10+',   label: 'Años de experiencia' },
  { value: '5.000+', label: 'Pacientes atendidos' },
  { value: '50+',   label: 'Especialistas' },
  { value: '98%',   label: 'Satisfacción' },
];

const valores = [
  {
    titulo: 'Responsabilidad',
    descripcion:
      'Nos hacemos cargo de las consecuencias de nuestras acciones y decisiones, asegurando un servicio de calidad.',
    img: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3',
    icon: '🛡️',
  },
  {
    titulo: 'Respeto',
    descripcion:
      'Valoramos y consideramos las opiniones y necesidades de cada paciente con empatía y profesionalismo.',
    img: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118',
    icon: '🤝',
  },
  {
    titulo: 'Humanización',
    descripcion:
      'Priorizamos el trato humano y cercano, actuando con honestidad y coherencia en todas nuestras acciones.',
    img: 'https://www.ipsvitalcare.com/wp-content/uploads/Medicina-General.jpg',
    icon: '❤️',
  },
];

/* ─── componente ─────────────────────────────────────── */
const Home = () => {
  useEffect(() => {
    document.title = 'Home | MedSoftIA';
  }, []);

  return (
    <main>
      {/* ═══ HERO / CARRUSEL ══════════════════════════════ */}
      <section className="hero-section" aria-label="Presentación principal">
        <Carousel interval={5000} controls indicators fade className="hero-carousel">
          {slides.map((slide, i) => (
            <Carousel.Item key={i}>
              <img className="hero-img" src={slide.img} alt={slide.alt} />
              <div className="hero-overlay" />
              <div className="hero-content">
                <span className="hero-badge">{slide.badge}</span>
                <h1 className="hero-title">{slide.title}</h1>
                <Link to="/solicitudcita" className="hero-cta">
                  {slide.cta} →
                </Link>
              </div>
            </Carousel.Item>
          ))}
        </Carousel>
      </section>

      {/* ═══ ESTADÍSTICAS ════════════════════════════════ */}
      <section className="stats-section" aria-label="Estadísticas">
        <div className="stats-grid">
          {stats.map((s, i) => (
            <div className="stat-item" key={i}>
              <span className="stat-value">{s.value}</span>
              <span className="stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ QUIÉNES SOMOS ══════════════════════════════ */}
      <section className="about-section" aria-label="Quiénes somos">
        <div className="about-image-wrap">
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            alt="Instalaciones modernas de la clínica"
          />
          <div className="about-img-badge">
            <span className="about-img-badge-number">10+</span>
            <span className="about-img-badge-text">años de confianza</span>
          </div>
        </div>

        <div className="about-text">
          <span className="section-label">¿Quiénes somos?</span>
          <h2>Salud de calidad, trato humano excepcional</h2>
          <p>
            Somos una institución comprometida con brindar servicios de salud
            de alta calidad, enfocados en el bienestar integral de nuestros
            pacientes. Contamos con un equipo profesional altamente capacitado y
            más de 10 años de experiencia en el sector salud.
          </p>
          <p>
            Nuestra misión es facilitar el acceso a servicios médicos de
            excelencia a través de tecnología innovadora y un trato humano
            excepcional.
          </p>
          <div className="about-actions">
            <Link to="/servicio" className="btn-primary-home">Ver servicios</Link>
            <Link to="/contacto" className="btn-outline-home">📞 Contáctanos</Link>
          </div>
        </div>
      </section>

      {/* ═══ VALORES ════════════════════════════════════ */}
      <section className="valores-section" aria-label="Nuestros valores">
        <div className="valores-header">
          <span className="section-label">Lo que nos define</span> 
          <h2>Nuestros Valores</h2>
          <p>Principios que guían cada decisión y cada atención que brindamos.</p>
        </div>

        <div className="valores-grid">
          {valores.map((valor, index) => (
            <article className="valor-card" key={index}>
              <div className="valor-img-wrap">
                <img src={valor.img} alt={valor.titulo} />
              </div>
              <div className="valor-content">
                <h3>{valor.titulo}</h3>
                <p>{valor.descripcion}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ═══ CTA FINAL ══════════════════════════════════ */}
      <section className="cta-section" aria-label="Llamada a la acción">
        <div className="cta-inner">
          <h2>¿Listo para cuidar tu salud?</h2>
          <p>
            Agenda tu cita en minutos y accede a los mejores especialistas
            desde donde estés.
          </p>
          <Link to="/solicitudcita" className="cta-btn">
            Solicitar cita ahora
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Home;
