import React, { useState } from 'react';

function Profile({ onLogout, onSetupComplete }) {
  // State for form inputs
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('female');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState(null);

  const calculateCalories = (e) => {
    e.preventDefault();
    
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    // Basic validation to prevent NaN results
    if (!w || !h || !a) {
      alert("Please fill in all physical stats.");
      return;
    }

    // Mifflin-St Jeor Formula
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    // TDEE Multiplier (1.2 for sedentary/light activity)
    let tdee = bmr * 1.2;

    // Goal adjustment
    if (goal === 'lose') tdee -= 500;
    if (goal === 'gain') tdee += 500;

    setCalories(Math.round(tdee));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '0 auto', padding: '20px', textAlign: 'center', fontFamily: 'sans-serif' }}>
      <h2 style={{ color: '#2b331f' }}>{userName ? `${userName}'s Stats` : 'User Profile'}</h2>
      
      <form onSubmit={calculateCalories} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input 
          placeholder="First Name" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          style={inputStyle}
        />
        
        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="number" 
            placeholder="Age" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            style={{ ...inputStyle, flex: 1 }}
          />
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)} 
            style={{ ...inputStyle, flex: 1 }}
          >
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '10px' }}>
          <input 
            type="number" 
            placeholder="Height (cm)" 
            value={height} 
            onChange={(e) => setHeight(e.target.value)} 
            style={{ ...inputStyle, flex: 1 }}
          />
          <input 
            type="number" 
            placeholder="Weight (kg)" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            style={{ ...inputStyle, flex: 1 }}
          />
        </div>

        <select 
          value={goal} 
          onChange={(e) => setGoal(e.target.value)} 
          style={inputStyle}
        >
          <option value="lose">Lose Weight (-500 kcal)</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight (+500 kcal)</option>
        </select>

        <button 
          type="submit" 
          style={{ 
            marginTop: '10px', 
            padding: '10px', 
            backgroundColor: '#2b331f', 
            color: 'white', 
            border: 'none', 
            borderRadius: '4px',
            cursor: 'pointer' 
          }}
        >
          Calculate Daily Goal
        </button>
      </form>

      {calories && (
        <div style={{ marginTop: '20px', border: '2px dashed #2b331f', padding: '15px', borderRadius: '8px' }}>
          <p style={{ margin: '0 0 10px 0' }}>Your Daily Target:</p>
          <h3 style={{ margin: '0 0 15px 0' }}>{calories} kcal</h3>
          
          <button 
            onClick={() => onSetupComplete(calories)} 
            style={{ 
              width: '100%', 
              padding: '12px', 
              backgroundColor: '#2b331f', 
              color: '#9ea78b', 
              fontWeight: 'bold',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            ENTER APP ➡️
          </button>
        </div>
      )}

      <button 
        onClick={onLogout} 
        style={{ 
          marginTop: '25px', 
          background: 'none', 
          border: 'none', 
          color: '#2b331f', 
          textDecoration: 'underline', 
          cursor: 'pointer',
          fontSize: '0.9rem'
        }}
      >
        Log Out
      </button>
    </div>
  );
}

// Simple internal style object to keep the code clean
const inputStyle = {
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  fontSize: '1rem'
};

export default Profile;