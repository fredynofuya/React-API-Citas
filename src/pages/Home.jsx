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
      "Nos hacemos cargo de las consecuencias de nuestras acciones y decisiones.",
    img: "https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
  },
  {
    titulo: "Respeto",
    descripcion:
      "Valoramos y consideramos las opiniones y necesidades de los demás.",
    img: "https://images.unsplash.com/photo-1579684385127-1ef15d508118"
  },
  {
    titulo: "Humanización",
    descripcion:
      "Actuamos con honestidad y coherencia en todas nuestras acciones.",
    img: "https://www.mutualmedica.com/documents/20123/0/MUTUAL+MEDICA3661.jpg/b03bf2dd-0e02-51a5-201d-19fd854f695a?t=1693381260657"
  }
];

const Home = () => {

  useEffect(() => {
    
        document.title = 'HomeCitaYa';
      }, []);
  return (
    <div>
    <div className='Carosel'>
          <Carousel interval={5000} controls={true} indicators={true}> 
            <Carousel.Item>
              <div className="carousel-box-1">
                <h1>Agenda tu cita médica de forma rápida y segura</h1>
              </div>
              <img className="immg" src={servicio} alt={"lindo"} />
            </Carousel.Item>
            <Carousel.Item>
              <div className="carousel-box-1">
                <h1>Estamos contigo en cada paso de tu camino</h1>
              </div>
              <img className="immg" src={paciente} alt={"lindo1536x864"} />
            </Carousel.Item>

            <Carousel.Item>
              <div className="carousel-box-1">
                <h1>Innovación que cuida tu salud</h1>
              </div>
              <img className="immg" src={cirugia} alt={"lindo1536x864"} />
            </Carousel.Item>

            <Carousel.Item>
              <div className="carousel-box-1">
                <h1>Especialistas en tu bienestar</h1>
              </div>
              <img className="immg" src={diagnostico} alt={"lindo1536x864"} />
            </Carousel.Item>
          </Carousel>
    </div>
    <div className='home-container'>
        <h1>Bienvenido a TuCitaYa</h1>
        {/* SECCIÓN QUIÉNES SOMOS */}
      <section className="about-section">
        
        <div className="about-image">
          <img
            src="https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
            alt="clinica"
          />
          <div className="overlay">
            Instalaciones Modernas y Confortables
          </div>
        </div>

        <div className="about-text">
          <h2>¿Quiénes Somos?</h2>
          <p>
            Somos una institución comprometida con brindar servicios de salud
            de alta calidad, enfocados en el bienestar de nuestros pacientes.
            Contamos con un equipo profesional altamente capacitado y más de
            10 años de experiencia.
          </p>

          <div className="buttons">
            <button className="btn-primary">Conoce más</button>
            <button className="btn-outline">📞 Llámanos</button>
          </div>
        </div>

      </section>

      {/* SECCIÓN VALORES */}
      <section className="valores-section">
        <h2>Nuestros valores</h2>

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
  )
}

export default Home;
     
