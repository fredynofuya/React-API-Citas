import React from "react";
import '../styles/ContactoStyles.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWhatsappSquare } from '@fortawesome/free-brands-svg-icons'
import { faPhone } from '@fortawesome/free-solid-svg-icons'
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'
import { faClock } from '@fortawesome/free-solid-svg-icons'

const Contacto = () => {
  return (
    <div className="contact-container">
      
      {/* Título */}
      <h1 className="contact-title">Contáctanos</h1>
      <p className="contact-subtitle">
        Estamos aquí para atenderte y resolver todas tus dudas
      </p>

      <div className="contact-content">
        
        {/* Información */}
        <div className="contact-card">
          <h2>Información de Contacto</h2>

          <div className="contact-box">
            <strong><FontAwesomeIcon icon={faWhatsappSquare} /> WhatsApp</strong>
            <p>+57 3009132559</p>
          </div>

          <div className="contact-box">
            <strong><FontAwesomeIcon icon={faPhone} /> Teléfono</strong>
            <p>(604) 4449768</p>
          </div>

          <div className="contact-box">
            <strong><FontAwesomeIcon icon={faMapMarkerAlt} /> Dirección</strong>
            <p>Cra. 48 #34 Sur 10, Zona 2, Envigado, Antioquia</p>
          </div>

          <div className="contact-box">
            <strong><FontAwesomeIcon icon={faClock} /> Horario de Atención</strong>
            <p>Lunes a Viernes: 7:00 AM - 6:00 PM</p>
          </div>
        </div>

        {/* Mapa */}
        <div className="map-container">
          <iframe
            title="mapa"
            src="https://www.openstreetmap.org/export/embed.html?bbox=-75.590%2C6.160%2C-75.560%2C6.180&layer=mapnik"
            className="map"
          ></iframe>
        </div>

      </div>
    </div>
  );
};

export default Contacto;