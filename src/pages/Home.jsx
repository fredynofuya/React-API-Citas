import '../styles/HomeStyles.css';

import cirugia from '../assets/cirugia.jpg';

import paciente from "../assets/paciente.jpg";
import diagnostico from "../assets/diagnostico.png";

import servicio from "../assets/servicio.jpg";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCalendarDays } from '@fortawesome/free-solid-svg-icons'


const Home = () => {

  useEffect(() => {
        document.title = 'Home';
      }, []);
  return (
    <div>
    <div className='Carosel'>
          <Carousel interval={5000} controls={true} indicators={true}> 
            <Carousel.Item>
              <div className="carousel-box">
                <button className="btn-cita"><FontAwesomeIcon icon={faCalendarDays}/> Solicitar cita</button>
              </div>
              <img className="immg" src={servicio} alt="servicio" />
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
        <div className='welcome-section'>
          <h2>Tu plataforma de citas médicas de confianza</h2>
          <p>Agenda tu cita de forma rápida y sencilla con los mejores profesionales de la salud</p>
        </div>    
    </div>
    </div>
  )
}

export default Home;
     
