import { useState, useEffect, useCallback } from 'react';
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { getFirestore, doc, getDoc, setDoc, onSnapshot } from 'firebase/firestore';
import { app, db } from '../config/firebase.js';
import { getUserData, saveUserData, initializeUserData } from '../utils/storage.js';
import { getPokemonDataByName, getRandomWildPokemon, POKEMON_DATA } from '../data/pokemonData.js';

export function useAppState() {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [screen, setScreen] = useState('WELCOME');
  const [loading, setLoading] = useState(true);
  const [authReady, setAuthReady] = useState(false);
  const [sessionConfig, setSessionConfig] = useState(null);

  // Initialize Firebase Auth listener
  useEffect(() => {
    if (!app) {
      // Firebase not available, use local storage
      const data = initializeUserData();
      setUserData(data);
      setLoading(false);
      if (data.isProfileComplete) {
        setScreen('MAIN_MENU');
      } else {
        setScreen('STARTER_SELECT');
      }
      return;
    }

    const auth = getAuth(app);
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthReady(true);
      setLoading(false);
      
      if (!currentUser) {
        setScreen('WELCOME');
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fetch/Subscribe to User Data from Firestore
  useEffect(() => {
    if (!user || !db || !authReady) {
      return;
    }

    const userDocRef = doc(db, 'artifacts', 'default-app-id', 'users', user.uid, 'profile', 'data');
    
    const unsubscribe = onSnapshot(userDocRef, async (docSnap) => {
      if (docSnap.exists()) {
        const data = docSnap.data();
        setUserData(data);
        
        // Auto-redirect based on profile completion
        if (screen === 'WELCOME' || screen === 'LOGIN_SIGNUP' || screen === 'STARTER_SELECT') {
          if (data.isProfileComplete) {
            setScreen('MAIN_MENU');
          } else {
            setScreen('STARTER_SELECT');
          }
        }
      } else {
        // User logged in but no data - will be created by AuthScreen
        setUserData(null);
      }
    }, (error) => {
      console.error("Error fetching user data:", error);
    });

    return () => unsubscribe();
  }, [user, authReady, screen]);

  // Save new user (starter selection) - saves to both Firestore and localStorage
  const saveNewUser = useCallback(async (starterName, gender) => {
    const starterData = getPokemonDataByName(starterName);
    if (!starterData) return;

    const newPokedex = [{ id: starterData.id, name: starterName }];
    const newInventory = [{
      id: crypto.randomUUID(),
      pokedexId: starterData.id,
      name: starterName,
      type: starterData.type,
      exp: 0,
      stage: starterData.evoStage,
      currentName: starterName,
      isPartner: true,
    }];

    const profileData = {
      ...userData,
      trainerGender: gender,
      isProfileComplete: true,
      pokedex: newPokedex,
      pokemon_inventory: newInventory,
    };

    // Save to Firestore if user is logged in
    if (user && db) {
      try {
        const userDocRef = doc(db, 'artifacts', 'default-app-id', 'users', user.uid, 'profile', 'data');
        await setDoc(userDocRef, profileData, { merge: true });
      } catch (error) {
        console.error("Error saving to Firestore:", error);
      }
    }

    // Also save to localStorage as backup
    saveUserData(profileData);
    setUserData(profileData);
    setScreen('MAIN_MENU');
  }, [user, userData, db]);

  // Handle auth success
  const handleAuthSuccess = useCallback((firebaseUser) => {
    setUser(firebaseUser);
    // The onSnapshot listener will handle fetching user data and redirecting
  }, []);

  // Logout handler
  const handleLogout = useCallback(async () => {
    if (app) {
      try {
        const auth = getAuth(app);
        await signOut(auth);
        setScreen('WELCOME');
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  }, []);

  // Master Pokedex Unlock Function
  const handleUnlockPokedex = useCallback(async () => {
    console.log("Unlocking Master Pokedex...");
    const allNames = new Set(POKEMON_DATA.list.map(p => p.name));
    const masterPokedex = [...allNames].map(name => {
      const p = getPokemonDataByName(name);
      return { id: p.id, name: p.name };
    }).sort((a, b) => a.id - b.id);

    const updatedData = {
      ...userData,
      pokedex: masterPokedex
    };

    // Save to Firestore if user is logged in
    if (user && db) {
      try {
        const userDocRef = doc(db, 'artifacts', 'default-app-id', 'users', user.uid, 'profile', 'data');
        await setDoc(userDocRef, updatedData, { merge: true });
      } catch (error) {
        console.error("Error saving to Firestore:", error);
      }
    }

    // Also save to localStorage
    saveUserData(updatedData);
    setUserData(updatedData);
    console.log("Master Pokedex Unlocked!");
    alert("Master Pokédex Unlocked! Go check your Pokédex.");
  }, [user, userData, db]);

  // Handle session completion
  const handleSessionComplete = useCallback(async (durationMinutes, sessionType) => {
    if (!userData) return;

    const totalEncounters = Math.floor(durationMinutes / 10);
    const expGain = Math.floor(durationMinutes / 30 * 100);

    const wildPokemon = [];
    for (let i = 0; i < totalEncounters; i++) {
      const wildMonData = getRandomWildPokemon(sessionType);
      if (wildMonData) {
        wildPokemon.push(wildMonData);
      }
    }

    // Update Partner EXP
    let updatedInventory = [...userData.pokemon_inventory];
    let partnerIndex = updatedInventory.findIndex(p => p.isPartner);

    if (partnerIndex !== -1) {
      let partner = updatedInventory[partnerIndex];
      partner.exp = (partner.exp || 0) + expGain;
      updatedInventory[partnerIndex] = partner;
    }

    const updatedData = {
      ...userData,
      pokemon_inventory: updatedInventory,
    };

    // Save to Firestore if user is logged in
    if (user && db) {
      try {
        const userDocRef = doc(db, 'artifacts', 'default-app-id', 'users', user.uid, 'profile', 'data');
        await setDoc(userDocRef, updatedData, { merge: true });
      } catch (error) {
        console.error("Error saving to Firestore:", error);
      }
    }

    // Also save to localStorage
    saveUserData(updatedData);
    setUserData(updatedData);

    setSessionConfig({
      ...sessionConfig,
      expGained: expGain,
      encounters: wildPokemon
    });
    setScreen('ENCOUNTER_SCREEN');
  }, [user, userData, sessionConfig, db]);

  // Save caught Pokemon
  const saveCaughtPokemon = useCallback(async (caughtMonNames, expGain) => {
    if (!userData) return { hasNewPokemon: false, hasEvolved: false };

    let hasNewPokemon = false;
    let hasEvolved = false;
    let updatedInventory = [...userData.pokemon_inventory];
    let updatedPokedex = [...userData.pokedex];

    // Partner Evolution Check
    let partnerIndex = updatedInventory.findIndex(p => p.isPartner);
    if (partnerIndex !== -1) {
      let partner = updatedInventory[partnerIndex];
      const evoData = getPokemonDataByName(partner.currentName);

      if (evoData && evoData.evoExp !== -1 && partner.exp >= evoData.evoExp) {
        const nextMonName = Array.isArray(evoData.nextEvo) ? evoData.nextEvo[0] : evoData.nextEvo;
        const nextMonData = getPokemonDataByName(nextMonName);
        if (nextMonData) {
          partner.currentName = nextMonName;
          partner.stage = nextMonData.evoStage;
          hasEvolved = true;
          if (!updatedPokedex.some(p => p.name === nextMonName)) {
            updatedPokedex.push({ id: nextMonData.id, name: nextMonName });
            hasNewPokemon = true;
          }
          updatedInventory[partnerIndex] = partner;
        }
      }
    }

    // Catching Wild Pokémon
    caughtMonNames.forEach(name => {
      const wildMonData = getPokemonDataByName(name);
      const isNew = !updatedPokedex.some(p => p.name === name);
      if (isNew) {
        updatedPokedex.push({ id: wildMonData.id, name: name });
        hasNewPokemon = true;
      }

      updatedInventory.push({
        id: crypto.randomUUID(),
        pokedexId: wildMonData.id,
        name: name,
        type: wildMonData.type,
        exp: expGain / 3,
        stage: wildMonData.evoStage,
        currentName: name,
        isPartner: false,
      });
    });

    const updatedData = {
      ...userData,
      pokemon_inventory: updatedInventory,
      pokedex: updatedPokedex,
    };

    // Save to Firestore if user is logged in
    if (user && db) {
      try {
        const userDocRef = doc(db, 'artifacts', 'default-app-id', 'users', user.uid, 'profile', 'data');
        await setDoc(userDocRef, updatedData, { merge: true });
      } catch (error) {
        console.error("Error saving to Firestore:", error);
      }
    }

    // Also save to localStorage
    saveUserData(updatedData);
    setUserData(updatedData);

    return { hasNewPokemon, hasEvolved };
  }, [user, userData, db]);

  return {
    user,
    userData,
    screen,
    setScreen,
    loading: loading || !authReady,
    saveNewUser,
    handleAuthSuccess,
    handleLogout,
    handleUnlockPokedex,
    sessionConfig,
    setSessionConfig,
    handleSessionComplete,
    saveCaughtPokemon,
  };
}
