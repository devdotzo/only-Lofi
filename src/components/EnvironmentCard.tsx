import React from "react";
import { AudioControl } from "./AudioControl";
import { useAudio } from "../contexts/AudioContext";
import { Environment } from "../data/environments";

interface EnvironmentCardProps {
  environment: Environment;
  isActive: boolean;
  showPanControls?: boolean;
}

export const EnvironmentCard: React.FC<EnvironmentCardProps> = ({
  environment,
  isActive,
  showPanControls = true,
}) => {
  const { audioState, togglePlay, setVolume, setPan, toggleMute } = useAudio();

  if (!isActive) return null;

  // If no sounds (like lofi-radio profile), don't show anything
  if (environment.sounds.length === 0) {
    return null;
  }

  return (
    <div className="w-full">
      {environment.sounds.map((sound) => (
        <AudioControl
          key={sound.id}
          soundId={sound.id}
          name={sound.name}
          volume={audioState[sound.id]?.volume ?? sound.defaultVolume}
          pan={audioState[sound.id]?.pan ?? sound.defaultPan}
          isPlaying={audioState[sound.id]?.playing ?? false}
          isMuted={audioState[sound.id]?.muted ?? false}
          onVolumeChange={(val) => setVolume(sound.id, val)}
          onPanChange={(val) => setPan(sound.id, val)}
          onTogglePlay={() => togglePlay(sound.id)}
          onToggleMute={() => toggleMute(sound.id)}
          accentColor={environment.theme.accent}
          showPanControls={showPanControls}
        />
      ))}
    </div>
  );
};
