import React, { useEffect, useState } from 'react';
import '../styles/DashboardStyles.css';
import { listaPacientes } from '../services/PacientesService';
//import config from '../config'
//import { Link } from 'react-router-dom';

const Dashboard = () => {
    
    const [pacientes, setPacientes] = useState([]);
        useEffect(() => {
        // document.title = 'Dashboard';
        listaPacientes()
            .then(response => {
                setPacientes(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="home">
            <div className="TitleList">
                <h1 className='text-left'>Citas API-CRUD:</h1>
                <table className="table table-striped table-bordered">
                    <thead className="Thead">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Fecha Regristro</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pacientes.map((paciente, index) => (
                            <tr key={index}>
                                <td>{paciente.id}</td>
                                <td>{paciente.nombre}</td>
                                {/* <td>{(new Date(audit.fecha)).toLocaleDateString('es-CO')}</td> */}
                                <td>{paciente.telefono}</td>
                                <td>{paciente.fecha_registro}</td>
                                {/* <td>
                                    <Link to="/criteriosProcess" state={{ audit: audit}}>{audit.estado}</Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Dashboard;