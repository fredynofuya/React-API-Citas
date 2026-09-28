import { Outlet, NavLink } from 'react-router-dom';
import './AdminLayoutStyles.css';

const AdminLayout = () => (
  <div className="admin-app">
    <aside className="admin-sidebar">
      {/* <div className="brand">Med<span>Soft</span>IA</div> */}
      <NavLink to="/dashboard/citas" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`}>
        📅 Citas
      </NavLink>
      <NavLink to="/dashboard/agenda" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`}>
        🗓️ Agenda confirmada
      </NavLink>
      <NavLink to="/dashboard/pacientes" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`}>
        🧑‍⚕️ Pacientes
      </NavLink>
      <NavLink to="/dashboard/medicos" className={({isActive}) => `admin-nav-item ${isActive ? 'active' : ''}`}>
        🩺 Médicos
      </NavLink>
    </aside>
    <main className="admin-content">
      <Outlet />
    </main>
  </div>
);

export default AdminLayout;