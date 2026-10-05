import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import PeopleIcon from '@mui/icons-material/People';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import LogoutIcon from '@mui/icons-material/Logout';

import { useAuth } from '../context/AuthContext';

import './AdminLayoutStyles.css';

const NAV_ITEMS = [
  { to: '/dashboard/citas', label: 'Citas', icon: CalendarMonthIcon },
  { to: '/dashboard/agenda', label: 'Agenda confirmada', icon: EventAvailableIcon },
  { to: '/dashboard/pacientes', label: 'Pacientes', icon: PeopleIcon },
  { to: '/dashboard/medicos', label: 'Médicos', icon: LocalHospitalIcon },
];

const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();
  const { usuario, logout } = useAuth();

  const cerrarMobile = () => setMobileOpen(false);

  const handleLogout = () => {
    logout();
    navigate('/signin');
  };

  const inicial =
    usuario?.nombre?.trim()?.charAt(0)?.toUpperCase() || '?';

  return (
    <div className="admin-app">
      {mobileOpen && (
        <div
          className="admin-backdrop"
          onClick={cerrarMobile}
        />
      )}

      <aside
        className={`admin-sidebar ${collapsed ? 'collapsed' : ''} ${
          mobileOpen ? 'mobile-open' : ''
        }`}
      >
        <div className="admin-sidebar-header">
          <div className="brand">
            Med<span>Soft</span>IA
          </div>

          <button
            className="admin-collapse-btn"
            onClick={() => setCollapsed((c) => !c)}
            aria-label={collapsed ? 'Expandir menú' : 'Colapsar menú'}
            title={collapsed ? 'Expandir menú' : 'Colapsar menú'}
          >
            {collapsed ? (
              <ChevronRightIcon fontSize="small" />
            ) : (
              <ChevronLeftIcon fontSize="small" />
            )}
          </button>

          <button
            className="admin-close-btn"
            onClick={cerrarMobile}
            aria-label="Cerrar menú"
          >
            <CloseIcon fontSize="small" />
          </button>
        </div>

        <nav className="admin-nav">
          {NAV_ITEMS.map(({ to, label, icon: Icon }) => (
            <NavLink
              key={to}
              to={to}
              onClick={cerrarMobile}
              title={label}
              className={({ isActive }) =>
                `admin-nav-item ${isActive ? 'active' : ''}`
              }
            >
              <Icon fontSize="small" />
              <span className="admin-nav-label">{label}</span>
            </NavLink>
          ))}
        </nav>

        <div className="admin-sidebar-footer">
          <div className="admin-user">
            <div className="admin-user-avatar">
              {inicial}
            </div>

            <div className="admin-user-info">
              <span className="admin-user-name">
                {usuario?.nombre || 'Usuario'}
              </span>

              <span className="admin-user-role">
                {usuario?.rol === 'ADMIN' ? 'Administrador' : 'Médico'}
              </span>
            </div>
          </div>

          <button
            className="admin-logout"
            onClick={handleLogout}
            title="Cerrar sesión"
            aria-label="Cerrar sesión"
          >
            <LogoutIcon fontSize="small" />
          </button>
        </div>
      </aside>

      <div className="admin-main">
        <header className="admin-topbar">
          <button
            className="admin-menu-btn"
            onClick={() => setMobileOpen(true)}
            aria-label="Abrir menú"
          >
            <MenuIcon />
          </button>

          <span className="admin-topbar-brand">
            MedSoftIA
          </span>
        </header>

        <main className="admin-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;