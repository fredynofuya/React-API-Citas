import React, { createContext, useCallback, useContext, useState } from 'react';

/* ─── contexto ───────────────────────────────────────── */
const ToastContext = createContext(null);

let _nextId = 0;

/* ─── tipos permitidos ───────────────────────────────── */
export const TOAST = {
  SUCCESS: 'success',
  ERROR:   'error',
  WARNING: 'warning',
  INFO:    'info',
};

/* ─── proveedor ──────────────────────────────────────── */
export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const push = useCallback((message, type = TOAST.SUCCESS, duration = 3500) => {
    const id = ++_nextId;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  }, []);

  const dismiss = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ push, dismiss, toasts }}>
      {children}
    </ToastContext.Provider>
  );
};

/* ─── hook de consumo ────────────────────────────────── */
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast debe usarse dentro de <ToastProvider>');
  return ctx;
};
