import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SolicitudCita from './pages/SolicitudCita.jsx';
import Home from './pages/Home.jsx';
import Navbar from './components/Navigation/Navigation.jsx';
import Footer from './components/Footer/Footer.jsx';
import SignIn from './pages/SignIn.jsx';
import Dashboard from './components/Dashboard/Dashboard.jsx'; 
import Contacto from './pages/Contacto.jsx'; 
import './styles/AppStyles.css';

function App() {
  return (
    <BrowserRouter>
    <div className='app-wrapper'>
    <Navbar />
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/home' element={<Home />} />
      <Route path='/contacto' element={<Contacto />} />
      <Route path='/solicitudcita' element={<SolicitudCita />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/dashboard' element={<Dashboard />} />
    </Routes>

    <Footer />
  </div>
</BrowserRouter>
  );
}

export default App;
