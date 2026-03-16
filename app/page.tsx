'use client';

import { useState, useEffect } from 'react';
import Landing from '@/components/Landing';
import Loading from '@/components/Loading';
import Result from '@/components/Result';
import EmailGate from '@/components/EmailGate';
import { calculateScore } from '@/lib/scoring';
import type { ScoringResult } from '@/lib/scoring';

type AppState = 'landing' | 'loading' | 'result' | 'emailGate';

interface FormData {
  puesto: string;
  sector: string;
  experiencia: number;
}

export default function Home() {
  const [state, setState] = useState<AppState>('landing');
  const [counter, setCounter] = useState(12000);
  const [formData, setFormData] = useState<FormData | null>(null);
  const [result, setResult] = useState<ScoringResult | null>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter(prev => prev + Math.floor(Math.random() * 3) + 1);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleLandingSubmit = (data: FormData) => {
    setFormData(data);
    setState('loading');

    setTimeout(() => {
      const scoreResult = calculateScore(data.puesto, data.sector, data.experiencia);
      setResult(scoreResult);
      setState('result');
    }, 12000);
  };

  const handleEmailGateSkip = () => {
    setState('landing');
    setFormData(null);
    setResult(null);
  };

  return (
    <main className="w-full min-h-screen">
      {state === 'landing' && (
        <Landing onSubmit={handleLandingSubmit} counter={counter} />
      )}

      {state === 'loading' && <Loading duration={12000} />}

      {state === 'result' && result && formData && (
        <Result
          {...result}
          puesto={formData.puesto}
          sector={formData.sector}
          experiencia={formData.experiencia}
          onEmailGate={() => setState('emailGate')}
        />
      )}

      {state === 'emailGate' && result && formData && (
        <EmailGate
          score={result.score}
          puesto={formData.puesto}
          sector={formData.sector}
          experiencia={formData.experiencia}
          onSkip={handleEmailGateSkip}
        />
      )}
    </main>
  );
}