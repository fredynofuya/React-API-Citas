// import React, { useEffect, useState } from 'react';
// import { listaPacientes } from '../services/CitasService';
// //import NuevoPacienteModal from '../components/Paciente/NuevoPacienteModal';
// import '../components/Dashboard/DashboardStyles.css';

// const Pacientes = () => {
//   const [pacientes, setPacientes] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   const cargar = () => {
//     listaPacientes()
//       .then(res => setPacientes(res.data))
//       .catch(err => console.error('Error cargando pacientes:', err));
//   };

//   useEffect(() => {
//     document.title = 'Pacientes';
//     cargar();
//   }, []);

//   return (
//     <div className="TitleList table-responsive-custom">
//       <div className="Add">
//         <button className="btn-paciente-guardar" onClick={() => setShowModal(true)}>
//           + Nuevo paciente
//         </button>
//       </div>
//       <h1>Pacientes</h1>

//       <table className="table table-striped table-bordered">
//         <thead>
//           <tr><th>Documento</th><th>Nombre</th><th>Correo</th><th>Teléfono</th><th>EPS</th></tr>
//         </thead>
//         <tbody>
//           {pacientes.map((p) => (
//             <tr key={p.id}>
//               <td>{p.documento}</td>
//               <td>{p.nombre}</td>
//               <td>{p.email}</td>
//               <td>{p.telefono}</td>
//               <td>{p.eps}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* <NuevoPacienteModal
//         show={showModal}
//         onClose={() => setShowModal(false)}
//         onCreated={cargar}
//       />  */}
//     </div>
//   );
// };

// export default Pacientes;