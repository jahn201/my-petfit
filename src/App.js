import './App.css';
import Auth from './Auth'; 

function App() {
  return (
    <div className="App">
      <div className="tamagotchi-shell">
        
        <div className="tamagotchi-screen">
          <h1>PetFit 🐱</h1>
          <p className="subtitle">Track your pet's health</p>
          
          {/* Your login box renders inside the screen */}
          <Auth />
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