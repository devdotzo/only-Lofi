import React, { useEffect } from "react";
import { X } from "lucide-react";

export interface ToastMessage {
  id: string;
  type: "success" | "error" | "info";
  message: string;
}

interface ToastProps {
  toast: ToastMessage;
  onClose: (id: string) => void;
  accentColor: string;
}

export const Toast: React.FC<ToastProps> = ({
  toast,
  onClose,
  accentColor,
}) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(toast.id);
    }, 3500);

    return () => clearTimeout(timer);
  }, [toast.id, onClose]);

  return (
    <div
      className="group relative flex items-start gap-2 sm:gap-3 p-2.5 sm:p-3 bg-white/95 backdrop-blur border-l-2 shadow-sm hover:shadow-md transition-all duration-200"
      style={{
        borderLeftColor: accentColor,
        borderTopWidth: "1px",
        borderRightWidth: "1px",
        borderBottomWidth: "1px",
        borderColor: "rgba(0,0,0,0.08)",
      }}
    >
      <div className="flex-1 min-w-0">
        <p
          className="text-xs sm:text-sm leading-relaxed break-words"
          style={{ color: "#2d1f1a" }}
        >
          {toast.message}
        </p>
      </div>
      <button
        onClick={() => onClose(toast.id)}
        className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-gray-600"
      >
        <X size={14} />
      </button>
    </div>
  );
};

interface ToastContainerProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
  accentColor: string;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
  accentColor,
}) => {
  return (
    <div className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 flex flex-col gap-2 max-w-[calc(100vw-32px)] sm:max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto animate-slide-in-right"
        >
          <Toast toast={toast} onClose={onClose} accentColor={accentColor} />
        </div>
      ))}
    </div>
  );
};
