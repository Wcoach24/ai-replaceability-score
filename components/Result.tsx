'use client';

import { useState } from 'react';

interface ResultProps {
  score: number;
  timeline: string;
  riskLevel: 'bajo' | 'medio' | 'alto' | 'muy alto';
  factors: string[];
  puesto: string;
  onEmailGate: () => void;
}

export default function Result({
  score,
  timeline,
  riskLevel,
  factors,
  puesto,
  onEmailGate,
}: ResultProps) {
  const [copied, setCopied] = useState(false);

  // Color logic for gauge
  const getGaugeColor = () => {
    if (score < 30) return '#10b981'; // green
    if (score < 60) return '#eab308'; // yellow
    if (score < 80) return '#f97316'; // orange
    return '#ef4444'; // red
  };

  const getRiskColor = () => {
    switch (riskLevel) {
      case 'bajo':
        return 'bg-green-900/30 border-green-700 text-green-300';
      case 'medio':
        return 'bg-yellow-900/30 border-yellow-700 text-yellow-300';
      case 'alto':
        return 'bg-orange-900/30 border-orange-700 text-orange-300';
      case 'muy alto':
        return 'bg-red-900/30 border-red-700 text-red-300';
    }
  };

  const getRiskLabel = () => {
    switch (riskLevel) {
      case 'bajo':
        return '🟢 Riesgo Bajo';
      case 'medio':
        return '🟡 Riesgo Medio';
      case 'alto':
        return '🟠 Riesgo Alto';
      case 'muy alto':
        return '🔴 Riesgo Muy Alto';
    }
  };

  // Share handlers
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: 'linkedin' | 'twitter' | 'whatsapp') => {
    let url = '';
    const text = `Mi AI Replaceability Score es ${score}% | ¿Cuál es el tuyo?`;
    const fullUrl = shareUrl;

    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(fullUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${fullUrl}`)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${text} ${fullUrl}`)}`;
        break;
    }

    if (url) window.open(url, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 particle-grid">
      <div className="w-full max-w-lg animate-fade-in">
        {/* Score Gauge */}
        <div className="flex justify-center mb-12">
          <div className="relative w-48 h-48">
            <svg
              viewBox="0 0 200 200"
              className="w-full h-full"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Background circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke="#374151"
                strokeWidth="8"
                opacity="0.3"
              />

              {/* Progress circle */}
              <circle
                cx="100"
                cy="100"
                r="90"
                fill="none"
                stroke={getGaugeColor()}
                strokeWidth="8"
                strokeDasharray={`${(score / 100) * 565} 565`}
                strokeLinecap="round"
                opacity="0.9"
                transform="rotate(-90 100 100)"
              />

              {/* Score text */}
              <text
                x="100"
                y="95"
                textAnchor="middle"
                fontSize="48"
                fontWeight="bold"
                fill="white"
                fontFamily="system-ui"
              >
                {score}%
              </text>
              <text
                x="100"
                y="125"
                textAnchor="middle"
                fontSize="14"
                fill="#9ca3af"
                fontFamily="system-ui"
              >
                Risk Score
              </text>
            </svg>
          </div>
        </div>

        {/* Risk Level Badge */}
        <div className="flex justify-center mb-8">
          <div className={`px-4 py-2 border rounded-full font-semibold ${getRiskColor()}`}>
            {getRiskLabel()}
          </div>
        </div>

        {/* Main Message */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            Tu trabajo tiene un <span className="text-purple-400">{score}%</span> de probabilidad
          </h2>
          <p className="text-gray-400 text-lg">
            de ser automatizado en los próximos <span className="font-semibold text-white">{timeline}</span>
          </p>
        </div>

        {/* Risk Factors */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-gray-200 mb-4">
            📊 Factores de riesgo
          </h3>
          <div className="space-y-3">
            {factors.map((factor, idx) => (
              <div key={idx} className="card flex items-start gap-3">
                <span className="text-xl">⚠️</span>
                <p className="text-gray-300">{factor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Share Section */}
        <div className="mb-10">
          <h3 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wide">
            Comparte tu resultado
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              onClick={() => handleShare('linkedin')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              💼 LinkedIn
            </button>
            <button
              onClick={() => handleShare('twitter')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              𝕏 X/Twitter
            </button>
            <button
              onClick={() => handleShare('whatsapp')}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              💬 WhatsApp
            </button>
            <button
              onClick={handleCopyLink}
              className="btn-secondary flex items-center justify-center gap-2"
            >
              {copied ? '✅ Copiado!' : '🔗 Copiar'}
            </button>
          </div>
        </div>

        {/* Email Gate CTA */}
        <button
          onClick={onEmailGate}
          className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 mb-8"
        >
          🔓 Desbloquea tu informe completo GRATIS
        </button>

        {/* Job Info */}
        <div className="text-center text-sm text-gray-500 p-4 bg-gray-900/30 rounded-lg border border-gray-800">
          <p>
            Score para: <span className="text-gray-300 font-semibold capitalize">{puesto}</span>
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-6 text-center">
        <p className="text-gray-500 text-sm">Hecho con ❤️ y AI</p>
      </div>
    </div>
  );
}
