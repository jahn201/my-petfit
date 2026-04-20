import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Auth() {
  // These variables hold the email and password as the user types them
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false); // Toggles between Login and Sign Up modes

  const handleAuthentication = async (e) => {
    e.preventDefault(); // Prevents the page from refreshing when you click submit
    try {
      if (isRegistering) {
        // Tell Firebase to create a new user
        await createUserWithEmailAndPassword(auth, email, password);
        alert('User Registered Successfully! 🎉');
      } else {
        // Tell Firebase to log in an existing user
        await signInWithEmailAndPassword(auth, email, password);
        alert('Logged in Successfully! ✅');
      }
    } catch (error) {
      // If they type a bad password, or the email exists, show the error
      alert(error.message); 
    }
  };

  return (
    <div style={{ margin: '20px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '300px', backgroundColor: '#282c34', color: 'white' }}>
      <h2>{isRegistering ? 'Register for PetFit' : 'Login to PetFit'}</h2>
      
      <form onSubmit={handleAuthentication} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: 'none' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '8px', borderRadius: '4px', border: 'none' }}
        />
        <button type="submit" style={{ padding: '10px', borderRadius: '4px', border: 'none', backgroundColor: '#61dafb', fontWeight: 'bold', cursor: 'pointer' }}>
          {isRegistering ? 'Sign Up' : 'Log In'}
        </button>
      </form>

      <button 
        onClick={() => setIsRegistering(!isRegistering)} 
        style={{ marginTop: '15px', background: 'none', border: 'none', color: '#61dafb', cursor: 'pointer', textDecoration: 'underline', width: '100%' }}
      >
        {isRegistering ? 'Already have an account? Log in' : 'Need an account? Sign up'}
      </button>
    </div>
  );
}

export default Auth;