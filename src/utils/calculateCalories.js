export function calculateCalories(grams, caloriesPer100g) {
  return Math.round((grams / 100) * caloriesPer100g);
}