import React, { useState, useEffect } from "react";
import { useDraggable } from "../hooks/useDraggable";

interface PomodoroTimerProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  bgColor: string;
  onComplete?: () => void;
}

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  isOpen,
  onClose,
  accentColor,
  bgColor,
  onComplete,
}) => {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [initialMinutes, setInitialMinutes] = useState(25);
  const { position, isDragging, handleMouseDown } = useDraggable();

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            setIsRunning(false);
            // Play chime sound
            const audio = new Audio(
              "data:audio/wav;base64,UklGRnoGAABXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YQoGAACBhYqFbF1fdJivrJBhNjVgodDbq2EcBj+a2/LDciUFLIHO8tiJNwgZaLvt559NEAxQp+PwtmMcBjiR1/LMeSwFJHfH8N2QQAoUXrTp66hVFApGn+DyvmwhBj6U2fPTgTYGHm7A7+OZQQ0RVK3n7qpTEw1Pq+bt"
            );
            audio.play().catch(() => {});
            // Call onComplete callback to pause all sounds
            if (onComplete) {
              onComplete();
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, minutes, seconds, onComplete]);

  const handleStart = () => {
    setIsRunning(true);
  };

  const handleReset = () => {
    setIsRunning(false);
    setMinutes(initialMinutes);
    setSeconds(0);
  };

  const handleMinutesChange = (value: number) => {
    setInitialMinutes(value);
    setMinutes(value);
    setSeconds(0);
    setIsRunning(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
      <div
        className="pointer-events-auto rounded-xl shadow-2xl max-w-xs w-full overflow-hidden"
        style={{
          backgroundColor: bgColor,
          transform: `translate(${position.x}px, ${position.y}px)`,
          cursor: isDragging ? "grabbing" : "default",
        }}
      >
        {/* macOS-style window header */}
        <div
          onMouseDown={handleMouseDown}
          className="px-3 sm:px-4 py-2.5 sm:py-3 border-b border-black/10 flex items-center justify-between cursor-grab active:cursor-grabbing select-none"
          style={{ backgroundColor: bgColor }}
        >
          {/* macOS traffic lights */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onClose}
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
              title="Close"
            />
            <button
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
              title="Minimize"
            />
            <button
              className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
              title="Maximize"
            />
          </div>

          <h2
            className="text-sm sm:text-base font-serif font-bold absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ color: accentColor }}
          >
            pomodoro
          </h2>

          <div className="w-16"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-5">
          <div className="flex items-center justify-center gap-2 mb-3 sm:mb-4">
            <input
              type="number"
              min="1"
              max="60"
              value={initialMinutes}
              onChange={(e) =>
                handleMinutesChange(parseInt(e.target.value) || 25)
              }
              className="w-14 sm:w-16 text-center text-base sm:text-lg font-bold py-1 sm:py-1.5 px-1.5 sm:px-2 rounded border border-black/20"
              style={{ color: accentColor }}
              disabled={isRunning}
            />
            <span
              className="text-xs sm:text-sm opacity-70"
              style={{ color: accentColor }}
            >
              min
            </span>
          </div>

          <div className="text-center mb-4 sm:mb-5">
            <div
              className="text-4xl sm:text-5xl font-bold font-mono tracking-tight"
              style={{ color: accentColor }}
            >
              {String(minutes).padStart(2, "0")}:
              {String(seconds).padStart(2, "0")}
            </div>
          </div>

          <button
            onClick={isRunning ? handleReset : handleStart}
            className="w-full py-2 sm:py-2.5 px-4 sm:px-5 rounded-lg font-semibold text-white transition-all hover:opacity-90 text-xs sm:text-sm"
            style={{ backgroundColor: accentColor }}
          >
            {isRunning ? "reset" : "start"}
          </button>

          <p
            className="text-xs text-center mt-3 sm:mt-4 leading-relaxed opacity-70 px-2"
            style={{ color: accentColor }}
          >
            Focus for the set time. A chime will play and sounds will pause when
            complete.
          </p>
        </div>
      </div>
    </div>
  );
};
