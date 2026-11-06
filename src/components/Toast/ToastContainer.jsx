import React from 'react';
import './ToastStyles.css';
import { useToast } from '../../context/ToastContext';

const ICONS = {
  success: '✓',
  error:   '✕',
  warning: '⚠',
  info:    'ℹ',
};

const ToastContainer = () => {
  const { toasts, dismiss } = useToast();

  if (!toasts.length) return null;

  return (
    <div className="toast-container" role="region" aria-live="polite" aria-label="Notificaciones">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`toast-item toast-item--${t.type}`}
          role="alert"
        >
          <span className="toast-icon">{ICONS[t.type]}</span>
          <span className="toast-message">{t.message}</span>
          <button
            className="toast-close"
            onClick={() => dismiss(t.id)}
            aria-label="Cerrar notificación"
          >
            ×
          </button>
        </div>
      ))}
    </div>
  );
};

export default ToastContainer;
