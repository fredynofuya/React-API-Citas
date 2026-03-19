import {Link} from 'react-router-dom';
import logo from '../../assets/logo-login.png';

import './NavigationStyles.css';

const Navigation = () => {
   return (
    <nav className='barraNavegacion'>
        <div className= 'Navigation'>
          <ul className="title">
            <ul className="u">
              <li className="li">
                <h1 className="navega-care">Tu</h1>
                <h1 className="navega-Med">Cita</h1>
                <h1 className="navega-care">Ya</h1>
              </li>
              <li className="li">
                <h2 className="navega-Antioq"> </h2>
              </li>
            </ul>
          </ul>
          <ul className='navbar'>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/home'>
                Home
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/home'>
                ¿Quiénes Somos?
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/home'>
                Servicios
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/home'>
                Directorio Médico
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/home'>
                Contactanos
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/home'>
                Informes
              </Link>
            </li>
            <li className='nav-item'>
              <Link className='nav-link' aria-current='page' to='/solicitudcita'>
                SOLICITAR UNA CITA
              </Link>
            </li>
          </ul>
          <div className='login-icon'>
            <Link className='nav-link login-link' to='/signin'>
              <img src={logo} />
            </Link>
          </div>
        </div>
    </nav>
  );
};

export default Navigation;