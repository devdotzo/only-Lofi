import React from "react";
import { motion } from "framer-motion";
import { Coffee, BookOpen, Waves, Radio } from "lucide-react";
import { Environment } from "../data/environments";
import { clsx } from "clsx";

interface ProfileSwitcherProps {
  environments: Environment[];
  activeId: string;
  onSwitch: (id: string) => void;
}

const icons = {
  coffee: Coffee,
  book: BookOpen,
  waves: Waves,
  radio: Radio,
};

export const ProfileSwitcher: React.FC<ProfileSwitcherProps> = ({
  environments,
  activeId,
  onSwitch,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4, duration: 0.6 }}
      className="fixed bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="flex p-2 bg-gradient-to-br from-white/[0.15] to-white/[0.08] backdrop-blur-2xl rounded-3xl border border-white/20 shadow-glow-lg">
        {environments.map((env, index) => {
          const Icon = icons[env.icon];
          const isActive = activeId === env.id;

          return (
            <motion.button
              key={env.id}
              onClick={() => onSwitch(env.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className={clsx(
                "relative px-5 md:px-7 py-3 md:py-4 rounded-2xl flex items-center gap-2.5 transition-all duration-500 group",
                isActive ? "text-white" : "text-white/50 hover:text-white/80"
              )}
            >
              {isActive && (
                <>
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-gradient-to-br from-white/25 to-white/10 rounded-2xl"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                  <motion.div
                    layoutId="activeTabGlow"
                    className="absolute inset-0 bg-white/10 rounded-2xl blur-md"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                  <div className="absolute inset-0 rounded-2xl shadow-inner-glow" />
                </>
              )}

              <span
                className={clsx(
                  "relative z-10 transition-all duration-300",
                  isActive && "drop-shadow-[0_2px_8px_rgba(255,255,255,0.3)]"
                )}
              >
                <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
              </span>

              <span
                className={clsx(
                  "relative z-10 font-semibold text-sm tracking-wide hidden sm:block transition-all duration-300",
                  isActive
                    ? "opacity-100 max-w-xs"
                    : "opacity-0 max-w-0 overflow-hidden group-hover:opacity-70 group-hover:max-w-xs"
                )}
              >
                {env.name}
              </span>

              {isActive && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-2 h-2 bg-white rounded-full shadow-lg"
                />
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Bottom indicator */}
      <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/10 rounded-full" />
    </motion.div>
  );
};
