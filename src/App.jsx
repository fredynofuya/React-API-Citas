import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SolicitudCita from './pages/SolicitudCita.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navigation/Navigation.jsx';
import Footer from './components/Footer/Footer.jsx';
import SignIn from './pages/SignIn.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx';
import Agenda from './components/Agenda/Agenda.jsx';
import Contacto from './pages/Contacto.jsx';
import Servicios from './pages/Servicio.jsx';
import './styles/AppStyles.css';

import AdminLayout from './layouts/AdminLayout.jsx';
import Pacientes from './components/Paciente/Paciente.jsx';
import Medicos from './components/Medico/Medico.jsx';
import ProtectedRoute from './components/ProtectedRoute.jsx';

function AppContent() {
  const { pathname } = useLocation();
  const enDashboard = pathname.startsWith('/dashboard');

  return (
    <div className="app-wrapper">
      {!enDashboard && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/servicio" element={<Servicios />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/solicitudcita" element={<SolicitudCita />} />
        <Route path="/signin" element={<SignIn />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="citas" replace />} />
          <Route path="citas" element={<Dashboard />} />
          <Route path="agenda" element={<Agenda />} />
          <Route path="pacientes" element={<Pacientes />} />
          <Route path="medicos" element={<Medicos />} />
        </Route>
      </Routes>

      {!enDashboard && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;