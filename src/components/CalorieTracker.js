import { useState } from "react";
import { calculateCalories } from "../utils/calculateCalories";
import { db } from "../firebase";
import { collection, addDoc } from "firebase/firestore";

export default function CalorieTracker() {
  const [food, setFood] = useState("");
  const [grams, setGrams] = useState("");
  const [calPer100g, setCalPer100g] = useState("");
  const [logs, setLogs] = useState([]);

  const handleAdd = async () => {
    if (!food || !grams || !calPer100g) return;

    const calories = calculateCalories(
      Number(grams),
      Number(calPer100g)
    );

    const newEntry = {
      food,
      grams: Number(grams),
      calories,
      timestamp: new Date()
    };

    // save to Firebase
    await addDoc(collection(db, "foodLogs"), newEntry);

    // update UI locally
    setLogs([newEntry, ...logs]);

    // clear inputs
    setFood("");
    setGrams("");
    setCalPer100g("");
  };

  const totalCalories = logs.reduce(
    (sum, item) => sum + item.calories,
    0
  );

  return (
    <div style={{ padding: 20 }}>
      <h2>🍽️ Calorie Tracker</h2>

      <input
        placeholder="Food name"
        value={food}
        onChange={(e) => setFood(e.target.value)}
      />

      <input
        placeholder="Grams"
        type="number"
        value={grams}
        onChange={(e) => setGrams(e.target.value)}
      />

      <input
        placeholder="Calories per 100g"
        type="number"
        value={calPer100g}
        onChange={(e) => setCalPer100g(e.target.value)}
      />

      <button onClick={handleAdd}>➕ Add Food</button>

      <h3>🔥 Total Calories: {totalCalories}</h3>

      <ul>
        {logs.map((item, index) => (
          <li key={index}>
            {item.food} — {item.calories} kcal
          </li>
        ))}
      </ul>
    </div>
  );
}