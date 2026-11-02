import './FooterStyles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faPhone, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        {/* Sección de Marca */}
        <div className='footer-section'>
          <div className='footer-brand'>
            <span className='footer-brand-text footer-brand-primary'>Med</span>
            <span className='footer-brand-text footer-brand-accent'>Soft</span>
            <span className='footer-brand-text footer-brand-primary'>IA</span>
          </div>
          <p className='footer-description'>
            Tu plataforma confiable para gestionar citas médicas de forma rápida, 
            segura y eficiente. Conectando pacientes con profesionales de la salud.
          </p>
          <div className='social-section'>
            <div className='social-title'>Síguenos</div>
            <div className='icons'>
              <a href='https://facebook.com' target='_blank' rel='noopener noreferrer' aria-label='Facebook'>
                <FontAwesomeIcon icon={faFacebook} />
              </a>
              <a href='https://instagram.com' target='_blank' rel='noopener noreferrer' aria-label='Instagram'>
                <FontAwesomeIcon icon={faInstagram} />
              </a>
              <a href='https://linkedin.com' target='_blank' rel='noopener noreferrer' aria-label='LinkedIn'>
                <FontAwesomeIcon icon={faLinkedin} />
              </a>
              <a href='https://twitter.com' target='_blank' rel='noopener noreferrer' aria-label='Twitter'>
                <FontAwesomeIcon icon={faTwitter} />
              </a>
            </div>
          </div>
        </div>

        {/* Sección de Información */}
        <div className='footer-section'>
          <h4>Información</h4>
          <ul>
            <li><a href='/home'>Sobre nosotros</a></li>
            <li><a href='/servicio'>Nuestros servicios</a></li>
            <li><a href='#'>Preguntas frecuentes</a></li>
            <li><a href='#'>Términos y condiciones</a></li>
            <li><a href='#'>Política de privacidad</a></li>
          </ul>
        </div>

        {/* Sección de Contacto */}
        <div className='footer-section'>
          <h4>Contáctanos</h4>
          <div className='footer-contact-item'>
            <FontAwesomeIcon icon={faEnvelope} className='footer-contact-icon' />
            <p>info@medsoftia.com</p>
          </div>
          <div className='footer-contact-item'>
            <FontAwesomeIcon icon={faPhone} className='footer-contact-icon' />
            <p>+57 1 234 5678</p>
          </div>
          <div className='footer-contact-item'>
            <FontAwesomeIcon icon={faMapMarkerAlt} className='footer-contact-icon' />
            <p>Bogotá, Colombia</p>
          </div>
        </div>
      </div>

      <div className='footer-bottom'>
        <p>&copy; 2026 MedSoftIA. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
