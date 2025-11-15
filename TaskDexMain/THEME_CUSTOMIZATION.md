# Theme Customization Guide

This document explains where and how to customize the visual theme of Crystal Skies Pomodoro.

## Theme System Overview

The app uses **Tailwind CSS** (via CDN) for styling. Colors, spacing, and visual elements are defined using Tailwind utility classes throughout the components.

## Main Theme Colors

### Current Color Scheme (Dark Theme)
- **Background**: `bg-gray-900` (dark gray)
- **Cards**: `bg-gray-800` (slightly lighter gray)
- **Borders**: `border-gray-700` (medium gray)
- **Primary Accent**: `blue-400`, `blue-500`, `blue-600` (blue tones)
- **Success/Positive**: `green-400`, `green-500` (green)
- **Warning/Alert**: `yellow-400`, `yellow-500` (yellow)
- **Error/Danger**: `red-400`, `red-500` (red)
- **Purple Accent**: `purple-400`, `purple-600` (purple - used for session types)

## Where to Change Themes

### 1. **Global Background Color**
**File**: All component files
**Look for**: `bg-gray-900` class
**Change to**: Any Tailwind color (e.g., `bg-slate-900`, `bg-zinc-900`, `bg-indigo-950`)

**Example locations**:
- `App.jsx`: Main app wrapper
- All screen components: Main container divs

### 2. **Card/Container Styling**
**File**: All component files
**Look for**: `style.card` constant or `bg-gray-800` classes
**Change to**: Modify the card background, border, and shadow

**Example** (in component files):
```jsx
const style = {
  card: "bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700",
  // Change to: "bg-slate-800 p-6 rounded-xl shadow-lg border border-slate-600"
};
```

### 3. **Primary Button Colors**
**File**: All component files
**Look for**: `style.primaryButton` or `bg-blue-600`
**Change to**: Any color scheme

**Example**:
```jsx
primaryButton: "bg-blue-600 text-white hover:bg-blue-700",
// Change to: "bg-purple-600 text-white hover:bg-purple-700",
```

### 4. **Text Colors**
**File**: All component files
**Look for**: Text color classes like `text-blue-400`, `text-white`, `text-gray-400`

**Common text colors**:
- Headings: `text-blue-400`, `text-purple-400`, `text-red-400`
- Body text: `text-white`, `text-gray-400`
- Accents: `text-green-400`, `text-yellow-400`

### 5. **Session Type Colors**
**File**: `src/components/PomodoroSetupScreen.jsx`
**Look for**: Session type button styling
```jsx
className={`... ${selectedType === type ? 'bg-purple-600 text-white' : 'bg-gray-700 ...'}`}
```

### 6. **Timer Screen Colors**
**File**: `src/components/PomodoroRunningScreen.jsx`
**Look for**:
- Header color: `headerColor` variable (red for study, green for break)
- Progress bar: `bg-red-500` (study) or `bg-green-500` (break)

### 7. **Map Background**
**File**: `src/components/PomodoroRunningScreen.jsx`
**Look for**: `mapStyle` object
```jsx
const mapStyle = {
  backgroundImage: `url(https://raw.githubusercontent.com/wrish6/prototype/main/map_background.png)`,
  // Change URL to your custom background image
};
```

## Quick Theme Presets

### Preset 1: Purple Theme
Replace all `blue-*` with `purple-*`:
- `bg-blue-600` → `bg-purple-600`
- `text-blue-400` → `text-purple-400`
- `hover:bg-blue-700` → `hover:bg-purple-700`

### Preset 2: Green/Nature Theme
Replace primary colors:
- `bg-blue-600` → `bg-green-600`
- `text-blue-400` → `text-green-400`
- Background: `bg-gray-900` → `bg-slate-900`

### Preset 3: Dark Blue/Ocean Theme
- `bg-gray-900` → `bg-slate-900`
- `bg-gray-800` → `bg-slate-800`
- Keep blue accents but use `blue-500` instead of `blue-600`

### Preset 4: Light Theme
**Warning**: Requires extensive changes
- `bg-gray-900` → `bg-gray-50` or `bg-white`
- `text-white` → `text-gray-900`
- `bg-gray-800` → `bg-gray-100`
- `text-gray-400` → `text-gray-600`
- Invert all color schemes

## Component-Specific Customization

### StarterSelectScreen
- **Location**: `src/components/StarterSelectScreen.jsx`
- **Customize**:
  - Starter selection cards: `border-blue-500` → your color
  - Gender selection rings: `ring-blue-500`, `ring-pink-500`

### MainMenuScreen
- **Location**: `src/components/MainMenuScreen.jsx`
- **Customize**:
  - Welcome heading: `text-blue-400`
  - Menu buttons: `bg-gray-700 hover:bg-gray-600`

### PomodoroRunningScreen
- **Location**: `src/components/PomodoroRunningScreen.jsx`
- **Customize**:
  - Timer display: `bg-gray-700/50`
  - Progress bar colors: `bg-red-500`, `bg-green-500`
  - Map border: `border-4 border-indigo-600`

### EncounterScreen
- **Location**: `src/components/EncounterScreen.jsx`
- **Customize**:
  - Selected Pokemon border: `border-green-500 ring-green-500`
  - Status modal: `border-yellow-500`

## Advanced Customization

### Custom CSS File
Create `src/custom-theme.css` and import in `main.jsx`:
```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --background: #111827;
  --card-bg: #1f2937;
}
```

Then use CSS variables in components or add custom Tailwind config.

### Tailwind Configuration
Create `tailwind.config.js` for custom theme:
```js
export default {
  theme: {
    extend: {
      colors: {
        'pokemon-red': '#ff0000',
        'pokemon-blue': '#3b82f6',
      }
    }
  }
}
```

**Note**: Requires installing Tailwind via npm instead of CDN.

## Sprite/Image Customization

### Pokemon Sprites
**Location**: `src/utils/sprites.js`
**Change**: `RAW_BASE_URL` constant to point to your sprite repository

### Trainer Sprites
**Location**: `src/utils/sprites.js`
**Change**: `getGifUrl()` function for `TrainerMale` and `TrainerFemale` cases

## Quick Reference: Color Classes by Purpose

| Purpose | Current Class | Alternative Options |
|---------|--------------|---------------------|
| Primary Background | `bg-gray-900` | `bg-slate-900`, `bg-zinc-900`, `bg-indigo-950` |
| Card Background | `bg-gray-800` | `bg-slate-800`, `bg-zinc-800` |
| Primary Buttons | `bg-blue-600` | `bg-purple-600`, `bg-indigo-600`, `bg-cyan-600` |
| Primary Text | `text-blue-400` | `text-purple-400`, `text-indigo-400` |
| Success/Positive | `text-green-400` | `text-emerald-400`, `text-teal-400` |
| Warning | `text-yellow-400` | `text-amber-400`, `text-orange-400` |
| Error | `text-red-400` | `text-rose-400`, `text-pink-400` |
| Borders | `border-gray-700` | `border-slate-700`, `border-zinc-700` |

## Testing Theme Changes

1. Make changes to one component at a time
2. Test in browser (run `npm run dev`)
3. Check all screens to ensure consistency
4. Verify contrast for accessibility
5. Test on mobile devices if possible

## Tips

- Use Tailwind's color palette: https://tailwindcss.com/docs/customizing-colors
- Maintain contrast ratios for accessibility (WCAG AA minimum)
- Keep consistent color usage across components
- Use Tailwind's opacity modifiers: `bg-blue-600/50` for 50% opacity
- Use dark mode variants if needed: `dark:bg-gray-800`

