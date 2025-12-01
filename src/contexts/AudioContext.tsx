import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Howl } from "howler";
import { environments } from "../data/environments";

interface AudioState {
  [soundId: string]: {
    volume: number;
    pan: number;
    playing: boolean;
    muted: boolean;
  };
}

interface AudioContextType {
  audioState: AudioState;
  masterVolume: number;
  togglePlay: (soundId: string) => void;
  setVolume: (soundId: string, volume: number) => void;
  setPan: (soundId: string, pan: number) => void;
  toggleMute: (soundId: string) => void;
  setMasterVolume: (volume: number) => void;
  stopAll: () => void;
}

const AudioContext = createContext<AudioContextType | undefined>(undefined);

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error("useAudio must be used within an AudioProvider");
  }
  return context;
};

export const AudioProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [audioState, setAudioState] = useState<AudioState>({});
  const [masterVolume, setMasterVolume] = useState(1);
  const howlsRef = useRef<{ [key: string]: Howl }>({});

  // Initialize sounds
  useEffect(() => {
    environments.forEach((env) => {
      env.sounds.forEach((sound) => {
        if (!howlsRef.current[sound.id]) {
          howlsRef.current[sound.id] = new Howl({
            src: [sound.file],
            loop: true,
            volume: sound.defaultVolume * masterVolume,
            html5: true, // Use HTML5 Audio for streaming large files
            preload: false, // Lazy load
          });

          // Initialize state
          setAudioState((prev) => ({
            ...prev,
            [sound.id]: {
              volume: sound.defaultVolume,
              pan: sound.defaultPan,
              playing: false,
              muted: false,
            },
          }));
        }
      });
    });

    return () => {
      // Cleanup
      Object.values(howlsRef.current).forEach((howl) => howl.unload());
    };
  }, []);

  // Update master volume
  useEffect(() => {
    Howler.volume(masterVolume);
  }, [masterVolume]);

  const togglePlay = (soundId: string) => {
    const howl = howlsRef.current[soundId];
    if (!howl) return;

    setAudioState((prev) => {
      const newState = { ...prev };
      const isPlaying = newState[soundId]?.playing;

      if (isPlaying) {
        howl.pause();
        newState[soundId] = { ...newState[soundId], playing: false };
      } else {
        // Load if not loaded
        if (howl.state() === "unloaded") {
          howl.load();
        }
        howl.play();
        howl.fade(0, newState[soundId].volume, 1000); // Fade in
        newState[soundId] = { ...newState[soundId], playing: true };
      }
      return newState;
    });
  };

  const setVolume = (soundId: string, volume: number) => {
    const howl = howlsRef.current[soundId];
    if (howl) {
      howl.volume(volume);
    }
    setAudioState((prev) => ({
      ...prev,
      [soundId]: { ...prev[soundId], volume },
    }));
  };

  const setPan = (soundId: string, pan: number) => {
    const howl = howlsRef.current[soundId];
    if (howl) {
      howl.stereo(pan);
    }
    setAudioState((prev) => ({
      ...prev,
      [soundId]: { ...prev[soundId], pan },
    }));
  };

  const toggleMute = (soundId: string) => {
    const howl = howlsRef.current[soundId];
    if (howl) {
      const isMuted = audioState[soundId]?.muted;
      howl.mute(!isMuted);
      setAudioState((prev) => ({
        ...prev,
        [soundId]: { ...prev[soundId], muted: !isMuted },
      }));
    }
  };

  const stopAll = () => {
    Object.values(howlsRef.current).forEach((howl) => howl.stop());
    setAudioState((prev) => {
      const newState = { ...prev };
      Object.keys(newState).forEach((key) => {
        newState[key].playing = false;
      });
      return newState;
    });
  };

  return (
    <AudioContext.Provider
      value={{
        audioState,
        masterVolume,
        togglePlay,
        setVolume,
        setPan,
        toggleMute,
        setMasterVolume,
        stopAll,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};
