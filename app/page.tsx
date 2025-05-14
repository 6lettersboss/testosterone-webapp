
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

export default function TestosteroneEstimator() {
  const [inputs, setInputs] = useState({
    age: "",
    height: "",
    weight: "",
    sex: "M",
    diabetes: false,
    apnea: false,
    hypertension: false,
    liver: false,
    thyroid: false,
    steroid: false,
    opioid: false,
    antifungal: false,
    spironolactone: false,
    cimetidine: false,
    clomiphene: false,
    hcg: false,
    antiestrogen: false,
    alcohol: false,
    exercise: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setInputs({
      ...inputs,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const calculateTestosterone = () => {
    const base = inputs.sex === "M"
      ? (inputs.age < 40 ? 500 : inputs.age < 60 ? 450 : 400)
      : 60;

    const heightM = parseFloat(inputs.height) / 100;
    const bmi = parseFloat(inputs.weight) / (heightM * heightM);
    const bmiPenalty = bmi > 25 ? Math.floor((bmi - 25) / 5) * -10 : 0;

    const changes = [
      bmiPenalty,
      inputs.diabetes ? -50 : 0,
      inputs.apnea ? -15 : 0,
      inputs.hypertension ? -5 : 0,
      inputs.liver ? -20 : 0,
      inputs.thyroid ? -15 : 0,
      inputs.steroid ? -45 : 0,
      inputs.opioid ? -40 : 0,
      inputs.antifungal ? -40 : 0,
      inputs.spironolactone ? -25 : 0,
      inputs.cimetidine ? -15 : 0,
      inputs.clomiphene ? 45 : 0,
      inputs.hcg ? 45 : 0,
      inputs.antiestrogen ? 30 : 0,
      inputs.alcohol ? -30 : 0,
      inputs.exercise ? 30 : 0
    ];

    const total = base + changes.reduce((a, b) => a + b, 0);
    const diff = Math.abs((total - base) / base);
    const status = diff <= 0.1 ? "정상" : `${Math.round((total - base) / base * 100)}% ${total > base ? "높음" : "낮음"}`;

    return { bmi: Math.round(bmi * 10) / 10, result: total, status };
  };

  const { bmi, result, status } = calculateTestosterone();

  return (
    <Card className="max-w-3xl mx-auto p-6 space-y-4">
      <CardContent className="space-y-4">
        <h2 className="text-2xl font-bold">Testosterone Calculator</h2>
        <div className="grid grid-cols-2 gap-4">
          <div><Label>Age</Label><Input name="age" value={inputs.age} onChange={handleChange} /></div>
          <div>
            <Label>Sex</Label>
            <select name="sex" value={inputs.sex} onChange={handleChange} className="w-full border rounded p-2">
              <option value="M">Male</option>
              <option value="F">Female</option>
            </select>
          </div>
          <div><Label>Height (cm)</Label><Input name="height" value={inputs.height} onChange={handleChange} /></div>
          <div><Label>Weight (kg)</Label><Input name="weight" value={inputs.weight} onChange={handleChange} /></div>
        </div>

        <div className="mt-4">
          <Label>Conditions & Lifestyle</Label>
          <div className="grid grid-cols-2 gap-2 text-sm mt-2">
            {[
              ["diabetes", "Type 2 Diabetes"],
              ["apnea", "Sleep Apnea"],
              ["hypertension", "Hypertension/Cardiac"],
              ["liver", "Liver/Kidney Disease"],
              ["thyroid", "Hypothyroidism"],
              ["steroid", "Glucocorticoids"],
              ["opioid", "Opioids"],
              ["antifungal", "Antifungals"],
              ["spironolactone", "Spironolactone"],
              ["cimetidine", "Cimetidine"],
              ["clomiphene", "Clomiphene"],
              ["hcg", "hCG"],
              ["antiestrogen", "Antiestrogens"],
              ["alcohol", "Chronic Alcohol"],
              ["exercise", "Regular Exercise"]
            ].map(([key, label]) => (
              <label key={key} className="flex items-center gap-2">
                <input type="checkbox" name={key} checked={inputs[key]} onChange={handleChange} />
                {label}
              </label>
            ))}
          </div>
        </div>

        <div className="mt-6 text-center space-y-2">
          <p className="text-lg font-semibold">BMI: {bmi}</p>
          <p className="text-lg font-semibold">Estimated Testosterone: {result} ng/dL</p>
          <p className="text-md">Status: <span className="font-bold">{status}</span></p>
        </div>
      </CardContent>
    </Card>
  );
}
