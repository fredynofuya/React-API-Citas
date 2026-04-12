import React from "react";
import '../styles/ServicioStyles.css';

const servicios = [
  {
    titulo: "Consulta Médica Especializada",
    descripcion: "Atención integral por especialistas altamente calificados.",
    icono: "🩺"
  },
  {
    titulo: "Laboratorio Clínico",
    descripcion: "Exámenes diagnósticos con tecnología de alta precisión.",
    icono: "🧪"
  },
  {
    titulo: "Toma de Muestras",
    descripcion: "Servicio ágil y seguro para toma de muestras médicas.",
    icono: "💉"
  },
  {
    titulo: "Atención Domiciliaria",
    descripcion: "Servicios médicos en la comodidad de tu hogar.",
    icono: "🏠"
  },
  {
    titulo: "Programas de Prevención",
    descripcion: "Planes enfocados en la promoción de la salud.",
    icono: "❤️"
  },
  {
    titulo: "Atención al Usuario",
    descripcion: "Acompañamiento y orientación personalizada.",
    icono: "📞"
  }
];

const Servicios = () => {
  return (
    <div className="servicios-container">
      
      {/* Encabezado */}
      <h1 className="servicios-title">Nuestros Servicios</h1>
      <p className="servicios-subtitle">
        Ofrecemos soluciones integrales en salud con calidad y compromiso
      </p>

      {/* Grid de servicios */}
      <div className="servicios-grid">
        {servicios.map((servicio, index) => (
          <div className="servicio-card" key={index}>
            <div className="icono">{servicio.icono}</div>
            <h3>{servicio.titulo}</h3>
            <p>{servicio.descripcion}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default Servicios;