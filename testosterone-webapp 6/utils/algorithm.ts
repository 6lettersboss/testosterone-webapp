export function estimateTestosterone(input: { hrv: number; age: number }): number {
  const { hrv, age } = input;
  return 400 + (hrv - age) * 1.5;
}
