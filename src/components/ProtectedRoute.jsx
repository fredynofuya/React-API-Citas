import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { rutaInicial } from '../utils/permisos';

// Sin `permiso`: solo exige sesión. Con `permiso`: además exige ese permiso
// y, si falta, redirige a la primera pantalla que el rol sí puede ver.
const ProtectedRoute = ({ children, permiso }) => {
  const { usuario, cargando, puede } = useAuth();

  if (cargando) return null;
  if (!usuario) return <Navigate to="/signin" replace />;
  if (permiso && !puede(permiso)) return <Navigate to={rutaInicial(usuario.rol)} replace />;

  return children;
};

export const RedirectInicio = () => {
  const { usuario } = useAuth();
  return <Navigate to={rutaInicial(usuario?.rol)} replace />;
};

export default ProtectedRoute;