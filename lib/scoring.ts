// Job title to base score mapping (0-100)
const JOB_SCORES: Record<string, number> = {
  // HIGH RISK (70-95)
  'entrada de datos': 92,
  'operador de datos': 90,
  'telemarketing': 88,
  'contabilidad básica': 85,
  'procesador de pagos': 82,
  'gerente de contenido': 78,
  'transcriptor': 86,
  'analista de datos junior': 75,
  'copywriter': 72,
  'community manager': 70,

  // MEDIUM RISK (40-65)
  'programador': 55,
  'desarrollador web': 52,
  'diseñador gráfico': 45,
  'especialista marketing': 50,
  'analista de sistemas': 58,
  'consultor': 48,
  'project manager': 52,
  'abogado': 40,
  'contador': 62,
  'especialista seo': 65,

  // LOW RISK (10-35)
  'médico': 15,
  'cirujano': 12,
  'psicólogo': 20,
  'enfermero': 25,
  'profesor': 22,
  'artista': 10,
  'escultor': 8,
  'músico': 12,
  'actor': 18,
  'ejecutivo venta': 35,
  'gerente general': 25,
  'emprendedor': 18,
  'consultor estratégico': 30,
  'investigador científico': 22,
};

// Sector modifiers
const SECTOR_MODIFIERS: Record<string, number> = {
  'tecnología': 10,
  'software': 12,
  'ia': 15,
  'manufactura': 15,
  'logística': 12,
  'retail': 10,
  'finanzas': 8,
  'seguros': 8,
  'telecom': 8,
  'energía': 5,
  'salud': -5,
  'educación': -8,
  'gobierno': -10,
  'construcción': 2,
  'agricultura': 3,
  'turismo': 5,
  'hostelería': 8,
  'medios': 8,
  'legal': -3,
};

// Risk factors database
const RISK_FACTORS: Record<string, string[]> = {
  'entrada de datos': [
    'Tareas altamente repetitivas',
    'Fácilmente automatizable con RPA',
    'Bajo requerimiento de creatividad',
  ],
  'operador de datos': [
    'Procesamiento repetitivo',
    'IA puede ejecutar en segundos',
    'Escalabilidad infinita',
  ],
  'telemarketing': [
    'Chatbots y sistemas de voz ya disponibles',
    'IA generativa mejora continuamente',
    'Bajo valor añadido',
  ],
  'contabilidad básica': [
    'Software contable ya semiautomatizado',
    'IA detecta patrones en registros',
    'Procesos estandarizados',
  ],
  'procesador de pagos': [
    'Blockchain y sistemas automáticos dominan',
    'Máquinas entienden reglas',
    'Sin intervención humana necesaria',
  ],
  'programador': [
    'Copilots y code generation en auge',
    'IA genera boilerplate y funciones',
    'Pero requiere oversight humano',
  ],
  'diseñador gráfico': [
    'Herramientas generativas (DALL-E, Midjourney)',
    'Diseño básico ya automatizado',
    'Diseño estratégico sigue siendo humano',
  ],
  'médico': [
    'Diagnóstico requiere toma de decisión ética',
    'Responsabilidad legal humana inevitable',
    'Empatía y relación médico-paciente crítica',
  ],
  'psicólogo': [
    'Relación terapéutica es humana',
    'IA puede ser herramienta, no reemplazo',
    'Evaluación clínica requiere criterio profesional',
  ],
  'artista': [
    'Creatividad única es el valor',
    'Mercado valora intención humana',
    'Estilo personal irreproducible',
  ],
};

// Default risk factors based on score level
const DEFAULT_FACTORS: Record<string, string[]> = {
  high: [
    'Tu rol involucra tareas muy repetitivas',
    'IA puede aprender tu función rápidamente',
    'Poco contacto humano requerido',
    'Procesos altamente estandarizados',
  ],
  medium: [
    'Algunos componentes del rol son automatizables',
    'Se requiere análisis y criterio profesional',
    'Evolución: hibridación humano-IA',
    'Necesidad de especialización creciente',
  ],
  low: [
    'Tu rol requiere toma de decisión ética',
    'Interacción humana es central',
    'Creatividad y juicio irremplazables',
    'Demanda creciente en el mercado',
  ],
};

interface ScoringResult {
  score: number;
  timeline: string;
  riskLevel: 'bajo' | 'medio' | 'alto' | 'muy alto';
  factors: string[];
}

export function calculateScore(
  puesto: string,
  sector: string,
  experiencia: number
): ScoringResult {
  // Normalize inputs
  const jobKey = puesto.toLowerCase().trim();
  const sectorKey = sector.toLowerCase().trim();

  // Get base score from job title
  let score = JOB_SCORES[jobKey] ?? 50; // Default to medium if not found

  // Apply sector modifier
  const sectorMod = SECTOR_MODIFIERS[sectorKey] ?? 0;
  score += sectorMod;

  // Experience modifier
  if (experiencia > 15) {
    score -= 5; // Veteran knowledge is harder to replace
  } else if (experiencia < 3) {
    score += 5; // Junior roles are easily replaceable
  }

  // Clamp score to 0-100
  score = Math.max(0, Math.min(100, score));

  // Determine risk level and timeline
  let riskLevel: 'bajo' | 'medio' | 'alto' | 'muy alto';
  let timeline: string;

  if (score < 30) {
    riskLevel = 'bajo';
    timeline = '10+ años';
  } else if (score < 50) {
    riskLevel = 'medio';
    timeline = '5-10 años';
  } else if (score < 75) {
    riskLevel = 'alto';
    timeline = '2-5 años';
  } else {
    riskLevel = 'muy alto';
    timeline = '1-3 años';
  }

  // Get factors
  let factors = RISK_FACTORS[jobKey] ?? [];
  if (factors.length === 0) {
    if (score >= 75) {
      factors = DEFAULT_FACTORS.high.slice(0, 3);
    } else if (score >= 50) {
      factors = DEFAULT_FACTORS.medium.slice(0, 3);
    } else {
      factors = DEFAULT_FACTORS.low.slice(0, 3);
    }
  }

  return {
    score: Math.round(score),
    timeline,
    riskLevel,
    factors: factors.slice(0, 4), // Max 4 factors
  };
}

// Job suggestions for autocomplete
export function getJobSuggestions(input: string): string[] {
  const query = input.toLowerCase().trim();
  if (query.length < 2) return [];

  return Object.keys(JOB_SCORES)
    .filter(job => job.includes(query))
    .slice(0, 5);
}

// All available sectors
export function getSectors(): string[] {
  return Object.keys(SECTOR_MODIFIERS).sort();
}
