import React, { useState } from 'react';
import { auth } from './firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleAuthentication = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Clear previous errors

    try {
      // Use .trim() to remove accidental spaces at the end of the email
      const cleanEmail = email.trim();

      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, cleanEmail, password);
        alert('User Registered Successfully! 🎉');
      } else {
        await signInWithEmailAndPassword(auth, cleanEmail, password);
        // Alert is optional here, App.js will automatically switch screens
      }
    } catch (error) {
      console.error(error.code);
      
      // Friendly error messages for your friend/user
      if (error.code === 'auth/invalid-credential') {
        setErrorMsg("Incorrect email or password. If you're new, click 'Sign up' below.");
      } else if (error.code === 'auth/weak-password') {
        setErrorMsg("Password should be at least 6 characters.");
      } else if (error.code === 'auth/email-already-in-use') {
        setErrorMsg("This email is already registered. Try logging in.");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div style={{ margin: '10px auto', padding: '15px', border: '1px solid #ccc', borderRadius: '8px', maxWidth: '260px', backgroundColor: '#282c34', color: 'white' }}>
      <h2 style={{ fontSize: '18px' }}>{isRegistering ? 'Sign Up' : 'Login'}</h2>
      
      {/* Error Message Display */}
      {errorMsg && (
        <p style={{ color: '#ff6b6b', fontSize: '11px', marginBottom: '10px', backgroundColor: 'rgba(255,0,0,0.1)', padding: '5px', borderRadius: '4px' }}>
          {errorMsg}
        </p>
      )}

      <form onSubmit={handleAuthentication} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>
          {isRegistering ? 'CREATE ACCOUNT' : 'LOG IN'}
        </button>
      </form>

      <button 
        onClick={() => {
          setIsRegistering(!isRegistering);
          setErrorMsg(''); // Clear error when switching modes
        }} 
        style={toggleButtonStyle}
      >
        {isRegistering ? 'Already have an account? Log in' : 'Need an account? Sign up'}
      </button>
    </div>
  );
}

// Reusable Styles
const inputStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  fontSize: '14px',
  width: '100%',
  boxSizing: 'border-box'
};

const buttonStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: 'none',
  backgroundColor: '#61dafb',
  color: '#282c34',
  fontWeight: 'bold',
  cursor: 'pointer',
  fontSize: '14px'
};

const toggleButtonStyle = {
  marginTop: '15px',
  background: 'none',
  border: 'none',
  color: '#61dafb',
  cursor: 'pointer',
  textDecoration: 'underline',
  width: '100%',
  fontSize: '12px'
};

export default Auth;