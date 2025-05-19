
export function estimateTestosterone({ age, sex, height, weight, sleep, stress, exercise, diseases }) {
  const bmi = weight / ((height / 100) ** 2);
  let t = 6.5;
  t += sex === 'male' ? 0.5 : -0.5;
  if (age > 30) t -= (age - 30) * 0.03;
  t += sleep >= 7 ? 0.2 : -0.2;
  t -= stress * 0.15;
  t += exercise >= 3 ? 0.3 : exercise === 0 ? -0.3 : 0;
  t += bmi > 27 ? -0.3 : bmi < 20 ? 0.2 : 0;
  t -= diseases.length * 0.3;
  return Math.min(Math.max(t, 2.0), 10.0).toFixed(2);
}
