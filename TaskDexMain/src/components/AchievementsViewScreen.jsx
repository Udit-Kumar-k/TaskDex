import React from 'react';

const style = {
  card: "bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700",
  button: "px-6 py-3 rounded-xl font-bold transition-colors duration-300 shadow-md",
  secondaryButton: "bg-gray-600 text-white hover:bg-gray-700",
};

export default function AchievementsViewScreen({ setScreen, userData }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-900 text-white">
      <div className={style.card + " max-w-4xl w-full text-center"}>
        <h2 className="text-3xl font-bold mb-6 text-yellow-400">Achievements</h2>
        <p className="text-gray-400 mb-6">Your achievements will appear here.</p>
        <button
          className={style.button + " " + style.secondaryButton + " mt-8"}
          onClick={() => setScreen('MAIN_MENU')}
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}

