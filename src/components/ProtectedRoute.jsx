import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { usuario, cargando } = useAuth();

  if (cargando) return null; // evita un parpadeo a /signin mientras valida el token
  if (!usuario) return <Navigate to="/signin" replace />;

  return children;
};

export default ProtectedRoute;