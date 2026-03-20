//import React, { useEffect, useState } from 'react';
import '../styles/DashboardStyles.css';

//import config from '../config'
//import { Link } from 'react-router-dom';

const Dashboard = () => {
    
    // const [userViews, setUserViews] = useState([]);
    // useEffect(() => {
    //     document.title = 'Dashboard';
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${config.backendUrl}/paciente`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUserViews(data);
    //             } else {
    //                 console.error('Error fetching data:', response.statusText);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    // const [userViews1, setUserViews1] = useState([]);
    // useEffect(() => {
    //     document.title = 'Consolidado';
    //     const fetchData = async () => {
    //         try {
    //             const response = await fetch(`${config.backendUrl}/criterios`);
    //             if (response.ok) {
    //                 const data = await response.json();
    //                 setUserViews1(data);
    //             } else {
    //                 console.error('Error fetching data:', response.statusText);
    //             }
    //         } catch (error) {
    //             console.error('Error fetching data:', error);
    //         }
    //     };

    //     fetchData();
    // }, []);

    return (
        <div className="home">
            <div className="TitleList">
                <h1>Citas API-CRUD:</h1>
                <table className="table">
                    <thead className="Thead">
                        <tr>
                            <th>Id</th>
                            <th>Nombre</th>
                            <th>Telefono</th>
                            <th>Estado</th>
                        </tr>
                    </thead>
                    {/* <tbody>
                        {userViews1.map((audit, index) => (
                            <tr key={index}>
                                <td>{audit.titulo}</td>
                                <td>{(new Date(audit.fecha)).toLocaleDateString('es-CO')}</td>
                                <td>{audit.sede}</td>
                                <td>
                                    <Link to="/criteriosProcess" state={{ audit: audit}}>{audit.estado}</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody> */}
                </table>
            </div>
        </div>
    );
};

export default Dashboard;