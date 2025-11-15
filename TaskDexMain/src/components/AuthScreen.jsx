import React from 'react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { app, db } from '../config/firebase.js';

const style = {
  card: "bg-white p-8 rounded-xl shadow-lg border-2 border-gray-300",
  button: "px-6 py-3 rounded-lg font-bold transition-colors duration-300 shadow-md",
  primaryButton: "bg-red-600 text-white hover:bg-red-700",
  input: "w-full p-3 rounded-lg bg-white border-2 border-gray-300 text-black focus:border-red-500 focus:ring-2 focus:ring-red-500",
};

export default function AuthScreen({ setScreen, onAuthSuccess }) {
  const [isLogin, setIsLogin] = React.useState(true);
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [authError, setAuthError] = React.useState('');
  const [isLoadingAuth, setIsLoadingAuth] = React.useState(false);

  if (!app) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#f5f5dc] text-black">
        <div className={style.card + " max-w-md w-full text-center"}>
          <h2 className="text-2xl font-bold mb-4 text-red-600">Firebase Not Available</h2>
          <p className="text-gray-700 mb-4">Firebase is not configured. Please check your configuration.</p>
          <button
            className={style.button + " " + style.primaryButton}
            onClick={() => setScreen('WELCOME')}
          >
            Back to Welcome
          </button>
        </div>
      </div>
    );
  }

  const auth = getAuth(app);

  const createInitialUserDocument = async (user, trainerName) => {
    if (!db || !user || !trainerName) return;
    
    try {
      const userDocRef = doc(db, 'artifacts', 'default-app-id', 'users', user.uid, 'profile', 'data');
      
      const profileData = {
        userId: user.uid,
        trainerName: trainerName,
        email: user.email,
        isProfileComplete: false,
        pokedex: [],
        pokemon_inventory: [],
        friends: [],
        achievements: [],
        createdAt: new Date().toISOString(),
      };
      
      await setDoc(userDocRef, profileData);
    } catch (error) {
      console.error("Error creating initial user document:", error);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    setIsLoadingAuth(true);
    
    // Use a dummy domain for Firebase Auth
    const email = username.toLowerCase() + "@crystal.skies";
    
    try {
      if (isLogin) {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        if (onAuthSuccess) {
          onAuthSuccess(userCredential.user);
        }
      } else {
        // Sign up
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        // IMMEDIATELY create the user document with the trainerName
        if (userCredential.user) {
          await createInitialUserDocument(userCredential.user, username);
        }
        if (onAuthSuccess) {
          onAuthSuccess(userCredential.user);
        }
      }
    } catch (error) {
      console.error("Auth Error:", error);
      let message = 'An unknown error occurred.';
      if (error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        message = 'Invalid username or password.';
      } else if (error.code === 'auth/user-not-found') {
        message = 'No account found with this username.';
      } else if (error.code === 'auth/email-already-in-use') {
        message = 'This username is already taken.';
      } else if (error.code === 'auth/weak-password') {
        message = 'Password should be at least 6 characters.';
      }
      setAuthError(message);
    } finally {
      setIsLoadingAuth(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-[#f5f5dc] text-black">
      <div className={style.card + " max-w-md w-full"}>
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {isLogin ? 'Trainer Login' : 'Trainer Sign Up'}
        </h2>
        <form onSubmit={handleAuthSubmit} className="space-y-4">
          <input 
            type="text" 
            placeholder="Username" 
            className={style.input} 
            required 
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input 
            type="password" 
            placeholder="Password" 
            className={style.input} 
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {authError && <p className="text-red-600 text-xs text-center">{authError}</p>}
          <button 
            type="submit" 
            className={style.button + " " + style.primaryButton + " w-full"}
            disabled={isLoadingAuth}
          >
            {isLoadingAuth ? 'Loading...' : (isLogin ? 'Log In' : 'Sign Up')}
          </button>
        </form>
        <button
          className="mt-4 w-full text-xs text-gray-700 hover:text-red-600 transition-colors"
          onClick={() => setIsLogin(!isLogin)}
          disabled={isLoadingAuth}
        >
          {isLogin ? 'Need an account? Sign Up' : 'Already have an account? Log In'}
        </button>
        <button
          className="mt-2 w-full text-xs text-gray-600 hover:text-black transition-colors"
          onClick={() => setScreen('WELCOME')}
          disabled={isLoadingAuth}
        >
          ← Back to Welcome
        </button>
      </div>
    </div>
  );
}

