// Local storage utilities for user data (replacing Firebase auth)
const STORAGE_KEY = 'crystal_skies_user';

export const getUserData = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error('Error reading user data:', e);
    return null;
  }
};

export const saveUserData = (userData) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(userData));
    return true;
  } catch (e) {
    console.error('Error saving user data:', e);
    return false;
  }
};

export const clearUserData = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (e) {
    console.error('Error clearing user data:', e);
    return false;
  }
};

// Initialize default user data if none exists
export const initializeUserData = () => {
  const existing = getUserData();
  if (!existing) {
    const defaultData = {
      trainerName: 'Trainer',
      trainerGender: 'male',
      isProfileComplete: false,
      pokedex: [],
      pokemon_inventory: [],
      friends: [],
      achievements: [],
      createdAt: new Date().toISOString(),
    };
    saveUserData(defaultData);
    return defaultData;
  }
  return existing;
};

