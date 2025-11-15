import React from 'react';
import { useAppState } from './hooks/useAppState.js';
import WelcomeScreen from './components/WelcomeScreen.jsx';
import AuthScreen from './components/AuthScreen.jsx';
import StarterSelectScreen from './components/StarterSelectScreen.jsx';
import MainMenuScreen from './components/MainMenuScreen.jsx';
import PomodoroSetupScreen from './components/PomodoroSetupScreen.jsx';
import PomodoroRunningScreen from './components/PomodoroRunningScreen.jsx';
import EncounterScreen from './components/EncounterScreen.jsx';
import PokedexViewScreen from './components/PokedexViewScreen.jsx';
import FriendsListScreen from './components/FriendsListScreen.jsx';
import AchievementsViewScreen from './components/AchievementsViewScreen.jsx';

function App() {
  const {
    user,
    userData,
    screen,
    setScreen,
    loading,
    saveNewUser,
    handleAuthSuccess,
    handleLogout,
    handleUnlockPokedex,
    sessionConfig,
    setSessionConfig,
    handleSessionComplete,
    saveCaughtPokemon,
  } = useAppState();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-[#f5f5dc] text-black">
        <svg className="animate-spin h-8 w-8 text-red-600 mr-3" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="text-sm">Loading TaskMon...</p>
      </div>
    );
  }

  const renderScreen = () => {
    switch (screen) {
      case 'WELCOME':
        return <WelcomeScreen setScreen={setScreen} />;
      
      case 'LOGIN_SIGNUP':
        return <AuthScreen setScreen={setScreen} onAuthSuccess={handleAuthSuccess} />;
      
      case 'STARTER_SELECT':
        return <StarterSelectScreen saveNewUser={saveNewUser} setScreen={setScreen} userData={userData} />;
      
      case 'MAIN_MENU':
        return <MainMenuScreen setScreen={setScreen} userData={userData} handleLogout={handleLogout} handleUnlockPokedex={handleUnlockPokedex} />;
      
      case 'POMODORO_SETUP':
        return <PomodoroSetupScreen setScreen={setScreen} setSessionConfig={setSessionConfig} />;
      
      case 'POMODORO_RUNNING':
        return (
          <PomodoroRunningScreen
            setScreen={setScreen}
            sessionConfig={sessionConfig}
            userData={userData}
            handleSessionComplete={handleSessionComplete}
          />
        );
      
      case 'ENCOUNTER_SCREEN':
        return (
          <EncounterScreen
            setScreen={setScreen}
            sessionConfig={sessionConfig}
            userData={userData}
            saveCaughtPokemon={saveCaughtPokemon}
          />
        );
      
      case 'BREAK_PHASE_TRIGGER':
        return (
          <PomodoroRunningScreen
            setScreen={setScreen}
            sessionConfig={{ ...sessionConfig, breakTriggered: true }}
            userData={userData}
            handleSessionComplete={handleSessionComplete}
          />
        );
      
      case 'POKEDEX_VIEW':
        return <PokedexViewScreen setScreen={setScreen} userData={userData} />;
      
      case 'FRIENDS_LIST':
        return <FriendsListScreen setScreen={setScreen} userData={userData} />;
      
      case 'ACHIEVEMENTS_VIEW':
        return <AchievementsViewScreen setScreen={setScreen} userData={userData} />;
      
      default:
        return <MainMenuScreen setScreen={setScreen} userData={userData} handleUnlockPokedex={handleUnlockPokedex} />;
    }
  };

  return (
    <div className="bg-[#f5f5dc] min-h-screen font-pixel">
      {renderScreen()}
    </div>
  );
}

export default App;

