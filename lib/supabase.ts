import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

let supabase: any = null;

// Only initialize if keys are available
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export interface Submission {
  email: string;
  puesto: string;
  sector: string;
  experiencia: number;
  score: number;
}

export async function saveSubmission(data: Submission): Promise<boolean> {
  // Graceful degradation if Supabase is not configured
  if (!supabase) {
    console.warn('Supabase not configured. Submission not saved.');
    return false;
  }

  try {
    const { error } = await supabase.from('submissions').insert([
      {
        email: data.email,
        puesto: data.puesto,
        sector: data.sector,
        experiencia: data.experiencia,
        score: data.score,
        created_at: new Date().toISOString(),
      },
    ]);

    if (error) {
      console.error('Supabase error:', error);
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error saving submission:', error);
    return false;
  }
}
