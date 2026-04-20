import React, { useState } from 'react';

function Profile({ onLogout, onSetupComplete }) {
  const [userName, setUserName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('female');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [goal, setGoal] = useState('maintain');
  const [calories, setCalories] = useState(null);

  const calculateCalories = (e) => {
    e.preventDefault();
    
    // Convert strings to numbers
    const w = parseFloat(weight);
    const h = parseFloat(height);
    const a = parseInt(age);

    // FIX: Check if the numbers are actually valid
    if (!w || !h || !a) {
      alert("Please enter numbers for Weight, Height, and Age!");
      return;
    }

    // Mifflin-St Jeor Formula
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    let tdee = bmr * 1.2;

    if (goal === 'lose') tdee -= 500;
    if (goal === 'gain') tdee += 500;

    setCalories(Math.round(tdee));
  };

  return (
    <div style={{ padding: '10px', textAlign: 'center', color: '#2b331f' }}>
      <h2 style={{ fontSize: '1.2rem' }}>{userName ? `${userName}'s Stats` : 'User Profile'}</h2>
      
      <form onSubmit={calculateCalories} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input 
          placeholder="Name" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          style={inputStyle}
        />
        
        <div style={{ display: 'flex', gap: '5px' }}>
          <input 
            type="number" 
            placeholder="Age" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            style={{ ...inputStyle, flex: 1 }}
          />
          <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ ...inputStyle, flex: 1 }}>
            <option value="female">Female</option>
            <option value="male">Male</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: '5px' }}>
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

        <select value={goal} onChange={(e) => setGoal(e.target.value)} style={inputStyle}>
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Weight</option>
        </select>

        <button type="submit" style={{ padding: '8px', cursor: 'pointer', backgroundColor: '#2b331f', color: 'white', border: 'none', borderRadius: '4px' }}>
          Calculate Goal
        </button>
      </form>

      {calories && (
        <div style={{ marginTop: '15px' }}>
          <div style={{ padding: '10px', border: '2px dashed #2b331f', background: '#f9f9f9' }}>
            <strong>Target: {calories} kcal/day</strong>
          </div>
          
          <button 
            onClick={() => onSetupComplete(calories)} 
            style={{ marginTop: '10px', width: '100%', padding: '10px', backgroundColor: '#4a5d23', color: 'white', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}
          >
            ENTER APP ➡️
          </button>
        </div>
      )}

      <button onClick={onLogout} style={{ marginTop: '15px', background: 'none', border: 'none', color: '#888', textDecoration: 'underline', cursor: 'pointer', fontSize: '12px' }}>
        Log Out
      </button>
    </div>
  );
}

const inputStyle = { padding: '8px', borderRadius: '4px', border: '1px solid #ccc' };

export default Profile;