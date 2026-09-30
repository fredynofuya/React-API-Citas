import React, { useEffect, useState } from 'react';
import './DashboardStyles.css';
import { listaCitas } from '../../services/CitasService';
//import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { deleteCita } from '../../services/CitasService';
import EditCitaModal from './EditCitaModal'; 

import NuevaCitaModal from './NuevaCitaModal';

// import { Link } from 'react-router-dom';
import {IconButton} from '@mui/material';

import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';



const Dashboard = () => {
    
    const [citas, setCitas] = useState([]);
    // const navigator = useNavigate();
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [citaSeleccionada, setCitaSeleccionada] = useState(null);   
    const [showNuevaCita, setShowNuevaCita] = useState(false);
    

   
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
    
    function abrirModalEliminar(cita) {
    setCitaSeleccionada(cita);
    setShowDeleteModal(true);
    }

    function abrirModalEditar(cita) {
    setCitaSeleccionada(cita);
    setShowEditModal(true);
    }

    function recargarCitas() {
        listaCitas()
            .then(response => setCitas(response.data))
            .catch(error => console.error('Error fetching data:', error));
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

  
    return (
        <div className="home">
            <div className="TitleList table-responsive-custom">
                <div className="Add">
                    <button className="btn-paciente-guardar" onClick={() => setShowNuevaCita(true)}>
                        + Nueva cita
                    </button>
                </div>
                <h1 className='text-left'>Citas</h1>
                <table className="table table-striped table-bordered">
                    <thead className="Thead">
                        <tr>
                            <th>Id</th>
                            <th>Documento</th>
                            <th>Nombre</th>
                            <th>Mensaje</th>
                            {/* <th>PDFs</th> */}

                            <th>Fecha</th>
                            <th>Hora</th>
                            <th>Direccion</th>
                            {/* <th>Observación</th> */}
                            <th>Id_Médico</th>
                            {/* <th>Id_Especialidad</th> */}
                            
                            <th>Estado</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {citas.map((cita, index) => (
                            <tr key={index}>
                                <td>{cita.id}</td>
                                <td>{cita.documento}</td>
                                <td>{cita.nombre}</td>
                                <td>{cita.mensaje}</td>
                                {/* <td>{cita.id_documento}</td> */}
                                {/* <td>{(new Date(audit.fecha)).toLocaleDateString('es-CO')}</td> */}
                                <td>{cita.fecha}</td>
                                <td>{cita.hora}</td>
                                <td>{cita.id_consultorio}</td>
                                {/* <td>{cita.observaciones}</td> */}
                                <td>{cita.id_medico}</td>
                                
                                <td>{cita.estado}</td>
                                <td style={{ whiteSpace: 'nowrap' }}> 
                                    <IconButton className='btn-edit' color='success' onClick={() => abrirModalEditar(cita)}>
                                        <EditIcon />
                                    </IconButton>

                                    <IconButton className='btn-delete btn-sm ms-2' color="warning" onClick={() => abrirModalEliminar(cita)}>
                                        <DeleteIcon />
                                    </IconButton>

                                </td>
                                {/* <td>
                                    <Link to="/criteriosProcess" state={{ audit: audit}}>{audit.estado}</Link>
                                </td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
                {showDeleteModal && (
                    <div className="modal fade show d-block cita-modal-backdrop" tabIndex="-1">
                        <div className="modal-dialog modal-dialog-centered">
                        <div className="modal-content cita-modal-content">

                            <div className="modal-header cita-modal-header danger">
                            <h5 className="modal-title">Eliminar cita</h5>
                            <button className="btn-close" onClick={() => setShowDeleteModal(false)}></button>
                            </div>

                            <div className="modal-body cita-modal-body">
                            <div className="delete-cita-icon">⚠️</div>
                            <p className="delete-cita-texto">
                                Esta acción es permanente y no se puede deshacer.
                                ¿Seguro que deseas eliminar esta cita?
                            </p>
                            <div className="delete-cita-resumen">
                                <div><span>Paciente</span><strong>{citaSeleccionada?.nombre}</strong></div>
                                <div><span>Documento</span><strong>{citaSeleccionada?.documento}</strong></div>
                                <div>
                                <span>Fecha y hora</span>
                                <strong>
                                    {citaSeleccionada?.fecha
                                    ? `${citaSeleccionada.fecha} · ${citaSeleccionada.hora?.substring(0, 5) ?? ''}`
                                    : 'Sin asignar'}
                                </strong>
                                </div>
                                <div>
                                <span>Médico</span>
                                <strong>{citaSeleccionada?.id_medico ? `#${citaSeleccionada.id_medico}` : 'Sin asignar'}</strong>
                                </div>
                            </div>
                            </div>

                            <div className="modal-footer cita-modal-footer">
                            <button className="btn-cita-cancelar" onClick={() => setShowDeleteModal(false)}>
                                Cancelar
                            </button>
                            <button className="btn-cita-eliminar" onClick={confirmarEliminar}>
                                Sí, eliminar
                            </button>
                            </div>

                        </div>
                        </div>
                    </div>
                )}
                {/* Modal de edición */}
                {showEditModal && citaSeleccionada && (
                <EditCitaModal
                    cita={citaSeleccionada}
                    onClose={() => setShowEditModal(false)}
                    onGuardado={recargarCitas}
                />
                )}
                {/* Modal de nueva cita */}
                {showNuevaCita && (
                <NuevaCitaModal
                    show={showNuevaCita}
                    onClose={() => setShowNuevaCita(false)}
                    onCreated={recargarCitas}
                />
                )}
            </div>
        </div>
    );
};

export default Dashboard;

// import React, { useEffect, useState } from 'react';
// import './DashboardStyles.css';
// import { listaCitas, deleteCita } from '../../services/CitasService';
// import 'bootstrap/dist/css/bootstrap.min.css';

// const Dashboard = () => {

//     const [citas, setCitas] = useState([]);
//     const [busqueda, setBusqueda] = useState('');
//     const [estadoFiltro, setEstadoFiltro] = useState('');
//     const [citaSeleccionada, setCitaSeleccionada] = useState(null);
//     const [showDeleteModal, setShowDeleteModal] = useState(false);

//     useEffect(() => {
//         listaCitas()
//             .then(res => setCitas(res.data))
//             .catch(err => console.error(err));
//     }, []);

//     // 🔍 FILTRADO
//     const citasFiltradas = citas.filter(cita => {
//         return (
//             (cita.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
//              cita.documento.includes(busqueda)) &&
//             (estadoFiltro === '' || cita.estado === estadoFiltro)
//         );
//     });

//     function abrirModalEliminar(cita) {
//         setCitaSeleccionada(cita);
//         setShowDeleteModal(true);
//     }

//     function confirmarEliminar() {
//         deleteCita(citaSeleccionada.id)
//             .then(() => {
//                 setCitas(citas.filter(c => c.id !== citaSeleccionada.id));
//                 setShowDeleteModal(false);
//             });
//     }

//     return (
//         <div className="dashboard-container">

//             <h2 className="title">Panel de Citas</h2>

//             {/* 🔍 FILTROS */}
//             <div className="filters">

//                 <input
//                     type="text"
//                     placeholder="Buscar por nombre o documento..."
//                     className="form-control"
//                     value={busqueda}
//                     onChange={(e) => setBusqueda(e.target.value)}
//                 />

//                 <select
//                     className="form-select"
//                     value={estadoFiltro}
//                     onChange={(e) => setEstadoFiltro(e.target.value)}
//                 >
//                     <option value="">Todos los estados</option>
//                     <option value="Pendiente">Pendiente</option>
//                     <option value="Confirmada">Confirmada</option>
//                     <option value="Cancelada">Cancelada</option>
//                 </select>

//             </div>

//             {/* 📊 TABLA */}
//             <div className="table-responsive">
//                 <table className="table table-hover table-bordered">

//                     <thead>
//                         <tr>
//                             <th>Documento</th>
//                             <th>Nombre</th>
//                             <th>Fecha</th>
//                             <th>Hora</th>
//                             <th>Estado</th>
//                             <th>Acciones</th>
//                         </tr>
//                     </thead>

//                     <tbody>
//                         {citasFiltradas.map((cita, index) => (
//                             <tr key={index}>
//                                 <td>{cita.documento}</td>
//                                 <td>{cita.nombre}</td>
//                                 <td>{cita.fecha}</td>
//                                 <td>{cita.hora}</td>
//                                 <td>
//                                     <span className={`badge ${cita.estado}`}>
//                                         {cita.estado}
//                                     </span>
//                                 </td>
//                                 <td>
//                                     <button className="btn btn-warning btn-sm">Editar</button>
//                                     <button className="btn btn-danger btn-sm ms-2"
//                                         onClick={() => abrirModalEliminar(cita)}>
//                                         Eliminar
//                                     </button>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>

//                 </table>
//             </div>

//             {/* 🧨 MODAL */}
//             {showDeleteModal && (
//                 <div className="modal fade show d-block">
//                     <div className="modal-dialog">
//                         <div className="modal-content">

//                             <div className="modal-header">
//                                 <h5>Confirmar eliminación</h5>
//                                 <button className="btn-close"
//                                     onClick={() => setShowDeleteModal(false)}></button>
//                             </div>

//                             <div className="modal-body">
//                                 ¿Eliminar cita de <strong>{citaSeleccionada?.nombre}</strong>?
//                             </div>

//                             <div className="modal-footer">
//                                 <button className="btn btn-secondary"
//                                     onClick={() => setShowDeleteModal(false)}>
//                                     Cancelar
//                                 </button>

//                                 <button className="btn btn-danger"
//                                     onClick={confirmarEliminar}>
//                                     Confirmar
//                                 </button>
//                             </div>

//                         </div>
//                     </div>
//                 </div>
//             )}

//         </div>
//     );
// };

// export default Dashboard;