import React from "react";
import '../styles/ContactoStyles.css';

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

          <div className="contact-item">
            <span>📱 WhatsApp</span>
            <p>+57 3009132559</p>
          </div>

          <div className="contact-item">
            <span>📞 Teléfono</span>
            <p>(604) 4449768</p>
          </div>

          <div className="contact-box">
            <strong>📍 Dirección</strong>
            <p>Cra. 48 #34 Sur 10, Zona 2, Envigado, Antioquia</p>
          </div>

          <div className="contact-box">
            <strong>🕒 Horario de Atención</strong>
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