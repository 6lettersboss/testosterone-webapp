
export function estimateTestosterone(input: { hrv: number; age: number }): number {
  const base = 500;
  const hrvFactor = input.hrv * 2;
  const agePenalty = input.age * 3;
  return base + hrvFactor - agePenalty;
}
