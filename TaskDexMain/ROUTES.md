# Crystal Skies Pomodoro - Routes Documentation

## Overview
This app uses a **state-based routing system** (no URL routing). The current screen is managed by the `screen` state in `useAppState` hook.

## Route Flow Diagram

```
WELCOME (Initial)
    ↓ (click Get Started)
LOGIN_SIGNUP
    ↓ (after login/signup)
STARTER_SELECT
    ↓ (after selecting starter)
MAIN_MENU
    ↓
    ├─→ POMODORO_SETUP
    │       ↓ (start session)
    │   POMODORO_RUNNING
    │       ↓ (session complete)
    │   ENCOUNTER_SCREEN
    │       ↓ (catch pokemon)
    │   BREAK_PHASE_TRIGGER (optional break timer)
    │       ↓ (break complete)
    │   MAIN_MENU
    │
    ├─→ POKEDEX_VIEW → MAIN_MENU
    │
    ├─→ FRIENDS_LIST → MAIN_MENU
    │
    └─→ ACHIEVEMENTS_VIEW → MAIN_MENU
```

## Route Details

### 1. `WELCOME`
- **Purpose**: Landing page - first screen users see
- **Component**: `WelcomeScreen.jsx`
- **Entry Point**: Initial screen when app loads
- **Features**:
  - App title and description
  - "Get Started" button
- **Next Route**: `LOGIN_SIGNUP` (when "Get Started" is clicked)

### 2. `LOGIN_SIGNUP`
- **Purpose**: User authentication - login or sign up
- **Component**: `AuthScreen.jsx`
- **Entry Point**: From Welcome screen
- **Features**:
  - Toggle between Login and Sign Up
  - Username and password input
  - Firebase authentication integration
  - Creates user document in Firestore on signup
- **Actions**:
  - Login: Authenticates existing user
  - Sign Up: Creates new account and user document
- **Next Route**: `STARTER_SELECT` (after successful auth, if profile incomplete) or `MAIN_MENU` (if profile complete)
- **Back Button**: Returns to `WELCOME`

### 3. `STARTER_SELECT`
- **Purpose**: First-time user setup - choose starter Pokemon and trainer gender
- **Component**: `StarterSelectScreen.jsx`
- **Entry Point**: Automatically shown if `userData.isProfileComplete === false`
- **Actions**:
  - Select trainer gender (male/female)
  - Select starter Pokemon (Charmander, Squirtle, Bulbasaur)
  - Calls `saveNewUser()` which sets `isProfileComplete: true`
- **Next Route**: `MAIN_MENU` (automatic after selection)

### 4. `MAIN_MENU`
- **Purpose**: Central hub with navigation to all features
- **Component**: `MainMenuScreen.jsx`
- **Entry Point**: 
  - After starter selection
  - Default route for logged-in users
  - Return point from most screens
- **Menu Options**:
  - **Start Session** → `POMODORO_SETUP`
  - **Pokedex** → `POKEDEX_VIEW`
  - **Friends** → `FRIENDS_LIST`
  - **Achievements** → `ACHIEVEMENTS_VIEW`
- **Dev Tool**: "Unlock All Pokémon" button (unlocks entire Pokedex)

### 5. `POMODORO_SETUP`
- **Purpose**: Configure study session parameters
- **Component**: `PomodoroSetupScreen.jsx`
- **Configuration Options**:
  - **Encounter Type**: Fire, Water, Grass, Electric, Ghost, Psychic
  - **Study Time**: Minutes (default: 30)
  - **Rest Time**: Minutes (default: 5)
- **Actions**: Sets `sessionConfig` and navigates to `POMODORO_RUNNING`
- **Back Button**: Returns to `MAIN_MENU`

### 6. `POMODORO_RUNNING`
- **Purpose**: Active timer screen with animated map
- **Component**: `PomodoroRunningScreen.jsx`
- **Features**:
  - Countdown timer (MM:SS format)
  - Progress bar
  - Animated trainer and Pokemon sprites on map background
  - Pause/Resume controls
  - Skip button
- **Phases**:
  - **Study Phase**: Timer counts down from study time
  - **Rest Phase**: Timer counts down from rest time (if `breakTriggered: true`)
- **On Complete**:
  - Study phase → Calls `handleSessionComplete()` → `ENCOUNTER_SCREEN`
  - Rest phase → Returns to `MAIN_MENU`

### 7. `ENCOUNTER_SCREEN`
- **Purpose**: After study session - catch wild Pokemon
- **Component**: `EncounterScreen.jsx`
- **Features**:
  - Shows EXP gained by partner Pokemon
  - Displays wild Pokemon encounters (based on session type)
  - Evolution warning if partner can evolve
  - Select up to 2 Pokemon to catch
- **Actions**:
  - Select Pokemon to catch
  - Calls `saveCaughtPokemon()` which:
    - Adds caught Pokemon to inventory
    - Updates Pokedex
    - Checks for partner evolution
  - Shows results modal
- **Next Route**: `BREAK_PHASE_TRIGGER` (if rest time > 0) or `MAIN_MENU`

### 8. `BREAK_PHASE_TRIGGER`
- **Purpose**: Optional break timer after study session
- **Component**: `PomodoroRunningScreen.jsx` (same as study timer, but with `breakTriggered: true`)
- **Behavior**: Same as `POMODORO_RUNNING` but in "Rest" phase
- **Next Route**: `MAIN_MENU` (after break completes)

### 9. `POKEDEX_VIEW`
- **Purpose**: View all caught Pokemon species
- **Component**: `PokedexViewScreen.jsx`
- **Features**:
  - Grid display of all Pokemon in Pokedex
  - Sorted by Pokedex ID
  - Shows Pokemon sprites and names
  - Displays total count
- **Back Button**: Returns to `MAIN_MENU`

### 10. `FRIENDS_LIST`
- **Purpose**: Friends management and multiplayer hub
- **Component**: `FriendsListScreen.jsx`
- **Features**:
  - Display Trainer ID (for sharing)
  - Copy ID to clipboard
  - Add friends by ID
  - View friends list with sprites
- **Note**: Currently uses local storage (Firebase integration needed for real friends)
- **Back Button**: Returns to `MAIN_MENU`

### 11. `ACHIEVEMENTS_VIEW`
- **Purpose**: View user achievements
- **Component**: `AchievementsViewScreen.jsx`
- **Status**: Placeholder screen (achievements system not yet implemented)
- **Back Button**: Returns to `MAIN_MENU`

## State Management

### Key State Variables (in `useAppState` hook):
- `user`: Firebase auth user object (null if not logged in)
- `userData`: Complete user profile (stored in Firestore and localStorage)
- `screen`: Current route/screen name
- `sessionConfig`: Current session configuration (type, times, encounters, exp)
- `loading`: Initial loading state
- `authReady`: Firebase auth initialization state

### Navigation
All navigation is done via `setScreen('ROUTE_NAME')` function.

## Where to Modify Routes

### Adding a New Route:
1. Create component in `src/components/YourNewScreen.jsx`
2. Add case in `src/App.jsx` renderScreen() function
3. Add navigation button/link in appropriate screen (usually `MainMenuScreen.jsx`)
4. Update this documentation

### Modifying Route Flow:
- Edit `src/App.jsx` - `renderScreen()` function
- Edit component files - `setScreen()` calls
- Edit `src/hooks/useAppState.js` - state initialization logic

