import './App.css';
import Auth from './Auth'; 
import CalorieTracker from "./components/CalorieTracker";

function App() {
  return (
    <div className="App">
      <div className="tamagotchi-shell">
        
        <div className="tamagotchi-screen">
          <h1>PetFit 🐱</h1>
          <p className="subtitle">Track your pet's health</p>
          
          <Auth />
          
          <hr style={{ margin: '20px 0', borderColor: '#444' }} />
          <CalorieTracker />
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