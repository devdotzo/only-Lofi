import React, { useState } from "react";
import { Send } from "lucide-react";
import { useDraggable } from "../hooks/useDraggable";

interface FeedbackModalProps {
  isOpen: boolean;
  onClose: () => void;
  accentColor: string;
  bgColor: string;
  onSubmit: (feedback: {
    type: string;
    message: string;
    email?: string;
  }) => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  onClose,
  accentColor,
  bgColor,
  onSubmit,
}) => {
  const [feedbackType, setFeedbackType] = useState<
    "bug" | "feature" | "general"
  >("general");
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const { position, isDragging, handleMouseDown } = useDraggable();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim()) {
      onSubmit({
        type: feedbackType,
        message: message.trim(),
        email: email.trim() || undefined,
      });
      setMessage("");
      setEmail("");
      setFeedbackType("general");
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 pointer-events-none flex items-center justify-center p-4">
      <div
        className="pointer-events-auto rounded-xl shadow-2xl max-w-lg w-full overflow-hidden"
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
            feedback
          </h2>

          <div className="w-16"></div>
        </div>

        {/* Content */}
        <div className="p-4 sm:p-6">
          <p
            className="text-xs sm:text-sm text-center opacity-70 mb-4 sm:mb-6"
            style={{ color: accentColor }}
          >
            We'd love to hear from you!
          </p>

          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Feedback Type */}
            <div>
              <label
                className="text-xs sm:text-sm font-medium block mb-2"
                style={{ color: accentColor }}
              >
                Type
              </label>
              <div className="flex gap-2">
                {[
                  { value: "bug", label: "🐛 Bug" },
                  { value: "feature", label: "✨ Feature" },
                  { value: "general", label: "💬 General" },
                ].map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setFeedbackType(type.value as any)}
                    className={`flex-1 py-1.5 sm:py-2 px-2 sm:px-4 rounded-lg font-medium text-xs sm:text-sm transition-all ${
                      feedbackType === type.value
                        ? "bg-black/20 scale-105"
                        : "bg-black/5 hover:bg-black/10"
                    }`}
                    style={{ color: accentColor }}
                  >
                    {type.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="feedback-message"
                className="text-xs sm:text-sm font-medium block mb-2"
                style={{ color: accentColor }}
              >
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="feedback-message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                rows={4}
                placeholder="Tell us what you think..."
                className="w-full p-2.5 sm:p-3 rounded-lg bg-black/5 border-2 border-black/10 focus:border-black/30 focus:outline-none transition-colors resize-none text-sm"
                style={{ color: accentColor }}
              />
            </div>

            {/* Email (Optional) */}
            <div>
              <label
                htmlFor="feedback-email"
                className="text-xs sm:text-sm font-medium block mb-2"
                style={{ color: accentColor }}
              >
                Email <span className="text-xs opacity-60">(optional)</span>
              </label>
              <input
                id="feedback-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full p-2.5 sm:p-3 rounded-lg bg-black/5 border-2 border-black/10 focus:border-black/30 focus:outline-none transition-colors text-sm"
                style={{ color: accentColor }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!message.trim()}
              className="w-full py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
              style={{ backgroundColor: accentColor }}
            >
              <Send size={16} className="sm:w-[18px] sm:h-[18px]" />
              send feedback
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
