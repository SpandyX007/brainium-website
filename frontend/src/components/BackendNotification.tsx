import { useState, useEffect } from 'react';
import { AlertTriangle, X } from 'lucide-react';

interface BackendNotificationProps {
  show: boolean;
  onClose: () => void;
}

export default function BackendNotification({ show, onClose }: BackendNotificationProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (show) {
      setIsVisible(true);
      // Auto-hide after 8 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for fade out animation
      }, 8000);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  if (!show && !isVisible) return null;

  return (
    <div className={`fixed top-4 right-4 z-[80] transition-all duration-300 ${
      isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full'
    }`}>
      <div className="bg-gradient-to-r from-orange-600/90 to-yellow-600/90 backdrop-blur-sm border border-orange-500/50 rounded-xl p-4 shadow-2xl shadow-orange-500/30 max-w-sm">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-6 h-6 text-orange-200 flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-white font-semibold text-sm mb-1">Backend Not Connected</p>
            <p className="text-orange-100 text-xs">
              Registration data may not sync. Contact admin if needed.
            </p>
          </div>
          <button
            onClick={() => {
              setIsVisible(false);
              setTimeout(onClose, 300);
            }}
            className="text-orange-200 hover:text-white transition-colors p-1 hover:bg-orange-500/20 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
