# Quick Start Guide

## Installation & Running

1. **Install dependencies:**
   ```bash
   cd TaskDex/TaskDexMain
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```

3. **Open browser** to the URL shown (usually `http://localhost:5173`)

## Routes Explained (Simple Version)

The app has **9 main screens** that you navigate between:

1. **STARTER_SELECT** - First screen, choose your Pokemon starter
2. **MAIN_MENU** - Central hub with 4 buttons
3. **POMODORO_SETUP** - Configure your study session
4. **POMODORO_RUNNING** - Active timer with animations
5. **ENCOUNTER_SCREEN** - Catch Pokemon after study session
6. **BREAK_PHASE_TRIGGER** - Optional break timer
7. **POKEDEX_VIEW** - See all caught Pokemon
8. **FRIENDS_LIST** - Friends management
9. **ACHIEVEMENTS_VIEW** - Achievements (placeholder)

**Flow**: STARTER_SELECT → MAIN_MENU → (choose feature) → back to MAIN_MENU

## Where to Change Themes

### Quick Color Changes:

1. **Background Color** (dark gray):
   - Search for: `bg-gray-900`
   - Replace with: `bg-slate-900` or `bg-indigo-950`

2. **Primary Blue Color**:
   - Search for: `bg-blue-600` or `text-blue-400`
   - Replace with: `bg-purple-600` or `text-purple-400`

3. **Card Background**:
   - Search for: `bg-gray-800`
   - Replace with: `bg-slate-800` or `bg-zinc-800`

### Files to Edit:

- **All Components**: `src/components/*.jsx` - Contains all UI styling
- **Main App**: `src/App.jsx` - Main wrapper styling
- **Global Styles**: `src/style.css` - Base styles

### Most Important Files for Theme:

1. `src/components/MainMenuScreen.jsx` - Main menu colors
2. `src/components/PomodoroRunningScreen.jsx` - Timer screen colors
3. `src/components/PomodoroSetupScreen.jsx` - Setup screen colors

## Route Navigation

Routes are controlled by the `screen` state in `src/hooks/useAppState.js`.

To add a new route:
1. Create component in `src/components/`
2. Add case in `src/App.jsx` renderScreen()
3. Add navigation button in appropriate screen

## Data Storage

All data is stored in **localStorage** (no server needed):
- User profile
- Pokemon inventory
- Pokedex
- Friends list

To reset: Clear browser localStorage or use DevTools.

## Key Features

- ✅ No login required (uses local storage)
- ✅ All Pokemon data included
- ✅ Sprite images from GitHub
- ✅ Timer with pause/resume
- ✅ Pokemon evolution system
- ✅ Wild Pokemon encounters

## Troubleshooting

**Images not loading?**
- Check internet connection (sprites load from GitHub)
- Check browser console for errors

**Data not saving?**
- Check browser localStorage is enabled
- Check console for errors

**Styling issues?**
- Make sure Tailwind CDN is loaded (in index.html)
- Check browser console for CSS errors

