import './FooterStyles.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <div className='footer-content'>
        <div className='footer-section'>
          <h3>TuCitaYa</h3>
          <p>Tu plataforma de citas médicas confiable</p>
        </div>
        <div className='footer-section'>
          <h4>Información</h4>
          <ul>
            <li><a href='#'>Sobre nosotros</a></li>
            <li><a href='#'>Términos y condiciones</a></li>
            <li><a href='#'>Política de privacidad</a></li>
          </ul>
        </div>
        <div className='footer-section'>
          <h4>Contacto</h4>
          <p>Email: info@tucitaya.com</p>
          <p>Teléfono: +57 1 234 5678</p>
        </div>
      </div>
      <div className='footer-bottom'>
        <p>&copy; 2026 TuCitaYa. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
