import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  login as loginRequest,
  obtenerUsuarioActual,
  guardarSesion,
  cerrarSesion,
  hayTokenGuardado,
} from '../services/AuthService';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    if (!hayTokenGuardado()) {
      setCargando(false);
      return;
    }
    // Valida el token contra el backend al recargar la página,
    // en vez de confiar ciegamente en lo que quedó en localStorage.
    obtenerUsuarioActual()
      .then((res) => setUsuario(res.data))
      .catch(() => cerrarSesion())
      .finally(() => setCargando(false));
  }, []);

  const login = async (email, password) => {
    const res = await loginRequest(email, password);
    guardarSesion(res.data);
    setUsuario(res.data);
    return res.data;
  };

  const logout = () => {
    cerrarSesion();
    setUsuario(null);
  };

  return (
    <AuthContext.Provider value={{ usuario, cargando, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);