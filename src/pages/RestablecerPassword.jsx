import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../styles/SignInStyles.css';
import logo from '../assets/logo-login.png';
import { validarTokenRecuperacion, restablecerPassword } from '../services/AuthService';
import { mensajeError } from '../utils/mensajeError';

const RestablecerPassword = () => {
  const [params] = useSearchParams();
  const token = params.get('token');
  const navigate = useNavigate();

  const [estado, setEstado] = useState('validando'); // validando | invalido | formulario | exito
  const [form, setForm] = useState({ nueva: '', confirmar: '' });
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    document.title = 'Restablecer contraseña';
    if (!token) { setEstado('invalido'); return; }
    validarTokenRecuperacion(token)
      .then(() => setEstado('formulario'))
      .catch(() => setEstado('invalido'));
  }, [token]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.nueva.length < 8) { setError('La contraseña debe tener al menos 8 caracteres.'); return; }
    if (form.nueva !== form.confirmar) { setError('Las contraseñas no coinciden.'); return; }

    setEnviando(true);
    setError(null);
    try {
      await restablecerPassword(token, form.nueva);
      setEstado('exito');
    } catch (err) {
      console.error('Error restableciendo la contraseña:', err);
      setError(mensajeError(err, 'No se pudo cambiar la contraseña. Intenta de nuevo.'));
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className="login-icon-in">
          <img src={logo} alt="MedSoftIA" />
        </div>

        {estado === 'validando' && <p className="subtitle">Validando enlace…</p>}

        {estado === 'invalido' && (
          <>
            <p className="login-error">El enlace no es válido o ya venció.</p>
            <p className="subtitle">Solicita uno nuevo desde la pantalla de inicio de sesión.</p>
            <button className="btn-signin" onClick={() => navigate('/signin')}>Ir a iniciar sesión</button>
          </>
        )}

        {estado === 'formulario' && (
          <>
            <p className="subtitle">Crea tu nueva contraseña</p>
            {error && <p className="login-error">{error}</p>}
            <form className="login-form" onSubmit={handleSubmit}>
              <div className="input-group">
                <input type="password" name="nueva" placeholder="Nueva contraseña *"
                  value={form.nueva} onChange={handleChange} autoComplete="new-password" required />
              </div>
              <div className="input-group">
                <input type="password" name="confirmar" placeholder="Confirmar contraseña *"
                  value={form.confirmar} onChange={handleChange} autoComplete="new-password" required />
              </div>
              <button className="btn-signin" type="submit" disabled={enviando}>
                {enviando ? 'Guardando...' : 'Guardar contraseña'}
              </button>
            </form>
          </>
        )}

        {estado === 'exito' && (
          <>
            <p className="login-exito">Contraseña actualizada. Ya puedes iniciar sesión.</p>
            <button className="btn-signin" onClick={() => navigate('/signin')}>Iniciar sesión</button>
          </>
        )}
      </div>
    </div>
  );
};

export default RestablecerPassword;