import React, { useEffect, useState } from 'react';
import { listaMedicos } from '../services/CitasService';
import '../components/Dashboard/DashboardStyles.css';

const Medicos = () => {
  const [medicos, setMedicos] = useState([]);

  useEffect(() => {
    document.title = 'Médicos';
    listaMedicos()
      .then(res => setMedicos(res.data))
      .catch(err => console.error('Error cargando médicos:', err));
  }, []);

  return (
    <div className="TitleList table-responsive-custom">
      <div className="Add">
        {/* Botón deshabilitado a propósito: ver Riesgos — falta backend para especialidades/usuarios */}
        <button className="btn-paciente-guardar" disabled title="Pendiente: endpoints de especialidad y usuario">
          + Nuevo médico
        </button>
      </div>
      <h1>Médicos</h1>

      <table className="table table-striped table-bordered">
        <thead>
          <tr><th>Nombre</th><th>Consultorio</th><th>Registro profesional</th></tr>
        </thead>
        <tbody>
          {medicos.map((m) => (
            <tr key={m.id}>
              <td>{m.nombreMedico || `Médico #${m.id}`}</td>
              <td>{m.nombreConsultorio || '—'}</td>
              <td>{m.registro_profesional || '—'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Medicos;