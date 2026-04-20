import './App.css';
import Auth from './Auth'; // Importing your new component

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>PetFit 🐶</h1>
        <p>Track your pet's health and calories</p>
        
        {/* This line is what actually renders the login box! */}
        <Auth />
      </header>
    </div>
  );
}

export default App;