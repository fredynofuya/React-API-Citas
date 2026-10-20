import React, { useState } from 'react';
import { solicitarRecuperacion } from '../../services/AuthService';
import '../Paciente/NuevoPacienteStyles.css';

const RecuperarPasswordModal = ({ onClose }) => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Ingresa un correo válido');
      return;
    }

    setEnviando(true);
    setError(null);
    try {
      await solicitarRecuperacion(email.trim());
      setEnviado(true); // mismo mensaje exista o no la cuenta
    } catch (err) {
      console.error('Error solicitando recuperación:', err);
      setError(err.response
        ? 'No pudimos procesar la solicitud. Intenta de nuevo.'
        : 'No se pudo comunicar con el servidor. Revisa que esté activo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="modal fade show d-block paciente-modal-backdrop" tabIndex="-1">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content paciente-modal-content">

          <div className="modal-header paciente-modal-header">
            <h5 className="modal-title">Recuperar contraseña</h5>
            <button className="btn-close btn-close-white" onClick={onClose}></button>
          </div>

          {enviado ? (
            <>
              <div className="modal-body paciente-modal-body">
                <div className="alerta-paciente exito">
                  Si el correo está registrado, te enviamos un enlace para crear una nueva contraseña.
                  Vence en 30 minutos. Revisa también la carpeta de spam.
                </div>
              </div>
              <div className="modal-footer paciente-modal-footer">
                <button type="button" className="btn-paciente-guardar" onClick={onClose}>Entendido</button>
              </div>
            </>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="modal-body paciente-modal-body">
                <p style={{ fontSize: 14, color: '#555', marginBottom: 16 }}>
                  Escribe el correo de tu cuenta y te enviaremos un enlace para crear una nueva contraseña.
                </p>
                {error && <div className="alerta-paciente error">{error}</div>}
                <div className="input-group-paciente">
                  <label>Correo electrónico *</label>
                  <input type="email" value={email} autoFocus
                    onChange={(e) => { setEmail(e.target.value); setError(null); }} />
                </div>
              </div>
              <div className="modal-footer paciente-modal-footer">
                <button type="button" className="btn-paciente-cancelar" onClick={onClose} disabled={enviando}>Cancelar</button>
                <button type="submit" className="btn-paciente-guardar" disabled={enviando}>
                  {enviando ? 'Enviando...' : 'Enviar enlace'}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};

export default RecuperarPasswordModal;