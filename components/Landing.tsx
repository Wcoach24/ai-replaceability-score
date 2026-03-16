'use client';

import { useState } from 'react';
import { getJobSuggestions, getSectors } from '@/lib/scoring';

interface LandingProps {
  onSubmit: (data: { puesto: string; sector: string; experiencia: number }) => void;
  counter: number;
}

export default function Landing({ onSubmit, counter }: LandingProps) {
  const [puesto, setPuesto] = useState('');
  const [sector, setSector] = useState('tecnología');
  const [experiencia, setExperiencia] = useState(5);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const sectors = getSectors();

  const handlePuestoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPuesto(value);
    if (value.length >= 2) {
      setSuggestions(getJobSuggestions(value));
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const selectSuggestion = (suggestion: string) => {
    setPuesto(suggestion);
    setShowSuggestions(false);
    setSuggestions([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!puesto.trim()) return;

    setIsLoading(true);
    setTimeout(() => {
      onSubmit({
        puesto: puesto.trim(),
        sector,
        experiencia,
      });
    }, 200);
  };

  const getExpLabel = () => {
    if (experiencia === 0) return 'Sin experiencia';
    if (experiencia <= 2) return 'Junior';
    if (experiencia <= 5) return 'Mid-level';
    if (experiencia <= 10) return 'Senior';
    if (experiencia <= 20) return 'Veterano';
    return 'Experto';
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 particle-grid">
      <div className="w-full max-w-md animate-fade-in">
        {/* Main Headline */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🤖</div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
            ¿La IA va a reemplazar tu trabajo?
          </h1>
          <p className="text-gray-300 text-lg md:text-xl">
            Descubre en 30 segundos tu <span className="font-semibold text-white">AI Replaceability Score</span> basado en datos reales de automatización
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 mb-8">
          {/* Puesto */}
          <div className="relative">
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Tu puesto de trabajo
            </label>
            <input
              type="text"
              value={puesto}
              onChange={handlePuestoChange}
              onFocus={() => {
                if (suggestions.length > 0) setShowSuggestions(true);
              }}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="Ej: programador, médico, diseñador..."
              className="input-field"
              required
            />
            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                {suggestions.map((suggestion, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => selectSuggestion(suggestion)}
                    className="w-full text-left px-4 py-2.5 hover:bg-gray-700 text-gray-200 first:rounded-t-lg last:rounded-b-lg transition-colors duration-150 capitalize"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sector */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Tu sector
            </label>
            <select
              value={sector}
              onChange={(e) => setSector(e.target.value)}
              className="input-field cursor-pointer"
            >
              {sectors.map(s => (
                <option key={s} value={s} className="bg-gray-900">
                  {s.charAt(0).toUpperCase() + s.slice(1)}
                </option>
              ))}
            </select>
          </div>

          {/* Experiencia Slider */}
          <div>
            <label className="block text-sm font-semibold text-gray-200 mb-2">
              Años de experiencia: <span className="text-purple-400">{experiencia}</span>
              <span className="text-gray-500 font-normal ml-2">({getExpLabel()})</span>
            </label>
            <input
              type="range"
              value={experiencia}
              onChange={(e) => setExperiencia(parseInt(e.target.value, 10))}
              min="0"
              max="30"
              step="1"
              className="w-full h-2 bg-gray-800 rounded-full appearance-none cursor-pointer accent-purple-500"
            />
            <div className="flex justify-between text-xs text-gray-600 mt-1">
              <span>0</span>
              <span>10</span>
              <span>20</span>
              <span>30</span>
            </div>
          </div>

          {/* CTA Button */}
          <button
            type="submit"
            disabled={!puesto.trim() || isLoading}
            className="btn-primary w-full mt-6 text-lg font-semibold flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-rotate"></span>
                Calculando...
              </>
            ) : (
              '🚀 Calcular mi Score'
            )}
          </button>
        </form>

        {/* Counter */}
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/50 border border-gray-800 rounded-full">
            <span className="text-2xl">🔥</span>
            <span className="text-gray-300">
              {(counter + Math.floor(Math.random() * 50)).toLocaleString()} análisis realizados
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <p className="text-gray-600 text-sm">Hecho con ❤️ y AI</p>
      </div>
    </div>
  );
}