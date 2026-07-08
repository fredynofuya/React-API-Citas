import React from "react";
import '../styles/ServicioStyles.css';

const servicios = [
  {
    titulo: "Consulta Médica Especializada",
    descripcion: "Atención integral por especialistas altamente calificados.",
    img:"https://paraleloestudio.com/wp-content/uploads/asistente-medico-ayudando-al-paciente-ejercicios-fisioterapia-scaled.jpg"
  },
  {
    titulo: "Laboratorio Clínico y Diagnóstico",
    descripcion: "Exámenes diagnósticos con tecnología de alta precisión.",
    img:"https://images.unsplash.com/photo-1586773860418-d37222d8fce3"
  },
  {
    titulo: "Toma de Muestras a Domicilio",
    descripcion: "Servicio ágil y seguro para toma de muestras médicas.",
    img:"https://dd8u8m75fccea.cloudfront.net/v3/assets/bltd488044897c9abc0/bltdfa4856fee244014/62bca5d79a55544ea3af76fa/cli%CC%81nicas_cerca_de_mi_2_.jpeg?auto=webp&format=jpg&quality=80&disable=upscale&width=518&height=300&crop=518%3A300%2Csmart"
  },
  {
    titulo: "Atención Domiciliaria Integral",
    descripcion: "Servicios médicos en la comodidad de tu hogar.",
    img:"https://consultorsalud.com/wp-content/uploads/2025/07/Colombia-no-puede-reformar-su-sistema-de-salud-sin-priorizar-la-atencion-domiciliaria.jpg"
  },
  {
    titulo: "Programas de Prevención",
    descripcion: "Planes enfocados en la promoción de la salud.",
    img:"https://www.ipsvitalcare.com/wp-content/uploads/Medicina-General.jpg"
  },
  {
    titulo: "Atención al Usuario y Orientación Médica",
    descripcion: "Acompañamiento y orientación personalizada.",
    img:"https://img.magnific.com/foto-gratis/asistente-medico-mostrando-medicion-prueba-niveles-glucosa_482257-132036.jpg?semt=ais_hybrid&w=740&q=80"
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
      <section className="servicios-section">
        <div className="servicios-grid">
          {servicios.map((servicio, index) => (
            <div className="servicio-card" key={index}>
              <img src={servicio.img} alt={servicio.titulo} />
              <div className="servicio-content">
                <h3>{servicio.titulo}</h3>
                <p>{servicio.descripcion}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Servicios;