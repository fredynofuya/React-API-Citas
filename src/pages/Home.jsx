import '../styles/HomeStyles.css';

import cirugia from '../assets/cirugia.jpg';

import consulta from "../assets/consulta.jpg";


import servicio from "../assets/servicio.jpg";

import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';


const Home = () => {

  useEffect(() => {
        document.title = 'Home';
      }, []);
  return (
    <div>
    <div className='Carosel'>
          <Carousel  interval={4000} controls={false} indicators={true}> 
            <Carousel.Item>
              <img className="immg" src={servicio} alt={"lindo1536x864"} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="immg" src={cirugia} alt={"lindo1536x864"} />
            </Carousel.Item>
            <Carousel.Item>
              <img className="immg" src={consulta} alt={"lindo1536x864"} />
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
     
