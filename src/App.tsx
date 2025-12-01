import { useState, useEffect } from "react";
import { AudioProvider } from "./contexts/AudioContext";
import { EnvironmentCard } from "./components/EnvironmentCard";
import { PomodoroTimer } from "./components/PomodoroTimer";
import { ThreeBackground } from "./components/ThreeBackground";
import { SettingsModal } from "./components/SettingsModal";
import { FeedbackModal } from "./components/FeedbackModal";
import { ToastContainer, ToastMessage } from "./components/Toast";
import { LofiStationPlayer } from "./components/LofiStationPlayer";
import { environments } from "./data/environments";
import { Volume2, VolumeX, Clock, Settings, MessageSquare } from "lucide-react";
import { useAudio } from "./contexts/AudioContext";
import { clsx } from "clsx";

const AppContent = () => {
  // Load preferences from localStorage
  const loadPreference = <T,>(key: string, defaultValue: T): T => {
    try {
      const saved = localStorage.getItem(key);
      return saved ? JSON.parse(saved) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const [activeEnvId, setActiveEnvId] = useState(() =>
    loadPreference("activeEnvId", environments[0].id)
  );
  const activeEnv =
    environments.find((e) => e.id === activeEnvId) || environments[0];
  const { masterVolume, setMasterVolume, stopAll } = useAudio();
  const [isMuted, setIsMuted] = useState(false);
  const [prevVolume, setPrevVolume] = useState(1);

  // Modal states
  const [isPomodoroOpen, setIsPomodoroOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);

  // Settings states
  const [showPanControls, setShowPanControls] = useState(() =>
    loadPreference("showPanControls", true)
  );
  const [savePreferences, setSavePreferences] = useState(() =>
    loadPreference("savePreferences", false)
  );
  const [showParticles, setShowParticles] = useState(() =>
    loadPreference("showParticles", true)
  );

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Save preferences to localStorage when they change
  useEffect(() => {
    if (savePreferences) {
      localStorage.setItem("activeEnvId", JSON.stringify(activeEnvId));
      localStorage.setItem("showPanControls", JSON.stringify(showPanControls));
      localStorage.setItem("savePreferences", JSON.stringify(savePreferences));
      localStorage.setItem("showParticles", JSON.stringify(showParticles));
    }
  }, [activeEnvId, showPanControls, savePreferences, showParticles]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      ) {
        return;
      }

      switch (e.key.toLowerCase()) {
        case "p":
          setIsPomodoroOpen((prev) => !prev);
          break;
        case "m":
          toggleMasterMute();
          break;
        case "1":
          handleEnvironmentSwitch(environments[0].id);
          break;
        case "2":
          if (environments[1]) handleEnvironmentSwitch(environments[1].id);
          break;
        case "3":
          if (environments[2]) handleEnvironmentSwitch(environments[2].id);
          break;
        case "4":
          if (environments[3]) handleEnvironmentSwitch(environments[3].id);
          break;
        case "s":
          if (e.ctrlKey || e.metaKey) {
            e.preventDefault();
            setIsSettingsOpen(true);
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const addToast = (type: ToastMessage["type"], message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => {
      const newToasts = [...prev, { id, type, message }];
      // Keep only the last 2 toasts
      if (newToasts.length > 2) {
        return newToasts.slice(-2);
      }
      return newToasts;
    });
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEnvironmentSwitch = (id: string) => {
    setActiveEnvId(id);
    const env = environments.find((e) => e.id === id);
    if (env) {
      addToast("success", `Switched to ${env.name}`);
    }
    stopAll();
  };

  const toggleMasterMute = () => {
    if (isMuted) {
      setMasterVolume(prevVolume);
      setIsMuted(false);
    } else {
      setPrevVolume(masterVolume);
      setMasterVolume(0);
      setIsMuted(true);
    }
  };

  const handlePomodoroComplete = () => {
    stopAll();
    addToast("success", "Pomodoro complete! Time for a break.");
  };

  const handleFeedbackSubmit = (feedback: {
    type: string;
    message: string;
    email?: string;
  }) => {
    // In a real app, you'd send this to a backend
    console.log("Feedback submitted:", feedback);
    addToast("success", "Thanks for your feedback!");
  };

  return (
    <div
      className="relative min-h-screen transition-colors duration-700 ease-in-out"
      style={{
        backgroundColor: activeEnv.theme.bg,
        color: activeEnv.theme.text,
      }}
    >
      {/* Three.js 3D Background */}
      {showParticles && <ThreeBackground environment={activeEnv} />}

      {/* Top Right Settings Icons */}
      <div className="fixed top-3 right-3 sm:top-6 sm:right-6 flex flex-wrap gap-2 sm:gap-3 items-center z-40 max-w-[calc(100vw-24px)] sm:max-w-none">
        {/* Environment Switcher Buttons */}
        {environments.map((env) => {
          const Icon =
            env.icon === "coffee"
              ? "☕"
              : env.icon === "book"
              ? "📚"
              : env.icon === "waves"
              ? "🌊"
              : "📻";
          return (
            <button
              key={env.id}
              onClick={() => handleEnvironmentSwitch(env.id)}
              className={clsx(
                "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-base sm:text-lg transition-all duration-300 flex-shrink-0",
                activeEnvId === env.id
                  ? "bg-black/20 scale-110 shadow-lg"
                  : "bg-black/10 hover:bg-black/15 hover:scale-105"
              )}
              title={env.name}
            >
              {Icon}
            </button>
          );
        })}

        <div className="w-px h-6 sm:h-8 bg-black/20 mx-0.5 sm:mx-1 hidden sm:block"></div>

        <button
          onClick={() => setIsPomodoroOpen(true)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/10 hover:bg-black/15 hover:scale-105 flex items-center justify-center transition-all duration-300 flex-shrink-0"
          style={{ color: activeEnv.theme.accent }}
          title="Pomodoro Timer (P)"
        >
          <Clock size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <button
          onClick={() => setIsSettingsOpen(true)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/10 hover:bg-black/15 hover:scale-105 flex items-center justify-center transition-all duration-300 flex-shrink-0"
          style={{ color: activeEnv.theme.accent }}
          title="Settings"
        >
          <Settings size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
        <button
          onClick={toggleMasterMute}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/10 hover:bg-black/15 hover:scale-105 flex items-center justify-center transition-all duration-300 flex-shrink-0"
          style={{ color: activeEnv.theme.accent }}
          title="Mute All (M)"
        >
          {masterVolume === 0 ? (
            <VolumeX size={16} className="sm:w-[18px] sm:h-[18px]" />
          ) : (
            <Volume2 size={16} className="sm:w-[18px] sm:h-[18px]" />
          )}
        </button>
        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/10 hover:bg-black/15 hover:scale-105 flex items-center justify-center transition-all duration-300 flex-shrink-0"
          style={{ color: activeEnv.theme.accent }}
          title="Feedback"
        >
          <MessageSquare size={16} className="sm:w-[18px] sm:h-[18px]" />
        </button>
      </div>

      {/* Main 3-Column Layout */}
      <div className="min-h-screen flex items-center px-4 sm:px-6 md:px-8 lg:px-12 py-8 sm:py-12 relative z-10">
        {(activeEnv as any).lofiStations ? (
          // Lofi Radio Profile - Centered Single Column Layout
          <div className="w-full max-w-5xl mx-auto">
            <div className="space-y-4 sm:space-y-6">
              {/* Title */}
              <div className="animate-slide-in-up text-center">
                <h1
                  className="font-serif font-bold leading-none mb-2 sm:mb-3 transition-colors duration-700"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 5rem)",
                    color: activeEnv.theme.text,
                  }}
                >
                  {activeEnv.name}
                </h1>
                <p
                  className="text-sm sm:text-base font-light mb-4 sm:mb-6 transition-colors duration-700"
                  style={{ color: activeEnv.theme.text }}
                >
                  Take a seat and stay awhile.
                </p>
              </div>

              {/* Lofi Station Player */}
              <div
                className="w-full animate-slide-in-up"
                style={{ animationDelay: "0.15s" }}
              >
                <LofiStationPlayer
                  stations={(activeEnv as any).lofiStations}
                  accentColor={activeEnv.theme.accent}
                  textColor={activeEnv.theme.text}
                />
              </div>
            </div>
          </div>
        ) : (
          // Regular 3-Column Layout for other profiles
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start lg:items-center">
            {/* Left Column - Title + Spotify Player */}
            <div className="lg:col-span-3 space-y-4 sm:space-y-6">
              {/* Title */}
              <div className="animate-slide-in-up">
                <h1
                  className="font-serif font-bold leading-none mb-2 sm:mb-3 transition-colors duration-700"
                  style={{
                    fontSize: "clamp(2rem, 6vw, 5rem)",
                    color: activeEnv.theme.text,
                  }}
                >
                  {activeEnv.name}
                </h1>
                <p
                  className="text-sm sm:text-base font-light mb-4 sm:mb-6 transition-colors duration-700"
                  style={{ color: activeEnv.theme.text }}
                >
                  Take a seat and stay awhile.
                </p>
              </div>

              {/* Spotify Player */}
              {activeEnv.spotifyPlaylist && (
                <div
                  className="w-full max-w-[260px] animate-slide-in-up hidden sm:block"
                  style={{ animationDelay: "0.1s" }}
                >
                  <iframe
                    style={{ borderRadius: "12px" }}
                    src={`https://open.spotify.com/embed/playlist/${activeEnv.spotifyPlaylist}?utm_source=generator&theme=0`}
                    width="100%"
                    height="352"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                  ></iframe>
                </div>
              )}
            </div>
            {/* Center Column - Illustration */}
            <div className="lg:col-span-5 flex items-center justify-center py-4 sm:py-8 lg:py-0">
              <div
                className="w-full max-w-2xl animate-slide-in-up"
                style={{ animationDelay: "0.15s" }}
              >
                {activeEnv.illustration?.type === "video" ? (
                  <div
                    className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-2xl"
                    style={{ backgroundColor: activeEnv.theme.bg }}
                  >
                    <video
                      key={activeEnv.illustration.src}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto object-cover rounded-xl sm:rounded-2xl"
                      style={{
                        maxHeight: "60vh",
                        display: "block",
                      }}
                    >
                      <source
                        src={activeEnv.illustration.src}
                        type="video/mp4"
                      />
                    </video>
                  </div>
                ) : activeEnv.illustration?.type === "image" ? (
                  <img
                    src={activeEnv.illustration.src}
                    alt={activeEnv.name}
                    className="w-full h-auto rounded-xl sm:rounded-2xl shadow-2xl transition-opacity duration-700"
                    style={{ maxHeight: "60vh" }}
                  />
                ) : (
                  <div className="text-center opacity-20">
                    <div className="text-4xl sm:text-6xl mb-4">
                      {activeEnv.icon === "coffee"
                        ? "☕"
                        : activeEnv.icon === "book"
                        ? "📚"
                        : activeEnv.icon === "waves"
                        ? "🌊"
                        : "📻"}
                    </div>
                    <p
                      className="text-sm"
                      style={{ color: activeEnv.theme.text }}
                    >
                      Add illustration here
                    </p>
                  </div>
                )}
              </div>
            </div>{" "}
            {/* Right Column - Audio Controls */}
            <div className="lg:col-span-4">
              <div
                className="space-y-1 sm:space-y-2 animate-slide-in-up"
                style={{ animationDelay: "0.25s" }}
              >
                <EnvironmentCard
                  environment={activeEnv}
                  isActive={true}
                  showPanControls={showPanControls}
                />
              </div>

              {/* Checkboxes */}
              <div
                className="mt-4 sm:mt-6 space-y-2 animate-slide-in-up"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="show-pan"
                    checked={showPanControls}
                    onChange={(e) => setShowPanControls(e.target.checked)}
                    className="cursor-pointer w-3.5 h-3.5 sm:w-4 sm:h-4"
                    style={{ accentColor: activeEnv.theme.accent }}
                  />
                  <label
                    htmlFor="show-pan"
                    className="text-xs sm:text-sm cursor-pointer transition-colors duration-700"
                    style={{ color: activeEnv.theme.text }}
                  >
                    show pan controls
                  </label>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="save-prefs"
                    checked={savePreferences}
                    onChange={(e) => setSavePreferences(e.target.checked)}
                    className="cursor-pointer w-3.5 h-3.5 sm:w-4 sm:h-4"
                    style={{ accentColor: activeEnv.theme.accent }}
                  />
                  <label
                    htmlFor="save-prefs"
                    className="text-xs sm:text-sm cursor-pointer transition-colors duration-700"
                    style={{ color: activeEnv.theme.text }}
                  >
                    save preferences
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pomodoro Timer Modal */}
      <PomodoroTimer
        isOpen={isPomodoroOpen}
        onClose={() => setIsPomodoroOpen(false)}
        accentColor={activeEnv.theme.accent}
        bgColor={activeEnv.theme.bg}
        onComplete={handlePomodoroComplete}
      />

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        accentColor={activeEnv.theme.accent}
        bgColor={activeEnv.theme.bg}
        showPanControls={showPanControls}
        setShowPanControls={setShowPanControls}
        savePreferences={savePreferences}
        setSavePreferences={setSavePreferences}
        showParticles={showParticles}
        setShowParticles={setShowParticles}
      />

      {/* Feedback Modal */}
      <FeedbackModal
        isOpen={isFeedbackOpen}
        onClose={() => setIsFeedbackOpen(false)}
        accentColor={activeEnv.theme.accent}
        bgColor={activeEnv.theme.bg}
        onSubmit={handleFeedbackSubmit}
      />

      {/* Toast Notifications */}
      <ToastContainer
        toasts={toasts}
        onClose={removeToast}
        accentColor={activeEnv.theme.accent}
      />
    </div>
  );
};

function App() {
  return (
    <AudioProvider>
      <AppContent />
    </AudioProvider>
  );
}

export default App;
