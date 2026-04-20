function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // New state for errors

  const handleAuthentication = async (e) => {
    e.preventDefault();
    setErrorMsg(''); // Clear old errors
    try {
      if (isRegistering) {
        await createUserWithEmailAndPassword(auth, email.trim(), password);
      } else {
        await signInWithEmailAndPassword(auth, email.trim(), password);
      }
    } catch (error) {
      // Map the generic error to something helpful
      if (error.code === 'auth/invalid-credential') {
        setErrorMsg("Wrong email or password. Try signing up!");
      } else {
        setErrorMsg(error.message);
      }
    }
  };

  return (
    <div style={{ /* your existing styles */ }}>
      <h2>{isRegistering ? 'Register' : 'Login'}</h2>
      
      {/* Show the error message in red if it exists */}
      {errorMsg && <p style={{ color: '#ff6b6b', fontSize: '12px' }}>{errorMsg}</p>}

      <form onSubmit={handleAuthentication} style={{ /* ... */ }}>
        {/* ... inputs ... */}
      </form>
      {/* ... toggle button ... */}
    </div>
  );
}