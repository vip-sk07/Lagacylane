import React from 'react';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export default function ToastContainer({ toasts = [], onDismiss }) {
  if (!toasts || toasts.length === 0) return null;

  return (
    <div className="fixed top-5 right-5 z-[9999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      {toasts.map((toast) => (
        <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
      ))}
    </div>
  );
}

function ToastItem({ toast, onDismiss }) {
  const isError = toast.type === 'error';
  const isWarning = toast.type === 'warning';
  const isSuccess = toast.type === 'success';

  const borderColor = isError
    ? 'border-rose-500/50 shadow-rose-950/40'
    : isWarning
    ? 'border-amber-500/50 shadow-amber-950/40'
    : isSuccess
    ? 'border-emerald-500/50 shadow-emerald-950/40'
    : 'border-cyan-500/50 shadow-cyan-950/40';

  const iconColor = isError
    ? 'text-rose-400'
    : isWarning
    ? 'text-amber-400'
    : isSuccess
    ? 'text-emerald-400'
    : 'text-cyan-400';

  return (
    <div
      className={`pointer-events-auto w-full glass-panel rounded-2xl p-4 border ${borderColor} shadow-2xl backdrop-blur-xl flex items-start gap-3 transition-all duration-300 animate-slideIn`}
    >
      <div className={`mt-0.5 shrink-0 ${iconColor}`}>
        {isError && <AlertTriangle className="w-5 h-5" />}
        {isWarning && <AlertCircle className="w-5 h-5" />}
        {isSuccess && <CheckCircle2 className="w-5 h-5" />}
        {!isError && !isWarning && !isSuccess && <Info className="w-5 h-5" />}
      </div>

      <div className="flex-1 min-w-0">
        {toast.title && (
          <h5 className="text-xs font-black text-white leading-tight mb-0.5">
            {toast.title}
          </h5>
        )}
        <p className="text-xs text-slate-300 leading-relaxed font-normal">
          {toast.message}
        </p>
      </div>

      <button
        onClick={() => onDismiss && onDismiss(toast.id)}
        className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors shrink-0"
      >
        <X className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}
