import React from "react";
import { useDraggable } from "../hooks/useDraggable";

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  bgColor: string;
  showPanControls: boolean;
  setShowPanControls: (value: boolean) => void;
  savePreferences: boolean;
  setSavePreferences: (value: boolean) => void;
  showParticles: boolean;
  setShowParticles: (value: boolean) => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  accentColor,
  bgColor,
  showPanControls,
  setShowPanControls,
  savePreferences,
  setSavePreferences,
  showParticles,
  setShowParticles,
}) => {
  const { position, isDragging, handleMouseDown } = useDraggable();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
      <div
        className="pointer-events-auto rounded-xl shadow-2xl max-w-md w-full overflow-hidden"
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
            className="text-base sm:text-lg font-serif font-bold absolute left-1/2 -translate-x-1/2 pointer-events-none"
            style={{ color: accentColor }}
          >
            settings
          </h2>

          <div className="w-16"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <div className="space-y-4 sm:space-y-6">
            {/* Show Pan Controls */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <label
                  className="text-sm sm:text-base font-medium cursor-pointer block"
                  style={{ color: accentColor }}
                >
                  Show Pan Controls
                </label>
                <p
                  className="text-xs sm:text-sm opacity-70 mt-1"
                  style={{ color: accentColor }}
                >
                  Display L/R stereo pan controls for audio
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={showPanControls}
                  onChange={(e) => setShowPanControls(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black/40"></div>
              </label>
            </div>

            {/* Show Particles */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <label
                  className="text-sm sm:text-base font-medium cursor-pointer block"
                  style={{ color: accentColor }}
                >
                  Animated Particles
                </label>
                <p
                  className="text-xs sm:text-sm opacity-70 mt-1"
                  style={{ color: accentColor }}
                >
                  Enable floating particle animations
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={showParticles}
                  onChange={(e) => setShowParticles(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black/40"></div>
              </label>
            </div>

            {/* Save Preferences */}
            <div className="flex items-center justify-between gap-3">
              <div className="flex-1 min-w-0">
                <label
                  className="text-sm sm:text-base font-medium cursor-pointer block"
                  style={{ color: accentColor }}
                >
                  Save Preferences
                </label>
                <p
                  className="text-xs sm:text-sm opacity-70 mt-1"
                  style={{ color: accentColor }}
                >
                  Remember your settings for next visit
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer flex-shrink-0">
                <input
                  type="checkbox"
                  checked={savePreferences}
                  onChange={(e) => setSavePreferences(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-11 h-6 bg-black/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-black/40"></div>
              </label>
            </div>

            {/* Keyboard Shortcuts Info */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-black/5 rounded-lg">
              <h3
                className="text-xs sm:text-sm font-bold mb-2"
                style={{ color: accentColor }}
              >
                Keyboard Shortcuts
              </h3>
              <div
                className="text-xs space-y-1 opacity-80"
                style={{ color: accentColor }}
              >
                <div className="flex justify-between items-center">
                  <span>Toggle Pomodoro</span>
                  <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/10 rounded text-xs">
                    P
                  </kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span>Master Mute</span>
                  <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/10 rounded text-xs">
                    M
                  </kbd>
                </div>
                <div className="flex justify-between items-center">
                  <span>Switch Environment</span>
                  <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/10 rounded text-xs">
                    1-3
                  </kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
