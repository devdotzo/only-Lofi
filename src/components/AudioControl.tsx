import React from "react";
import { Play, Pause } from "lucide-react";
import { clsx } from "clsx";

interface AudioControlProps {
  soundId: string;
  name: string;
  volume: number;
  pan: number;
  isPlaying: boolean;
  isMuted: boolean;
  onVolumeChange: (val: number) => void;
  onPanChange: (val: number) => void;
  onTogglePlay: () => void;
  onToggleMute: () => void;
  accentColor: string;
  showPanControls?: boolean;
}

export const AudioControl: React.FC<AudioControlProps> = ({
  name,
  volume,
  isPlaying,
  onVolumeChange,
  onTogglePlay,
  accentColor,
  showPanControls = true,
}) => {
  return (
    <div
      className={clsx(
        "flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 py-2 sm:py-2 px-2 sm:px-3 rounded-lg transition-all duration-300",
        isPlaying ? "bg-black/5" : "bg-transparent"
      )}
    >
      {/* Sound Name with playing indicator */}
      <div
        className={clsx(
          "flex items-center gap-2",
          showPanControls ? "sm:min-w-[160px]" : "sm:min-w-[140px]",
          "min-w-[120px]"
        )}
      >
        {/* Playing indicator pulse */}
        {isPlaying && (
          <span className="relative flex h-2 w-2 flex-shrink-0">
            <span
              className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
              style={{ backgroundColor: accentColor }}
            ></span>
            <span
              className="relative inline-flex rounded-full h-2 w-2"
              style={{ backgroundColor: accentColor }}
            ></span>
          </span>
        )}
        <span
          className={clsx(
            "text-sm font-medium transition-all",
            isPlaying && "font-semibold"
          )}
          style={{ color: accentColor }}
        >
          {name}
        </span>
        <button
          onClick={onTogglePlay}
          className={clsx(
            "flex items-center justify-center transition-all flex-shrink-0 hover:scale-110",
            isPlaying ? "opacity-100" : "opacity-60 hover:opacity-100"
          )}
          style={{ color: accentColor }}
        >
          {isPlaying ? (
            <Pause size={14} fill="currentColor" />
          ) : (
            <Play size={14} fill="currentColor" className="ml-0.5" />
          )}
        </button>
      </div>

      {/* Volume Slider with visual feedback */}
      <div className="flex items-center gap-2 flex-1 relative">
        {showPanControls && (
          <span
            className="text-xs font-medium opacity-60"
            style={{ color: accentColor }}
          >
            L
          </span>
        )}
        <div className="flex-1 relative group">
          {/* Volume fill indicator */}
          <div
            className="absolute h-1 rounded-full transition-all duration-150 pointer-events-none"
            style={{
              width: `${volume * 100}%`,
              backgroundColor: accentColor,
              opacity: isPlaying ? 0.3 : 0.1,
            }}
          />
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className="relative w-full h-1 bg-black/20 rounded-full appearance-none cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none
              [&::-webkit-slider-thumb]:w-3.5
              [&::-webkit-slider-thumb]:h-3.5
              [&::-webkit-slider-thumb]:rounded-full
              [&::-webkit-slider-thumb]:bg-black
              [&::-webkit-slider-thumb]:cursor-pointer
              [&::-webkit-slider-thumb]:transition-all
              [&::-webkit-slider-thumb]:shadow-md
              hover:[&::-webkit-slider-thumb]:scale-110
              group-hover:[&::-webkit-slider-thumb]:shadow-lg
              [&::-moz-range-thumb]:w-3.5
              [&::-moz-range-thumb]:h-3.5
              [&::-moz-range-thumb]:rounded-full
              [&::-moz-range-thumb]:bg-black
              [&::-moz-range-thumb]:border-0
              [&::-moz-range-thumb]:cursor-pointer
              [&::-moz-range-thumb]:shadow-md"
          />
          {/* Volume percentage tooltip on hover */}
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="bg-black/80 text-white text-xs py-1 px-2 rounded whitespace-nowrap">
              {Math.round(volume * 100)}%
            </div>
          </div>
        </div>
        {showPanControls && (
          <span
            className="text-xs font-medium opacity-60"
            style={{ color: accentColor }}
          >
            R
          </span>
        )}
      </div>
    </div>
  );
};
