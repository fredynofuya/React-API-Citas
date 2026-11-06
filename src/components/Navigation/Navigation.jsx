import {Link} from 'react-router-dom';
import logoin from '../../assets/logo-login.png';
import logo from '../../assets/logo.png';

import './NavigationStyles.css';

const Navigation = () => {
   return (
    <nav className='barraNavegacion'>
        <div className='Navigation'>
          <div className="si-brand-header-nav">
            <div className="si-brand-logo">
              <img src={logo} alt="MedSoftIA" />
            </div>
            <Link to='/home' className="brand-link">
              <div className="brand-logo">
                <span className="brand-text brand-primary">Med</span>
                <span className="brand-text brand-accent">Soft</span>
                <span className="brand-text brand-primary">IA</span>
              </div>
              <div className="brand-tagline">Tu salud, nuestra prioridad</div>
            </Link>
          </div>

          <ul className='navbar'>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/home'>
                Home
              </Link>
            </li>
         
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/servicio'>
                Servicios
              </Link>
            </li>
            
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/contacto'>
                Contáctanos
              </Link>
            </li>
            <li className='nav-item nav-item-cta'>
              <Link to='/solicitudcita' className='btn-cita'>
                <span>Solicitar Cita</span>
              </Link>
            </li>
          </ul>

          <div className='login-icon'>
            <Link className='nav-link login-link' to='/signin' title="Iniciar sesión">
              <img src={logoin} alt="Login" />
            </Link>
          </div>
        </div>
    </nav>
  );
};

export default Navigation;