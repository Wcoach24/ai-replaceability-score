'use client';

import { useState, useEffect } from 'react';

interface LoadingProps {
  duration?: number; // milliseconds
}

export default function Loading({ duration = 12000 }: LoadingProps) {
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    'Analizando tu perfil profesional...',
    'Consultando bases de datos de automatización...',
    'Cruzando con tendencias del mercado laboral...',
    'Evaluando impacto de la IA generativa...',
    'Generando tu informe personalizado...',
  ];

  useEffect(() => {
    // Update progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + (100 / (duration / 100));
        return Math.min(newProgress, 99.9); // Don't quite reach 100
      });
    }, 100);

    return () => clearInterval(progressInterval);
  }, [duration]);

  useEffect(() => {
    // Rotate messages every 2.5 seconds
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, 2500);

    return () => clearInterval(messageInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-gray-950 flex flex-col items-center justify-center z-50 particle-grid">
      {/* Animated Brain/Circuit Icon */}
      <div className="relative w-24 h-24 mb-12 animate-pulse-slow">
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full animate-rotate"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Brain/Circuit shape */}
          <defs>
            <linearGradient id="brainGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
          </defs>

          {/* Main circuit circle */}
          <circle cx="50" cy="50" r="45" fill="none" stroke="url(#brainGradient)" strokeWidth="2" opacity="0.8" />

          {/* Inner neural paths */}
          <path
            d="M 50 10 Q 70 30 70 50 Q 70 70 50 80"
            fill="none"
            stroke="url(#brainGradient)"
            strokeWidth="2"
            opacity="0.6"
          />
          <path
            d="M 50 10 Q 30 30 30 50 Q 30 70 50 80"
            fill="none"
            stroke="url(#brainGradient)"
            strokeWidth="2"
            opacity="0.6"
          />

          {/* Nodes */}
          <circle cx="50" cy="15" r="3" fill="#8b5cf6" />
          <circle cx="65" cy="40" r="3" fill="#a78bfa" />
          <circle cx="70" cy="60" r="3" fill="#8b5cf6" />
          <circle cx="50" cy="80" r="3" fill="#3b82f6" />
          <circle cx="35" cy="40" r="3" fill="#a78bfa" />
          <circle cx="30" cy="60" r="3" fill="#8b5cf6" />
        </svg>
      </div>

      {/* Message Text */}
      <div className="min-h-12 mb-8 text-center">
        <p className="text-xl text-gray-300 animate-fade-in font-medium">
          {messages[messageIndex]}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs px-6 mb-12">
        <div className="h-2 bg-gray-900 rounded-full overflow-hidden border border-gray-800">
          <div
            className="h-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-full transition-all duration-100"
            style={{ width: `${Math.min(progress, 100)}%` }}
          ></div>
        </div>
        <p className="text-xs text-gray-500 mt-2 text-center">
          {Math.round(progress)}%
        </p>
      </div>

      {/* Subtle loading text */}
      <p className="text-gray-600 text-sm animate-pulse">
        Procesando información...
      </p>
    </div>
  );
}
