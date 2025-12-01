# onlyLoFi 🎵

> A gentle atmosphere for focus, a mood that grows with you, and a small dream-world that lives in your browser.

## The Story Behind onlyLoFi

Have you ever noticed how certain sounds can quietly change the way you feel?

The soft hum of a café, the calm rise and fall of ocean waves, or the gentle rustle of pages in a library can create a space where your mind settles and focus begins to flow naturally.

But in our everyday digital world, we keep switching between different apps just to hold on to that feeling. One moment we're adjusting music on one platform, then searching for background sounds somewhere else, and then opening another tab for a timer. In all of this, our focus breaks.

I wanted to change that. I wanted a space that understands how we feel and adjusts itself without us having to jump around.

**That's how onlyLoFi was born.**

## What is onlyLoFi?

onlyLoFi is a calm and dreamy ambient sound web application that brings together everything you need for focused work in one peaceful space. No more tab-switching, no more breaking your flow—just pure, uninterrupted atmosphere.

### The Experience

- **Rich Sound Library**: Each environment comes with multiple curated sounds—rain variations, café chatter levels, ocean intensities—giving you complete control over your auditory landscape
- **Live Lo-fi Stations**: Stream live YouTube lo-fi channels directly within onlyLoFi. No need to open another tab—all your favorite 24/7 lo-fi stations are integrated and accessible right here
- **Personal Profiles**: Create and switch between different profiles for various moods or tasks. Your morning study setup, afternoon work mode, or evening relaxation—each saved with its own environment, sounds, and timer preferences
- **Smart Pomodoro Timer**: A timer that shifts its atmosphere based on your session—work, short break, or long break
- **Living 3D Backgrounds**: Animations flow with your environment. Ocean visuals sway like waves, café scenes rise like warm steam
- **Layered Audio Control**: Mix ambient sounds with lo-fi music independently, creating your perfect balance

### The Philosophy

We're always told to be fast and productive, but humans aren't machines. We need rhythm, comfort, and spaces that help us stay steady.

onlyLoFi is built to give you that space—a peaceful digital room that adapts to you, remembers you, and helps you work in a way that feels natural.

## 📱 Use Anywhere

Here's the special part: You can use onlyLoFi even on devices that don't have a full browser experience.

If you have an old spare Android or iPhone lying around, you can turn it into a dedicated Pomodoro + lo-fi machine. onlyLoFi runs perfectly inside **Telegram Mini Apps**, so you can open the website inside those apps and let that device become your personal ambient companion anywhere.

## 🛠️ Technical Stack

onlyLoFi is built with modern web technologies to ensure a smooth, responsive experience:

- **React 18** with **TypeScript** - For a robust, type-safe foundation
- **Vite** - Lightning-fast development and optimized production builds
- **Tailwind CSS** - Clean, soft, and gentle interface design
- **Howler.js** - Powerful audio engine for seamless sound blending
- **Three.js** - Flowing 3D animations that bring environments to life
- **GSAP & Framer Motion** - Smooth, calm, and dream-like transitions
- **React Context API** - Efficient state management throughout the app
- **Lucide React** - Beautiful, consistent icon system

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/onlyLoFi.git
cd onlyLoFi
```

2. Install dependencies:

```bash
npm install
# or
yarn install
```

3. Start the development server:

```bash
npm run dev
# or
yarn dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
# or
yarn build
```

The optimized production build will be in the `dist` folder.

## 📁 Project Structure

```
onlyLoFi/
├── public/
│   ├── illustrations/     # Environment illustrations
│   └── sounds/           # Audio files organized by environment
│       ├── cafe/
│       ├── library/
│       └── ocean/
├── src/
│   ├── components/       # React components
│   │   ├── AudioControl.tsx
│   │   ├── BackgroundCanvas.tsx
│   │   ├── EnvironmentCard.tsx
│   │   ├── FeedbackModal.tsx
│   │   ├── LofiStationPlayer.tsx
│   │   ├── PomodoroTimer.tsx
│   │   ├── ProfileSwitcher.tsx
│   │   ├── SettingsModal.tsx
│   │   ├── ThreeBackground.tsx
│   │   └── Toast.tsx
│   ├── contexts/         # React Context providers
│   │   └── AudioContext.tsx
│   ├── data/            # Static data and configurations
│   │   └── environments.ts
│   ├── hooks/           # Custom React hooks
│   │   └── useDraggable.ts
│   ├── App.tsx          # Main application component
│   └── main.tsx         # Application entry point
└── package.json
```

## 🎨 Features in Detail

### Ambient Environments

Each environment offers multiple sound variations:

- **Café**: Choose from different levels of chatter, espresso machines, background music, and café ambiance
- **Library**: Various page-turning sounds, quiet whispers, pencil scratches, and studious silence
- **Ocean**: Different wave intensities, seagulls, gentle storms, and coastal atmospheres
- **Lo-fi Station**: Access live YouTube streams and curated lo-fi tracks—all without leaving the app

### Pomodoro Timer

The timer adapts to your workflow:

- **Work Sessions**: Focused atmosphere to help you concentrate
- **Short Breaks**: Light mood to help you recharge quickly
- **Long Breaks**: Deeper relaxation for proper rest

### Customization

- **Sound Mixing**: Select and blend multiple sounds within each environment
- **Volume Control**: Fine-tune each audio layer independently
- **Profile Management**: Create unlimited profiles for different workflows and moods
- **YouTube Integration**: Browse and play live lo-fi radio stations without switching tabs
- **Persistent Settings**: All preferences automatically saved and synced across sessions

## 🔊 Audio Setup

For the best experience:

1. Place your audio files in `public/sounds/[environment]/`
2. Update `src/data/environments.ts` with your audio file references
3. Ensure audio files are in formats supported by modern browsers (MP3, OGG, WAV)

## 🌐 Browser Support

onlyLoFi works best on modern browsers:

- Chrome/Edge (recommended)
- Firefox
- Safari
- Mobile browsers (iOS Safari, Chrome Mobile)
- Telegram Mini Apps

## 💭 Final Thoughts

onlyLoFi isn't just another productivity tool. It's a space where technology serves your natural rhythm, where the digital world becomes a little more human.

A place where you can breathe, focus, and create—without fighting against yourself.

This is onlyLoFi. Your peaceful digital companion.

---

*Built with care for everyone who believes that productivity should feel natural, not forced.*

---

## Features file updated
