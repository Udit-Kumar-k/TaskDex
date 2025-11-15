# TaskDex pokemon pomodoro app

A Pokemon-themed Pomodoro timer app built with React and Vite. Focus on your work while your Pokemon partner gains experience and evolves!

## Features

- 🎮 **Pokemon-themed Pomodoro Timer**: Study sessions with Pokemon progression
- 📖 **Pokedex**: Track all caught Pokemon
- 🫂 **Friends System**: Connect with other trainers (local storage)
- 🏆 **Achievements**: Track your progress (coming soon)
- 🎨 **Beautiful UI**: Modern dark theme with Tailwind CSS
- 💾 **Local Storage**: All data saved locally (no login required)

## Installation

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Project Structure

```
src/
├── components/          # React components for each screen
│   ├── StarterSelectScreen.jsx
│   ├── MainMenuScreen.jsx
│   ├── PomodoroSetupScreen.jsx
│   ├── PomodoroRunningScreen.jsx
│   ├── EncounterScreen.jsx
│   ├── PokedexViewScreen.jsx
│   ├── FriendsListScreen.jsx
│   └── AchievementsViewScreen.jsx
├── data/
│   └── pokemonData.js   # Pokemon data and game constants
├── hooks/
│   └── useAppState.js   # Main app state management
├── utils/
│   ├── sprites.js       # Sprite URL utilities
│   ├── formatTime.js    # Time formatting utilities
│   └── storage.js       # Local storage utilities
├── config/
│   └── firebase.js      # Firebase config (optional)
├── App.jsx              # Main app component with routing
└── main.jsx             # Entry point
```

## Routes

See [ROUTES.md](./ROUTES.md) for detailed route documentation.

## Theme Customization

See [THEME_CUSTOMIZATION.md](./THEME_CUSTOMIZATION.md) for theme customization guide.

## Key Differences from Original CDN Version

1. **No Authentication**: Removed login/signup - uses local storage only
2. **React Components**: Converted from inline JSX to proper React components
3. **Vite Build System**: Uses Vite instead of CDN scripts
4. **Modular Structure**: Organized into separate files and folders
5. **Local Storage**: All user data stored in browser localStorage

## How It Works

1. **First Time**: Select your starter Pokemon and trainer gender
2. **Start Session**: Choose session type (Fire, Water, Grass, etc.) and duration
3. **Focus**: Timer runs with animated Pokemon sprites
4. **Catch Pokemon**: After session, encounter wild Pokemon based on session type
5. **Evolve**: Your partner Pokemon gains EXP and evolves over time
6. **Complete Pokedex**: Catch all Pokemon to complete your collection

## Technologies Used

- React 18
- Vite
- Tailwind CSS (via CDN)
- Local Storage API
- Firebase (optional, for future cloud sync)

## Development

The app uses state-based routing (no URL routing). All navigation is handled through the `screen` state in `useAppState` hook.

## License

MIT

