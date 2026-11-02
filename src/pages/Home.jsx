import '../styles/HomeStyles.css';

import cirugia from '../assets/cirugia.jpg';
import paciente from "../assets/paciente.jpg";
import diagnostico from "../assets/diagnostico.png";
import servicio from "../assets/servicio.jpg";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';

const valores = [
  {
    titulo: "Responsabilidad",
    descripcion:
      "Nos hacemos cargo de las consecuencias de nuestras acciones y decisiones, asegurando un servicio de calidad.",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
  },
  {
    titulo: "Respeto",
    descripcion:
      "Valoramos y consideramos las opiniones y necesidades de cada paciente con empatía y profesionalismo.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118"
  },
  {
    titulo: "Humanización",
    descripcion:
      "Priorizamos el trato humano y cercano, actuando con honestidad y coherencia en todas nuestras acciones.",
    img: "https://www.ipsvitalcare.com/wp-content/uploads/Medicina-General.jpg"
  }
];

const Home = () => {

  useEffect(() => {
    document.title = 'Home | MedSoftIA';
  }, []);

  return (
    <div>
      {/* Carrusel Principal */}
      <div className='Carosel'>
        <Carousel interval={5000} controls={true} indicators={true} fade> 
          <Carousel.Item>
            <div className="carousel-box-1">
              <h1>Agenda tu cita médica de forma rápida y segura</h1>
            </div>
            <img className="immg" src={servicio} alt="Servicio médico de calidad" />
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-box-1">
              <h1>Estamos contigo en cada paso de tu camino</h1>
            </div>
            <img className="immg" src={paciente} alt="Atención personalizada al paciente" />
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-box-1">
              <h1>Innovación que cuida tu salud</h1>
            </div>
            <img className="immg" src={cirugia} alt="Tecnología médica avanzada" />
          </Carousel.Item>

          <Carousel.Item>
            <div className="carousel-box-1">
              <h1>Especialistas en tu bienestar</h1>
            </div>
            <img className="immg" src={diagnostico} alt="Diagnóstico profesional" />
          </Carousel.Item>
        </Carousel>
      </div>

      {/* Contenedor Principal */}
      <div className='home-container'>
        <h1>Bienvenido a MedSoftIA</h1>
        <p>
          La plataforma integral para gestionar tu salud de manera eficiente, 
          conectando pacientes con los mejores profesionales médicos.
        </p>

        {/* Sección Quiénes Somos */}
        <section className="about-section">
          <div className="about-image">
            <img
              src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
              alt="Instalaciones modernas de la clínica"
            />
            <div className="overlay">
              Instalaciones Modernas y Confortables
            </div>
          </div>

          <div className="about-text">
            <h2>¿Quiénes Somos?</h2>
            <p>
              Somos una institución comprometida con brindar servicios de salud
              de alta calidad, enfocados en el bienestar integral de nuestros pacientes.
              Contamos con un equipo profesional altamente capacitado y más de
              10 años de experiencia en el sector salud.
            </p>
            <p>
              Nuestra misión es facilitar el acceso a servicios médicos de excelencia
              a través de tecnología innovadora y un trato humano excepcional.
            </p>

            <div className="buttons">
              <button className="btn-primary">Conoce más</button>
              <button className="btn-outline">📞 Llámanos</button>
            </div>
          </div>
        </section>

        {/* Sección Valores */}
        <section className="valores-section">
          <h2>Nuestros Valores</h2>

          <div className="valores-grid">
            {valores.map((valor, index) => (
              <div className="valor-card" key={index}>
                <img src={valor.img} alt={valor.titulo} />
                <div className="valor-content">
                  <h3>{valor.titulo}</h3>
                  <p>{valor.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Home;
