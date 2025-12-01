import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SkipForward, SkipBack, Radio } from "lucide-react";
import { LofiStation } from "../data/environments";
import { clsx } from "clsx";

interface LofiStationPlayerProps {
  stations: LofiStation[];
  accentColor: string;
  textColor: string;
}

export const LofiStationPlayer: React.FC<LofiStationPlayerProps> = ({
  stations,
  accentColor,
  textColor,
}) => {
  const [currentStationIndex, setCurrentStationIndex] = useState(0);
  const currentStation = stations[currentStationIndex];

  const nextStation = () => {
    setCurrentStationIndex((prev) => (prev + 1) % stations.length);
  };

  const prevStation = () => {
    setCurrentStationIndex(
      (prev) => (prev - 1 + stations.length) % stations.length
    );
  };

  // Arrow key navigation
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      if (e.key === "ArrowLeft") {
        prevStation();
      } else if (e.key === "ArrowRight") {
        nextStation();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [currentStationIndex]);

  return (
    <div
      className="w-full space-y-3 sm:space-y-4 animate-slide-in-up"
      style={{ animationDelay: "0.1s" }}
    >
      {/* YouTube Player */}
      <div className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl bg-black/20 aspect-video">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStation.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0"
          >
            <iframe
              style={{ borderRadius: "12px" }}
              src={`https://www.youtube.com/embed/${currentStation.youtubeId}?autoplay=1&mute=0&controls=1`}
              width="100%"
              height="100%"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            ></iframe>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Station Info & Controls */}
      <div className="space-y-3 sm:space-y-4">
        {/* Current Station Info */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStation.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="text-center"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Radio
                size={16}
                className="sm:w-[18px] sm:h-[18px]"
                style={{ color: accentColor }}
              />
              <h3
                className="font-semibold text-base sm:text-lg tracking-wide"
                style={{ color: textColor }}
              >
                {currentStation.name}
              </h3>
            </div>
            <p
              className="text-xs sm:text-sm opacity-70 px-4"
              style={{ color: textColor }}
            >
              {currentStation.description}
            </p>
            <p
              className="text-xs sm:text-sm mt-1 opacity-50"
              style={{ color: textColor }}
            >
              {currentStationIndex + 1} of {stations.length} • Use ← → arrow
              keys
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Station Navigation */}
        <div className="flex items-center justify-center gap-3 sm:gap-4">
          <button
            onClick={prevStation}
            className={clsx(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300",
              "bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-95"
            )}
            style={{ color: textColor }}
            title="Previous Station (←)"
          >
            <SkipBack size={18} className="sm:w-5 sm:h-5" />
          </button>

          <button
            onClick={nextStation}
            className={clsx(
              "w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300",
              "bg-white/10 hover:bg-white/20 hover:scale-110 active:scale-95"
            )}
            style={{ color: textColor }}
            title="Next Station (→)"
          >
            <SkipForward size={18} className="sm:w-5 sm:h-5" />
          </button>
        </div>

        {/* Station List */}
        <div className="max-h-40 sm:max-h-48 overflow-y-auto space-y-2 px-1 scrollbar-thin">
          {stations.map((station, index) => (
            <button
              key={station.id}
              onClick={() => setCurrentStationIndex(index)}
              className={clsx(
                "w-full text-left px-3 sm:px-4 py-2 sm:py-3 rounded-lg transition-all duration-200 text-xs sm:text-sm",
                index === currentStationIndex
                  ? "bg-white/20 shadow-md scale-105"
                  : "bg-white/5 hover:bg-white/10 hover:scale-102"
              )}
              style={{ color: textColor }}
            >
              <div className="font-medium flex items-center gap-2">
                {index === currentStationIndex && (
                  <Radio
                    size={12}
                    className="sm:w-[14px] sm:h-[14px]"
                    style={{ color: accentColor }}
                  />
                )}
                {station.name}
              </div>
              <div className="text-xs opacity-60 mt-0.5 sm:mt-1">
                {station.description}
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
