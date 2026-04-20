import React, { useState, useEffect } from 'react';
import './App.css';
import Auth from './Auth'; 
import Profile from './Profile';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

function App() {
  const [user, setUser] = useState(null);
  // New state to track if we should show the Dashboard or the Profile setup
  const [hasCompletedSetup, setHasCompletedSetup] = useState(false);
  const [dailyGoal, setDailyGoal] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      // Reset setup status if user logs out
      if (!currentUser) {
        setHasCompletedSetup(false);
        setDailyGoal(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
  };

  // This function is triggered when "ENTER APP" is clicked in Profile.js
  const handleSetupComplete = (calories) => {
    setDailyGoal(calories);
    setHasCompletedSetup(true);
  };

  return (
    <div className="App">
      <div className="tamagotchi-shell">
        <div className="tamagotchi-screen">
          <h1>PetFit 🐱</h1>
          
          {!user && <p className="subtitle">Track your health, feed your pet</p>}
          
          {user ? (
            // Logic: If logged in AND setup is done, show the pet/dashboard.
            // Otherwise, show the Profile setup screen.
            hasCompletedSetup ? (
              <div className="dashboard">
                <h3>Goal: {dailyGoal} kcal</h3>
                <p>Welcome to the game!</p>
                {/* Your Pet/Game component would go here */}
                <button onClick={() => setHasCompletedSetup(false)} style={{fontSize: '10px'}}>Edit Profile</button>
                <br />
                <button onClick={handleLogout} style={logoutLinkStyle}>Log Out</button>
              </div>
            ) : (
              <Profile onLogout={handleLogout} onSetupComplete={handleSetupComplete} />
            )
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

const logoutLinkStyle = {
  marginTop: '10px',
  background: 'none',
  border: 'none',
  color: '#2b331f',
  textDecoration: 'underline',
  cursor: 'pointer'
};

export default App;