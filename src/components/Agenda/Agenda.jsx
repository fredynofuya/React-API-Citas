import React, { useEffect, useState } from 'react';
import './AgendaStyles.css';
import { listaCitasConfirmada } from '../../services/CitasService';
import 'bootstrap/dist/css/bootstrap.min.css';

const Agenda = () => {

    const [citas, setCitas] = useState([]);

    useEffect(() => {
        document.title = 'Agenda';
        listaCitasConfirmada('CONFIRMADA')
            .then(response => setCitas(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="home">
            <div className="TitleList table-responsive-custom">
                <h1 className='text-left'>Agenda</h1>

                {citas.length === 0 && <p>No hay citas confirmadas.</p>}

                {citas.length > 0 && (
                    <table className="table table-striped table-bordered">
                        <thead className="Thead">
                            <tr>
                                
                                <th>Documento</th>
                                <th>Nombre Completo</th>
                                <th>Fecha</th>
                                <th>Hora</th>
                                <th>Id_Médico</th>
                                <th>Estado</th>
                            </tr>
                        </thead>
                        <tbody>
                            {citas.map((cita) => (
                                <tr key={cita.id}>
                                    
                                    <td>{cita.documento}</td>
                                    <td>{cita.nombre}</td>
                                    <td>{cita.fecha}</td>
                                    <td>{cita.hora}</td>
                                    <td>{cita.id_medico}</td>
                                    <td>{cita.estado}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default Agenda;