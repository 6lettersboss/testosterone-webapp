
import { useState } from 'react';
import { estimateTestosterone } from '../utils/algorithm';

export default function Home() {
  const [formData, setFormData] = useState({
    email: '',
    agreePrivacy: false,
    agreeEmail: false,
    age: 30,
    sex: 'male',
    height: 175,
    weight: 70,
    sleep: 7,
    stress: 1,
    exercise: 3,
    diseases: ''
  });

  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : ['age','height','weight','sleep','stress','exercise'].includes(name) ? parseFloat(value) : value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.email || !formData.agreePrivacy || !formData.agreeEmail) {
      setError('이메일을 입력하고 모든 동의 항목에 체크해야 측정할 수 있습니다.');
      return;
    }
    setError('');
    const diseaseList = formData.diseases.split(',').map(d => d.trim()).filter(d => d);
    const tValue = estimateTestosterone({ ...formData, diseases: diseaseList });
    setResult(tValue);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-2xl font-bold mb-4 text-center">🧪 테스토스테론 추정기</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일 입력" className="w-full border p-2" required />
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="agreePrivacy" checked={formData.agreePrivacy} onChange={handleChange} />
            <label>개인정보 수집 및 이용에 동의합니다.</label>
          </div>
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="agreeEmail" checked={formData.agreeEmail} onChange={handleChange} />
            <label>이메일 수신에 동의합니다.</label>
          </div>
          <input type="number" name="age" value={formData.age} onChange={handleChange} placeholder="나이" className="w-full border p-2" />
          <select name="sex" value={formData.sex} onChange={handleChange} className="w-full border p-2">
            <option value="male">남성</option>
            <option value="female">여성</option>
          </select>
          <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="키 (cm)" className="w-full border p-2" />
          <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="몸무게 (kg)" className="w-full border p-2" />
          <input type="number" name="sleep" value={formData.sleep} onChange={handleChange} placeholder="수면 시간" className="w-full border p-2" />
          <input type="number" name="stress" value={formData.stress} onChange={handleChange} placeholder="스트레스 (0~3)" className="w-full border p-2" />
          <input type="number" name="exercise" value={formData.exercise} onChange={handleChange} placeholder="운동 횟수 (주당)" className="w-full border p-2" />
          <input type="text" name="diseases" value={formData.diseases} onChange={handleChange} placeholder="만성질환 (쉼표 구분)" className="w-full border p-2" />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-lg mt-4">테스토스테론 추정</button>
        </form>
        {error && <p className="text-red-600 mt-4">{error}</p>}
        {result && (
          <div className="mt-6 text-center">
            <p className="text-lg">📊 예상 테스토스테론 수치: <strong>{result} ng/mL</strong></p>
          </div>
        )}
      </div>
    </div>
  );
}
