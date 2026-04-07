import React, { useState } from "react";
import '../styles/SignInStyles.css';
import { useEffect } from 'react';

const SignIn = () => {
  useEffect(() => {
          document.title = 'SignIn';
        }, []);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h1>Iniciar Sesión</h1>
        <p className="subtitle">
          Ingresa tus datos para acceder al sistema CitaYa
        </p>

        <form className="login-form" onSubmit={handleSubmit}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              placeholder="Correo Electrónico *"
              onChange={handleChange}
            />
          </div>

          <div className="input-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña *"
              onChange={handleChange}
            />
          </div>

          <button className="btn-signin" type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default SignIn;