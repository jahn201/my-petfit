import React, { useState } from 'react';

function Profile({ onLogout }) {
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

    // Human BMR Formula (Mifflin-St Jeor)
    let bmr = (10 * w) + (6.25 * h) - (5 * a);
    bmr = gender === 'male' ? bmr + 5 : bmr - 161;

    // Total Daily Energy Expenditure (Assuming sedentary/light activity multiplier of 1.2)
    let tdee = bmr * 1.2;

    // Adjust based on fitness goals (Standard safe deficit/surplus is 500 calories)
    if (goal === 'lose') tdee -= 500;
    if (goal === 'gain') tdee += 500;

    setCalories(Math.round(tdee));
  };

  return (
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'center' }}>
      <h2>{userName ? `${userName}'s Stats` : 'User Profile'}</h2>
      
      <form onSubmit={calculateCalories} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <input 
          type="text" 
          placeholder="Your Name" 
          value={userName} 
          onChange={(e) => setUserName(e.target.value)} 
          required 
        />
        
        <div style={{ display: 'flex', gap: '5px' }}>
          <input 
            type="number" 
            placeholder="Age" 
            value={age} 
            onChange={(e) => setAge(e.target.value)} 
            required 
            min="10"
            style={{ width: '50%' }}
          />
          <select 
            value={gender} 
            onChange={(e) => setGender(e.target.value)}
            style={{ width: '50%', padding: '8px', border: '2px solid #2b331f', backgroundColor: '#9ea78b', color: '#2b331f', fontFamily: "'Courier New', Courier, monospace", outline: 'none' }}
          >
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
            required 
            min="50"
            style={{ width: '50%' }}
          />
          <input 
            type="number" 
            placeholder="Weight (kg)" 
            value={weight} 
            onChange={(e) => setWeight(e.target.value)} 
            required 
            step="0.1"
            min="20"
            style={{ width: '50%' }}
          />
        </div>

        <select 
          value={goal} 
          onChange={(e) => setGoal(e.target.value)}
          style={{ padding: '8px', border: '2px solid #2b331f', backgroundColor: '#9ea78b', color: '#2b331f', fontFamily: "'Courier New', Courier, monospace", outline: 'none' }}
        >
          <option value="lose">Lose Weight</option>
          <option value="maintain">Maintain Weight</option>
          <option value="gain">Gain Muscle/Weight</option>
        </select>

        <button type="submit" style={{ marginTop: '5px' }}>Calculate Goal</button>
      </form>

      {/* Shows the result only after calculating */}
      {calories && (
        <div style={{ marginTop: '10px', padding: '10px', border: '2px dashed #2b331f' }}>
          <strong>Target: {calories} kcal/day</strong>
        </div>
      )}

      <button onClick={onLogout} style={{ marginTop: '10px', background: 'none', border: 'none', color: '#2b331f', textDecoration: 'underline', cursor: 'pointer' }}>
        Log Out
      </button>
    </div>
  );
}

export default Profile;