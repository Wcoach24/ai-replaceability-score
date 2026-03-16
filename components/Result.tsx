'use client';

import { useState } from 'react';
import type { ScoringResult } from '@/lib/scoring';

interface ResultProps extends ScoringResult {
  puesto: string;
  sector: string;
  experiencia: number;
  onEmailGate: () => void;
}

export default function Result({
  score,
  timeline,
  riskLevel,
  riskColor,
  factors,
  insight,
  automationWave,
  sectorTrend,
  sectorIcon,
  jobIcon,
  recommendations,
  puesto,
  sector,
  experiencia,
  onEmailGate,
}: ResultProps) {
  const [copied, setCopied] = useState(false);
  const [showRecommendations, setShowRecommendations] = useState(false);

  const getBgGradient = () => {
    switch (riskLevel) {
      case 'muy alto': return 'from-red-950/40 via-gray-950 to-orange-950/30';
      case 'alto': return 'from-orange-950/30 via-gray-950 to-yellow-950/20';
      case 'medio': return 'from-yellow-950/20 via-gray-950 to-blue-950/20';
      case 'bajo': return 'from-emerald-950/30 via-gray-950 to-cyan-950/20';
    }
  };

  const getRiskBadgeStyle = () => {
    switch (riskLevel) {
      case 'muy alto': return 'bg-red-500/20 border-red-500/50 text-red-300';
      case 'alto': return 'bg-orange-500/20 border-orange-500/50 text-orange-300';
      case 'medio': return 'bg-yellow-500/20 border-yellow-500/50 text-yellow-300';
      case 'bajo': return 'bg-emerald-500/20 border-emerald-500/50 text-emerald-300';
    }
  };

  const getRiskEmoji = () => {
    switch (riskLevel) {
      case 'muy alto': return '🔴';
      case 'alto': return '🟠';
      case 'medio': return '🟡';
      case 'bajo': return '🟢';
    }
  };

  const getScoreMessage = () => {
    if (score >= 75) return 'de ser transformado por la IA';
    if (score >= 50) return 'de sufrir cambios significativos por la IA';
    if (score >= 30) return 'de verse afectado moderadamente por la IA';
    return 'de ser reemplazado por la IA';
  };

  const getTimelineIcon = () => {
    if (score >= 75) return '⏰';
    if (score >= 50) return '📅';
    if (score >= 30) return '🗓️';
    return '🛡️';
  };

  const circumference = 2 * Math.PI * 90;
  const dashOffset = circumference - (score / 100) * circumference;

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const getShareText = () => {
    if (score >= 75) {
      return `Mi trabajo como ${puesto} tiene un ${score}% de probabilidad de ser transformado por la IA en los próximos ${timeline}. ¿Cuál es tu score?`;
    } else if (score >= 50) {
      return `Acabo de descubrir que mi puesto de ${puesto} tiene un ${score}% de riesgo de automatización. ¿Y el tuyo?`;
    } else {
      return `Mi AI Replaceability Score es ${score}% — mi trabajo como ${puesto} resiste bien a la IA. ¿Cuál es el tuyo?`;
    }
  };

  const handleShare = (platform: 'linkedin' | 'twitter' | 'whatsapp') => {
    let url = '';
    const text = getShareText();

    switch (platform) {
      case 'linkedin':
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case 'twitter':
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`${text} ${shareUrl}`)}`;
        break;
      case 'whatsapp':
        url = `https://wa.me/?text=${encodeURIComponent(`${text} ${shareUrl}`)}`;
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
    <div className={`min-h-screen bg-gradient-to-br ${getBgGradient()} px-4 py-8 md:py-12`}>
      <div className="w-full max-w-2xl mx-auto animate-fade-in">

        {/* ===== HERO: Score Gauge ===== */}
        <div className="flex flex-col items-center mb-10">
          <div className="relative w-52 h-52 md:w-60 md:h-60 mb-6">
            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="scoreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={riskColor} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={riskColor} stopOpacity={0.4} />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              <circle cx="100" cy="100" r="90" fill="none" stroke="#1f2937" strokeWidth="10" opacity="0.3" />
              <circle
                cx="100" cy="100" r="90"
                fill="none"
                stroke="url(#scoreGradient)"
                strokeWidth="10"
                strokeDasharray={String(circumference)}
                strokeDashoffset={String(dashOffset)}
                strokeLinecap="round"
                transform="rotate(-90 100 100)"
                filter="url(#glow)"
              />

              <text x="100" y="72" textAnchor="middle" fontSize="28">{jobIcon}</text>
              <text x="100" y="112" textAnchor="middle" fontSize="42" fontWeight="bold" fill="white" fontFamily="system-ui">{score}%</text>
              <text x="100" y="135" textAnchor="middle" fontSize="12" fill="#9ca3af" fontFamily="system-ui">RISK SCORE</text>
            </svg>
          </div>

          <div className={`px-5 py-2.5 border rounded-full font-semibold text-sm mb-4 ${getRiskBadgeStyle()}`}>
            {getRiskEmoji()} Riesgo {riskLevel.charAt(0).toUpperCase() + riskLevel.slice(1)}
          </div>

          <h2 className="text-2xl md:text-3xl font-bold text-center mb-2 leading-tight">
            Tu trabajo tiene un <span style={{ color: riskColor }}>{score}%</span> de probabilidad
          </h2>
          <p className="text-gray-400 text-lg text-center">
            {getScoreMessage()} en los próximos <span className="font-semibold text-white">{timeline}</span>
          </p>
        </div>

        {/* ===== JOB CONTEXT CARD ===== */}
        <div className="bg-gray-900/60 border border-gray-800 rounded-xl p-5 mb-6 backdrop-blur-sm">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{jobIcon}</span>
            <div>
              <h3 className="font-bold text-white capitalize text-lg">{puesto}</h3>
              <p className="text-gray-400 text-sm">{sectorIcon} {sector.charAt(0).toUpperCase() + sector.slice(1)} · {experiencia} años exp.</p>
            </div>
          </div>
          <p className="text-gray-300 text-sm leading-relaxed italic">&ldquo;{insight}&rdquo;</p>
        </div>

        {/* ===== AUTOMATION TIMELINE ===== */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-xl">{getTimelineIcon()}</span>
            <h3 className="font-semibold text-white">Ventana de transformación</h3>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${Math.min(score, 100)}%`,
                    background: `linear-gradient(90deg, ${riskColor}80, ${riskColor})`
                  }}
                />
              </div>
            </div>
            <span className="text-sm font-mono text-gray-300 whitespace-nowrap">{automationWave}</span>
          </div>
        </div>

        {/* ===== RISK FACTORS ===== */}
        <div className="mb-6">
          <h3 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
            <span>📊</span> Factores de riesgo
          </h3>
          <div className="grid gap-3">
            {factors.map((factor, idx) => (
              <div
                key={idx}
                className="bg-gray-900/50 border border-gray-800 rounded-lg p-4 flex items-start gap-3 hover:border-gray-700 transition-colors"
              >
                <div
                  className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold"
                  style={{ backgroundColor: `${riskColor}20`, color: riskColor }}
                >
                  {idx + 1}
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">{factor}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ===== SECTOR TREND ===== */}
        <div className="bg-gray-900/40 border border-gray-800 rounded-xl p-5 mb-6">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{sectorIcon}</span>
            <h3 className="font-semibold text-white">Tu sector: {sector.charAt(0).toUpperCase() + sector.slice(1)}</h3>
          </div>
          <p className="text-gray-400 text-sm leading-relaxed">{sectorTrend}</p>
        </div>

        {/* ===== RECOMMENDATIONS (Expandable) ===== */}
        <div className="mb-8">
          <button
            onClick={() => setShowRecommendations(!showRecommendations)}
            className="w-full bg-gray-900/50 border border-gray-800 rounded-xl p-4 flex items-center justify-between hover:border-gray-700 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="text-xl">💡</span>
              <h3 className="font-semibold text-white">Qué puedes hacer</h3>
            </div>
            <span className="text-gray-400 text-xl" style={{ transform: showRecommendations ? 'rotate(180deg)' : 'rotate(0deg)', display: 'inline-block', transition: 'transform 0.2s' }}>
              ▾
            </span>
          </button>
          {showRecommendations && (
            <div className="mt-3 space-y-2 animate-fade-in">
              {recommendations.map((rec, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 bg-gray-900/30 rounded-lg">
                  <span className="text-purple-400 font-bold text-sm mt-0.5">→</span>
                  <p className="text-gray-300 text-sm">{rec}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* ===== SHARE ===== */}
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-gray-500 mb-3 uppercase tracking-wider text-center">
            Comparte tu resultado
          </h3>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button onClick={() => handleShare('linkedin')} className="btn-secondary flex items-center justify-center gap-2 text-sm">
              💼 LinkedIn
            </button>
            <button onClick={() => handleShare('twitter')} className="btn-secondary flex items-center justify-center gap-2 text-sm">
              𝕏 Twitter
            </button>
            <button onClick={() => handleShare('whatsapp')} className="btn-secondary flex items-center justify-center gap-2 text-sm">
              💬 WhatsApp
            </button>
            <button onClick={handleCopyLink} className="btn-secondary flex items-center justify-center gap-2 text-sm">
              {copied ? '✅ Copiado!' : '🔗 Copiar'}
            </button>
          </div>
        </div>

        {/* ===== EMAIL GATE CTA ===== */}
        <button
          onClick={onEmailGate}
          className="btn-primary w-full py-4 text-lg font-semibold flex items-center justify-center gap-2 mb-6 shadow-lg shadow-purple-500/20"
        >
          🔓 Desbloquea tu informe completo GRATIS
        </button>

        <div className="text-center py-4">
          <p className="text-gray-600 text-sm">Hecho con ❤️ y AI</p>
        </div>
      </div>
    </div>
  );
}