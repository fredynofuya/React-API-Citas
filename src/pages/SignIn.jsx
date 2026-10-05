// import React, { useState } from "react";
// import '../styles/SignInStyles.css';
// import { useEffect } from 'react';

// import {Link} from 'react-router-dom';
// import logo from '../assets/logo-login.png';

// const SignIn = () => {
//   useEffect(() => {
//           document.title = 'SignIn';
//         }, []);

//   const [form, setForm] = useState({
//     email: "",
//     password: "",
//   });

//   const handleChange = (e) => {
//     setForm({
//       ...form,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log(form);
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-container">
//         <div className='login-icon-in'>
//           <img src={logo} />
//         </div>
//         <p className="subtitle">
//           Ingresa tus datos para iniciar sesión 
//         </p>

//         <form className="login-form" onSubmit={handleSubmit}>
//           <div className="input-group">
//             <input
//               type="email"
//               name="email"
//               placeholder="Correo Electrónico *"
//               onChange={handleChange}
//             />
//           </div>

//           <div className="input-group">
//             <input
//               type="password"
//               name="password"
//               placeholder="Contraseña *"
//               onChange={handleChange}
//             />
//           </div>

//           <button className="btn-signin" type="submit">Ingresar</button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignIn;

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import '../styles/SignInStyles.css';
import logo from '../assets/logo-login.png';
import { useAuth } from '../context/AuthContext';

const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => { document.title = 'SignIn'; }, []);

  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setError(null);
    try {
      await login(form.email, form.password);
      navigate('/dashboard/citas');
    } catch (err) {
      console.error('Error iniciando sesión:', err);
      if (err.response?.status === 401) {
        setError('Correo o contraseña incorrectos.');
      } else {
        setError('No se pudo iniciar sesión. Intenta de nuevo.');
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <div className='login-icon-in'>
          <img src={logo} alt="MedSoftIA" />
        </div>
        <p className="subtitle">Ingresa tus datos para iniciar sesión</p>

        {error && <p className="login-error">{error}</p>}

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email" name="email" placeholder="Correo Electrónico *"
              value={form.email} onChange={handleChange} required
            />
          </div>
          <div className="input-group">
            <input
              type="password" name="password" placeholder="Contraseña *"
              value={form.password} onChange={handleChange} required
            />
          </div>
          <button className="btn-signin" type="submit" disabled={enviando}>
            {enviando ? 'Ingresando...' : 'Ingresar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;