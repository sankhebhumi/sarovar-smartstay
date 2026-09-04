import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

const Toast = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  const bgColors = {
    success: 'bg-emerald-950/90 text-emerald-200 border-emerald-500/40',
    error: 'bg-rose-950/90 text-rose-200 border-rose-500/40',
    info: 'bg-blue-950/90 text-blue-200 border-blue-500/40',
    warning: 'bg-amber-950/90 text-amber-200 border-amber-500/40',
  };

  const Icons = {
    success: CheckCircle2,
    error: AlertCircle,
    info: Info,
    warning: AlertCircle,
  };

  const Icon = Icons[type] || CheckCircle2;

  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-2xl backdrop-blur-md text-xs font-semibold animate-fade-in ${bgColors[type]}`}>
      <Icon size={18} className="shrink-0" />
      <span>{message}</span>
      {onClose && (
        <button onClick={onClose} className="p-1 hover:opacity-75 transition-opacity ml-2">
          <X size={14} />
        </button>
      )}
    </div>
  );
};

export default Toast;
