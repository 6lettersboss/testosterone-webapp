import React, { useState } from 'react';
import { estimateTestosterone } from '../utils/algorithm';

export default function Home() {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [result, setResult] = useState<number | null>(null);

  const handleSubmit = () => {
    if (!email || !consent) {
      alert('이메일과 개인정보 활용에 모두 동의해야 측정이 가능합니다.');
      return;
    }
    const mockInput = { hrv: 52, age: 30 };
    const value = estimateTestosterone(mockInput);
    setResult(value);
  };

  return (
    <div style={{ fontFamily: 'sans-serif', padding: 40 }}>
      <h1>6Letters 테스토스테론 측정</h1>
      <input
        type="email"
        placeholder="이메일 입력"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ padding: 10, marginBottom: 10, display: 'block' }}
      />
      <label>
        <input
          type="checkbox"
          checked={consent}
          onChange={() => setConsent(!consent)}
        />
        개인정보 활용 및 이메일 수신에 동의합니다
      </label>
      <button onClick={handleSubmit} style={{ marginTop: 10 }}>
        테스토스테론 측정하기
      </button>
      {result !== null && (
        <p>예상 테스토스테론 수치: {result.toFixed(2)} ng/dL</p>
      )}
    </div>
  );
}
