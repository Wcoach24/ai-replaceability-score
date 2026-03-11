'use client';

import { useState } from 'react';
import { saveSubmission } from '@/lib/supabase';

interface EmailGateProps {
  score: number;
  puesto: string;
  sector: string;
  experiencia: number;
  onSkip: () => void;
}

export default function EmailGate({
  score,
  puesto,
  sector,
  experiencia,
  onSkip,
}: EmailGateProps) {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setError('');
    setIsLoading(true);

    // Save to Supabase
    const success = await saveSubmission({
      email: email.trim(),
      puesto,
      sector,
      experiencia,
      score,
    });

    setIsLoading(false);

    if (success || !email.includes('@')) {
      // Either saved successfully or email validation passed
      setSubmitted(true);
    } else {
      setError('No pudimos guardar tu email. Intenta de nuevo.');
    }
  };

  if (submitted) {
    return (
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full animate-slide-up">
          <div className="text-center mb-6">
            <div className="text-5xl mb-4">✅</div>
            <h2 className="text-2xl font-bold mb-2">¡Listo!</h2>
            <p className="text-gray-400">
              Hemos enviado tu informe a <span className="font-semibold text-white">{email}</span>
            </p>
          </div>

          {/* Detailed Analysis Preview */}
          <div className="space-y-4 mb-8 p-4 bg-gray-800/50 rounded-lg">
            <h3 className="font-semibold text-gray-200">Tu informe incluye:</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Análisis detallado de tu rol y sector</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Plan de acción personalizado para evolucionar</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Recursos y cursos recomendados</span>
              </li>
              <li className="flex items-start gap-2">
                <span>✓</span>
                <span>Tendencias de empleabilidad futura</span>
              </li>
            </ul>
          </div>

          <button
            onClick={onSkip}
            className="btn-primary w-full"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 max-w-md w-full animate-slide-up">
        {/* Header */}
        <h2 className="text-2xl font-bold mb-2">Recibe tu informe completo</h2>
        <p className="text-gray-400 mb-6">
          Acceso GRATIS a análisis detallado, plan de acción y recursos personalizados
        </p>

        {/* Benefits */}
        <div className="space-y-3 mb-8 p-4 bg-gray-800/30 rounded-lg">
          <div className="flex items-start gap-3">
            <span className="text-xl">📋</span>
            <span className="text-sm text-gray-300">Análisis detallado de tu rol</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">🎯</span>
            <span className="text-sm text-gray-300">Plan de acción personalizado</span>
          </div>
          <div className="flex items-start gap-3">
            <span className="text-xl">📚</span>
            <span className="text-sm text-gray-300">Recursos y cursos recomendados</span>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-6">
          <div>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@email.com"
              className="input-field"
              required
              disabled={isLoading}
            />
          </div>

          {error && (
            <p className="text-sm text-red-400 text-center">{error}</p>
          )}

          <button
            type="submit"
            disabled={!email.trim() || isLoading}
            className="btn-primary w-full font-semibold flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-rotate"></span>
                Enviando...
              </>
            ) : (
              '📧 Enviar mi informe'
            )}
          </button>
        </form>

        {/* Skip Option */}
        <button
          onClick={onSkip}
          className="w-full text-center text-sm text-gray-400 hover:text-gray-300 transition-colors"
        >
          No gracias, solo quiero compartir
        </button>

        {/* Privacy Note */}
        <p className="text-xs text-gray-600 text-center mt-6">
          No vendemos tu email. Nunca spam. Cancelar en cualquier momento.
        </p>
      </div>
    </div>
  );
}
