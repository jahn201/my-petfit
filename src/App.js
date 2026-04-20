import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './Auth'; 
import Profile from './Profile';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null); // Keeps track of the logged-in user

  // Listen to Firebase to see if the user logs in or out
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, []);

  // Function to log the user out
  const handleLogout = async () => {
    await signOut(auth);
  };

  return (
    <div className="App">
      <div className="tamagotchi-shell">
        
        <div className="tamagotchi-screen">
          <h1>PetFit 🐱</h1>
          
          {/* If there is NO user, show the subtitle. If logged in, hide it to save screen space */}
          {!user && <p className="subtitle">Track your pet's health</p>}
          
          {/* THE SCREEN SWITCHER: Show Profile if logged in, otherwise show Auth */}
          {user ? (
            <Profile onLogout={handleLogout} />
          ) : (
            <Auth />
          )}

        </div>

        <div className="tamagotchi-buttons">
          <div className="button"></div>
          <div className="button"></div>
          <div className="button"></div>
        </div>

      </div>
    </div>
  );
}

export default App;