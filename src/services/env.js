const requiredVars = ['VITE_SUPABASE_URL', 'VITE_SUPABASE_ANON_KEY'];

function readEnvVar(key) {
  const value = import.meta.env[key];
  return typeof value === 'string' ? value.trim() : '';
}

export function getEnvConfig() {
  const config = {
    supabaseUrl: readEnvVar('VITE_SUPABASE_URL'),
    supabaseAnonKey: readEnvVar('VITE_SUPABASE_ANON_KEY'),
  };

  const missingVars = requiredVars.filter((key) => !readEnvVar(key));

  return {
    ...config,
    missingVars,
    isConfigured: missingVars.length === 0,
  };
}
