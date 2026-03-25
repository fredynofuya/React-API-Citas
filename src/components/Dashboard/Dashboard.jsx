import React, { useEffect, useState } from 'react';
import './DashboardStyles.css';
import { listaCitas } from '../../services/CitasService';
//import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteCita } from '../../services/CitasService';
//import { editarCita } from '../../services/CitasService';
// import { Link } from 'react-router-dom';




const Dashboard = () => {
    
    const [citas, setCitas] = useState([]);
    // const navigator = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);   
    
    useEffect(() => {
        document.title = 'Dashboard';
        listaCitas()
            .then(response => {
                setCitas(response.data);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);
    
    function ActualizarCita(id) {
        // Lógica para actualizar una cita existente
        navigator(`/dashboard`, { state: { id } }); // Redirige a la página de edición de cita con el ID
    }

    function abrirModalEliminar(cita) {
    setCitaSeleccionada(cita);
    setShowDeleteModal(true);
    }

    function confirmarEliminar() {
        deleteCita(citaSeleccionada.id)
            .then(() => {
                setCitas(citas.filter(c => c.id !== citaSeleccionada.id));
                setShowDeleteModal(false);
            })
            .catch(error => {
                console.error('Error deleting data:', error);
            });
    }

    function abrirModalEditar(cita) {
    setCitaSeleccionada(cita);
    setShowEditModal(true);
    }

    return (
        <div className="home">
            <div className="TitleList">
                <h1 className='text-left'>Citas API-CRUD:</h1>
                <table className="table table-striped table-bordered">
                    <thead className="Thead">
                        <tr>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Mensaje</th>
                            <th>PDFs</th>

                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Direccion</th>
                            <th>Observación</th>
                            <th>Id_Médico</th>
                            <th>Id_Especialidad</th>
                            
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita, index) => (
                            <tr key={index}>
                                <td>{cita.documento}</td>
                                <td>{cita.nombre}</td>
                                <td>{cita.mensaje}</td>
                                <td>{cita.id_documento}</td>
                                {/* <td>{(new Date(audit.fecha)).toLocaleDateString('es-CO')}</td> */}
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>{cita.id_consultorio}</td>
                                <td>{cita.observaciones}</td>
                                <td>{cita.id_medico}</td>
                                <td>{cita.id_especialidad}</td>
                                
                                <td>{cita.estado}</td>
                                <td style={{ whiteSpace: 'nowrap' }}> 
                                    <button className='btn-edit' onClick={() => abrirModalEditar(cita)}>
                                        Edit
                                    </button>
                                    <button className='btn-update' onClick={() => ActualizarCita(cita.documento)}>
                                        Update
                                    </button>
                                    <button className='btn-delete' onClick={() => abrirModalEliminar(cita)}>
                                        Delete
                                    </button>
                                </td>
                                {/* <td>
                                    <Link to="/criteriosProcess" state={{ audit: audit}}>{audit.estado}</Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {/* Modal de eliminación */}
                {showDeleteModal && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">Confirmar eliminación</h5>
                                    <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                                </div>

                                <div className="modal-body">
                                    <p>
                                        ¿Seguro que deseas eliminar la cita del usuario con documento:
                                        <strong> {citaSeleccionada?.documento} </strong>?
                                    </p>
                                </div>

                                <div className="modal-footer">
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => setShowDeleteModal(false)}
                                    >
                                        Cancelar
                                    </button>

                                    <button 
                                        className="btn btn-danger"
                                        onClick={confirmarEliminar}
                                    >
                                        Confirmar
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                )}
                {/* Modal de edición */}
                {showEditModal && (
                    <div className="modal fade show d-block" tabIndex="-1">
                        <div className="modal-dialog">
                            <div className="modal-content">

                                <div className="modal-header">
                                    <h5 className="modal-title">Información del Paciente</h5>
                                    <button className="btn-close" onClick={() => setShowEditModal(false)}></button>
                                </div>

                                <div className="modal-body">
                                    <p><strong>Nombre:</strong> {citaSeleccionada?.nombre}</p>
                                    <p><strong>Email:</strong> {citaSeleccionada?.email}</p>
                                    <p><strong>Teléfono:</strong> {citaSeleccionada?.telefono}</p>
                                    <p><strong>Documento:</strong> {citaSeleccionada?.documento}</p>
                                </div>

                                <div className="modal-footer">
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => setShowEditModal(false)}
                                    >
                                        Cerrar
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Dashboard;